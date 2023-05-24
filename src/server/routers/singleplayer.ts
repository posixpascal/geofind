import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { countryScalarFields } from "@/server/prismaGeoExtension";
import { observable } from "@trpc/server/observable";
import { SinglePlayerGame } from "@prisma/client";
import ee from "@/server/eventEmitter";
import { LngLat } from "maplibre-gl";
import { SINGLEPLAYER_UPDATED } from "@/server/constants/events";
import logger from "@/server/logger";
import {
  createSinglePlayer,
  nextSinglePlayerRound,
  skipSinglePlayerRound,
  solveSinglePlayerRound,
  startSinglePlayer,
  voteSinglePlayer,
} from "@/server/services/singleplayer";

export const singleplayerRouter = router({
  start: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await startSinglePlayer(id);
    }),
  prepare: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      await nextSinglePlayerRound(id);
    }),
  subscribe: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .subscription(async ({ ctx, input }) => {
      return observable<SinglePlayerGame>((emit) => {
        const onUpdated = async (id: string) => {
          // emit data to client
          logger.info({
            event: "SubscriptionPublishQuery",
            data: { id },
          });
          const game = await prisma.singlePlayerGame.findFirst({
            where: {
              id: id,
              creatorId: ctx.session.user.id!,
            },
            include: {
              country: {
                select: {
                  ...countryScalarFields.reduce((acc, cur) => {
                    return { ...acc, [cur]: true };
                  }, {}),
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

        ee.on(SINGLEPLAYER_UPDATED, onUpdated);
        return () => {
          ee.off(SINGLEPLAYER_UPDATED, onUpdated);
        };
      });
    }),
  skip: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      await skipSinglePlayerRound(id);
    }),
  solve: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        vote: z.object({
          lng: z.number(),
          lat: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { vote, id } = input;
      return await solveSinglePlayerRound(id, LngLat.convert(vote as any));
    }),
  vote: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        lngLat: z.object({
          lng: z.number(),
          lat: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, lngLat } = input;
      return await voteSinglePlayer(id, LngLat.convert(lngLat as any)); // TODO: type
    }),
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;
    return createSinglePlayer(id!);
  }),
});
