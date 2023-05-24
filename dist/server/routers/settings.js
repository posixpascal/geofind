"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
const observable_1 = require("@trpc/server/observable");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
const settings_1 = require("@/server/constants/settings");
const UpdateSettingInput = zod_1.z.object({
    key: zod_1.z.string(),
    value: zod_1.z.union([zod_1.z.string(), zod_1.z.boolean()]),
});
exports.settingsRouter = (0, trpc_1.router)({
    update: trpc_1.protectedProcedure
        .input(UpdateSettingInput)
        .mutation(async ({ ctx, input }) => {
        const { key, value } = input;
        const userId = ctx.session.user.id;
        const settings = await prisma_1.prisma.settings.upsert({
            where: {
                userId,
            },
            create: {
                ...settings_1.DEFAULT_SETTINGS,
                userId: userId,
            },
            update: {
                [key]: value,
            },
        });
        eventEmitter_1.default.emit(events_1.SETTINGS_UPDATED, settings);
        return settings;
    }),
    list: trpc_1.protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        let settings = await prisma_1.prisma.settings.findFirst({
            where: {
                userId: userId,
            },
        });
        if (!settings) {
            settings = await prisma_1.prisma.settings.create({
                data: {
                    ...settings_1.DEFAULT_SETTINGS,
                    userId: userId,
                },
            });
        }
        return settings;
    }),
    // TODO: shouldnt be a subscription
    subscribe: trpc_1.protectedProcedure
        .input(zod_1.z.object({}))
        .subscription(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        let settings = await prisma_1.prisma.settings.findFirst({
            where: {
                userId,
            },
        });
        if (!settings) {
            settings = await prisma_1.prisma.settings.create({
                data: {
                    ...settings_1.DEFAULT_SETTINGS,
                    userId: userId,
                },
            });
        }
        return (0, observable_1.observable)((emit) => {
            const onUpdated = async (settings) => {
                emit.next(settings);
            };
            onUpdated(settings);
            eventEmitter_1.default.on(events_1.SETTINGS_UPDATED, onUpdated);
            return () => {
                eventEmitter_1.default.off(events_1.SETTINGS_UPDATED, onUpdated);
            };
        });
    }),
});
