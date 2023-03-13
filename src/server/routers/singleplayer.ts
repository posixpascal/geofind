import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { countryScalarFields, geoPrisma } from "@/server/prismaGeoExtension";
import { observable } from "@trpc/server/observable";
import { RoundState, SinglePlayerGame } from "@prisma/client";
import ee from "@/server/eventEmitter";
import { SinglePlayer } from "@/server/games/SinglePlayer";
import { LngLat } from "maplibre-gl";
import { SINGLEPLAYER_UPDATED } from "@/server/constants/events";
import logger from "@/server/logger";

export const singleplayerRouter = router({
  start: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const singlePlayer = new SinglePlayer(id);
      await singlePlayer.start();
    }),
  prepare: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const singlePlayer = new SinglePlayer(id);
      await singlePlayer.nextRound();
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
            data: {id},
          })
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
            data: {game},
          })
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
      const singlePlayer = new SinglePlayer(id);
      await singlePlayer.skip();
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
      const singlePlayer = new SinglePlayer(id);
      return await singlePlayer.solve(LngLat.convert(vote));
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
      const singlePlayer = new SinglePlayer(id);
      const vote = await singlePlayer.vote(LngLat.convert(lngLat));

      return vote;
    }),
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id } = ctx.session.user;
    const [randomCountry] = await geoPrisma.country.takeRandom(3);
    const singleplayer = await prisma.singlePlayerGame.create({
      data: {
        creatorId: id!,
        countryId: randomCountry.id,
        trialsForRound: 1,
        roundState: RoundState.PREPARED,
      },
    });

    ee.emit(SINGLEPLAYER_UPDATED, singleplayer.id);
    return singleplayer;
  }),
});
