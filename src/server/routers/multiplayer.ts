import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { countryScalarFields } from "@/server/prismaGeoExtension";
import { observable } from "@trpc/server/observable";
import {MultiPlayerGame, SinglePlayerGame} from "@prisma/client";
import ee from "@/server/eventEmitter";
import { LngLat } from "maplibre-gl";
import {MULTIPLAYER_UPDATED, SINGLEPLAYER_UPDATED} from "@/server/constants/events";
import logger from "@/server/logger";
import {
  createSinglePlayer,
  nextSinglePlayerRound,
  skipSinglePlayerRound,
  solveSinglePlayerRound,
  startSinglePlayer,
  voteSinglePlayer,
} from "@/server/services/singleplayer";
import {createMultiPlayer, joinMultiPlayer, leaveMultiPlayer} from "@/server/services/multiplayer";

export const multiplayerRouter = router({
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;
    return createMultiPlayer(id!)
  }),

  subscribe: protectedProcedure
      .input(
          z.object({
            id: z.string().cuid(),
          })
      )
      .subscription(async ({ ctx, input }) => {
        await joinMultiPlayer(ctx.session.user.id!, input.id)
        return observable<MultiPlayerGame>((emit) => {
          const onUpdated = async (id: string) => {
            if (id !== input.id){
              return;
            }
            // emit data to client
            logger.info({
              event: "SubscriptionPublishQuery",
              data: { id },
            });

            const game = await prisma.multiPlayerGame.findFirst({
              where: {
                id: id,
              },
              include: {
                creator: {
                  select: {
                    image: true,
                    name: true
                  }
                },
                sessions: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        pin: true,
                        friendCode: true,
                        image: true,
                        experience: true
                      }
                    }
                  },
                }
              }
            });

            logger.info({
              event: "SubscriptionPublish",
              data: { game },
            });
            emit.next(game!);
          };

          onUpdated(input.id);

          ee.on(MULTIPLAYER_UPDATED, onUpdated);
          return () => {
            leaveMultiPlayer(ctx.session.user.id!, input.id)
            ee.off(MULTIPLAYER_UPDATED, onUpdated);
          };
        });
      }),
});
