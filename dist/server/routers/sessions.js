"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const trpc_1 = require("../trpc");
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const observable_1 = require("@trpc/server/observable");
const prisma_1 = require("@/server/prisma");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
exports.sessionRouter = (0, trpc_1.router)({
    experience: trpc_1.protectedProcedure.subscription(({ ctx }) => {
        return (0, observable_1.observable)((emit) => {
            const onUpdated = async (trail) => {
                const user = await prisma_1.prisma.user.findFirst({
                    select: {
                        experience: true,
                    },
                    where: {
                        id: ctx.session.user.id,
                    },
                });
                if (user) {
                    emit.next({
                        total: user.experience,
                        trail,
                    });
                }
            };
            onUpdated([]);
            eventEmitter_1.default.on(events_1.EXPERIENCE_UPDATED, onUpdated);
            return () => {
                eventEmitter_1.default.off(events_1.EXPERIENCE_UPDATED, onUpdated);
            };
        });
    }),
    onlineCount: trpc_1.protectedProcedure.subscription(async ({ ctx }) => {
        return (0, observable_1.observable)((emit) => {
            const onUpdated = async (count) => {
                emit.next({
                    count,
                });
            };
            onUpdated(process.wssClientsSize || 0);
            eventEmitter_1.default.on(events_1.USER_CONNECTED, onUpdated);
            eventEmitter_1.default.on(events_1.USER_DISCONNECTED, onUpdated);
            return () => {
                eventEmitter_1.default.off(events_1.USER_CONNECTED, onUpdated);
                eventEmitter_1.default.off(events_1.USER_DISCONNECTED, onUpdated);
            };
        });
    }),
    user: trpc_1.publicProcedure.query(async ({ ctx, }) => {
        if (ctx.session && ctx.session.user) {
            const user = await prisma_1.prisma.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
                select: {
                    id: true,
                    color: true,
                    pin: true,
                    isGuest: true,
                    joinedAt: true,
                    experience: true,
                    friendCode: true,
                },
            });
            return {
                ...ctx.session.user,
                ...user,
                isLoggedIn: true,
            };
        }
        else {
            return null;
        }
    }),
    login: trpc_1.publicProcedure
        .input(zod_1.z.object({
        username: zod_1.z.string(),
    }))
        .mutation(async ({ ctx, input }) => {
        const { username } = input;
        console.log(input);
        try {
        }
        catch (error) {
            throw new server_1.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error.message,
            });
        }
    }),
    logout: trpc_1.publicProcedure.mutation(async ({ ctx }) => {
        return { isLoggedIn: false, login: "", avatarUrl: "" };
    }),
});
