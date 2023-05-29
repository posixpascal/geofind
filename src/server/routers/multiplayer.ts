import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { observable } from "@trpc/server/observable";
import {
  GameMap,
  GameMode,
  GameSessionState,
  GameState,
  MultiPlayerGame,
} from "@prisma/client";
import ee from "@/server/eventEmitter";
import { MULTIPLAYER_UPDATED } from "@/server/constants/events";
import logger from "@/server/logger";
import {
  createMultiPlayer,
  joinMultiPlayer,
  leaveMultiPlayer,
  startMultiPlayerGame,
  synchronizeSession,
  voteMultiPlayer,
} from "@/server/services/multiplayer";
import { LngLat } from "maplibre-gl";

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
      // TODO: outsource
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
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return await startMultiPlayerGame(id);
    }),
  synchronizeSession: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const user = ctx.session.user;

      return await synchronizeSession(user.id, id);
    }),
  vote: protectedProcedure
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
      const { id, vote } = input;
      const user = ctx.session.user;

      return await voteMultiPlayer(user.id, id, vote);
    }),
  findOpenGames: protectedProcedure.query(
    async ({ ctx }): Promise<MultiPlayerGame[]> => {
      const games = await prisma.multiPlayerGame.findMany({
        take: 10,
        skip: 0,
        where: {
          gameState: GameState.LOBBY,
          isPublic: true,
        },
        include: {
          creator: {
            select: {
              name: true,
              image: true,
            },
          },
          sessions: {
            where: {
              state: GameSessionState.CONNECTED,
            },
            select: {
              _count: true,
            },
          },
        },
      });

      return games;
    }
  ),
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
          // logger.info({
          //     event: "SubscriptionPublishQuery",
          //     data: {id},
          // });

          const game = await prisma.multiPlayerGame.findFirst({
            where: {
              id: id,
            },
            include: {
              country: true,
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
                      color: true,
                    },
                  },
                },
              },
            },
          });

          // logger.info({
          //     event: "SubscriptionPublish",
          //     data: {game},
          // });
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
