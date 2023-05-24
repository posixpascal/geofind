import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { observable } from "@trpc/server/observable";
import { GameMap, GameMode, GameState, MultiPlayerGame } from "@prisma/client";
import ee from "@/server/eventEmitter";
import { MULTIPLAYER_UPDATED } from "@/server/constants/events";
import logger from "@/server/logger";
import {
  createMultiPlayer,
  joinMultiPlayer,
  leaveMultiPlayer,
} from "@/server/services/multiplayer";

export const multiplayerRouter = router({
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;
    return createMultiPlayer(id!);
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        gameMode: z.nativeEnum(GameMode).optional(),
        gameMap: z.nativeEnum(GameMap).optional(),
        isPublic: z.boolean().optional(),
        hasIslands: z.boolean().optional(),
        firstSpotWins: z.boolean().optional(),
        onlyDirectSpots: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id,
        gameMode,
        gameMap,
        isPublic,
        onlyDirectSpots,
        hasIslands,
        firstSpotWins,
      } = input;
      const user = ctx.session.user;

      const game = await prisma.multiPlayerGame.findFirst({
        where: {
          id,
          creatorId: user.id,
        },
      });

      if (!game) {
        return;
      }

      const updateObject: Record<any, any> = {}; // TODO: type
      if (typeof gameMode !== "undefined") {
        updateObject.gameMode = gameMode;
      }

      if (typeof gameMap !== "undefined") {
        updateObject.gameMap = gameMap;
      }

      if (typeof isPublic !== "undefined") {
        updateObject.isPublic = isPublic;
      }

      if (typeof onlyDirectSpots !== "undefined") {
        updateObject.onlyDirectSpots = onlyDirectSpots;
      }

      if (typeof firstSpotWins !== "undefined") {
        updateObject.firstSpotWins = firstSpotWins;
      }

      if (typeof hasIslands !== "undefined") {
        updateObject.hasIslands = hasIslands;
      }

      await prisma.multiPlayerGame.update({
        where: {
          id,
        },
        data: {
          ...updateObject,
        },
      });

      ee.emit(MULTIPLAYER_UPDATED, id);
    }),
  startGame: protectedProcedure
      .input(z.object({
        id: z.string().cuid()
      })).mutation(async ({ctx, input}) => {
        const {id} = input;
        await prisma.multiPlayerGame.update({
          where: {
            id
          },
          data: {
            gameState: GameState.PLAYING
          }
        });

        ee.emit(MULTIPLAYER_UPDATED, id);
      }),
  subscribe: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .subscription(async ({ ctx, input }) => {
      await joinMultiPlayer(ctx.session.user.id!, input.id);
      return observable<MultiPlayerGame>((emit) => {
        const onUpdated = async (id: string) => {
          if (id !== input.id) {
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
                  name: true,
                },
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
                      experience: true,
                    },
                  },
                },
              },
            },
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
          leaveMultiPlayer(ctx.session.user.id!, input.id);
          ee.off(MULTIPLAYER_UPDATED, onUpdated);
        };
      });
    }),
});
