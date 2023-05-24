"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplayerRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
const observable_1 = require("@trpc/server/observable");
const client_1 = require("@prisma/client");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
const logger_1 = __importDefault(require("@/server/logger"));
const multiplayer_1 = require("@/server/services/multiplayer");
exports.multiplayerRouter = (0, trpc_1.router)({
    create: trpc_1.protectedProcedure.mutation(async ({ ctx, input }) => {
        const { id } = ctx.session.user;
        return (0, multiplayer_1.createMultiPlayer)(id);
    }),
    update: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
        gameMode: zod_1.z.nativeEnum(client_1.GameMode).optional(),
        gameMap: zod_1.z.nativeEnum(client_1.GameMap).optional(),
        isPublic: zod_1.z.boolean().optional(),
        hasIslands: zod_1.z.boolean().optional(),
        firstSpotWins: zod_1.z.boolean().optional(),
        onlyDirectSpots: zod_1.z.boolean().optional(),
    }))
        .mutation(async ({ ctx, input }) => {
        const { id, gameMode, gameMap, isPublic, onlyDirectSpots, hasIslands, firstSpotWins, } = input;
        const user = ctx.session.user;
        const game = await prisma_1.prisma.multiPlayerGame.findFirst({
            where: {
                id,
                creatorId: user.id,
            },
        });
        if (!game) {
            return;
        }
        const updateObject = {}; // TODO: type
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
        await prisma_1.prisma.multiPlayerGame.update({
            where: {
                id,
            },
            data: {
                ...updateObject,
            },
        });
        eventEmitter_1.default.emit(events_1.MULTIPLAYER_UPDATED, id);
    }),
    subscribe: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .subscription(async ({ ctx, input }) => {
        await (0, multiplayer_1.joinMultiPlayer)(ctx.session.user.id, input.id);
        return (0, observable_1.observable)((emit) => {
            const onUpdated = async (id) => {
                if (id !== input.id) {
                    return;
                }
                // emit data to client
                logger_1.default.info({
                    event: "SubscriptionPublishQuery",
                    data: { id },
                });
                const game = await prisma_1.prisma.multiPlayerGame.findFirst({
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
                logger_1.default.info({
                    event: "SubscriptionPublish",
                    data: { game },
                });
                emit.next(game);
            };
            onUpdated(input.id);
            eventEmitter_1.default.on(events_1.MULTIPLAYER_UPDATED, onUpdated);
            return () => {
                (0, multiplayer_1.leaveMultiPlayer)(ctx.session.user.id, input.id);
                eventEmitter_1.default.off(events_1.MULTIPLAYER_UPDATED, onUpdated);
            };
        });
    }),
});
