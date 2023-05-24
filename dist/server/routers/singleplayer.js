"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleplayerRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
const prismaGeoExtension_1 = require("@/server/prismaGeoExtension");
const observable_1 = require("@trpc/server/observable");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const maplibre_gl_1 = require("maplibre-gl");
const events_1 = require("@/server/constants/events");
const logger_1 = __importDefault(require("@/server/logger"));
const singleplayer_1 = require("@/server/services/singleplayer");
exports.singleplayerRouter = (0, trpc_1.router)({
    start: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .mutation(async ({ input }) => {
        const { id } = input;
        await (0, singleplayer_1.startSinglePlayer)(id);
    }),
    prepare: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .mutation(async ({ input }) => {
        const { id } = input;
        await (0, singleplayer_1.nextSinglePlayerRound)(id);
    }),
    subscribe: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .subscription(async ({ ctx, input }) => {
        return (0, observable_1.observable)((emit) => {
            const onUpdated = async (id) => {
                // emit data to client
                logger_1.default.info({
                    event: "SubscriptionPublishQuery",
                    data: { id },
                });
                const game = await prisma_1.prisma.singlePlayerGame.findFirst({
                    where: {
                        id: id,
                        creatorId: ctx.session.user.id,
                    },
                    include: {
                        country: {
                            select: {
                                ...prismaGeoExtension_1.countryScalarFields.reduce((acc, cur) => {
                                    return { ...acc, [cur]: true };
                                }, {}),
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
            eventEmitter_1.default.on(events_1.SINGLEPLAYER_UPDATED, onUpdated);
            return () => {
                eventEmitter_1.default.off(events_1.SINGLEPLAYER_UPDATED, onUpdated);
            };
        });
    }),
    skip: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .mutation(async ({ ctx, input }) => {
        const { id } = input;
        await (0, singleplayer_1.skipSinglePlayerRound)(id);
    }),
    solve: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
        vote: zod_1.z.object({
            lng: zod_1.z.number(),
            lat: zod_1.z.number(),
        }),
    }))
        .mutation(async ({ ctx, input }) => {
        const { vote, id } = input;
        return await (0, singleplayer_1.solveSinglePlayerRound)(id, maplibre_gl_1.LngLat.convert(vote));
    }),
    vote: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
        lngLat: zod_1.z.object({
            lng: zod_1.z.number(),
            lat: zod_1.z.number(),
        }),
    }))
        .mutation(async ({ ctx, input }) => {
        const { id, lngLat } = input;
        return await (0, singleplayer_1.voteSinglePlayer)(id, maplibre_gl_1.LngLat.convert(lngLat)); // TODO: type
    }),
    create: trpc_1.protectedProcedure.mutation(async ({ ctx, input }) => {
        const { id } = ctx.session.user;
        return (0, singleplayer_1.createSinglePlayer)(id);
    }),
});
