"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievementsRouter = void 0;
const trpc_1 = require("../trpc");
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
const achievements_1 = require("@/server/services/achievements");
const client_1 = require("@prisma/client");
exports.achievementsRouter = (0, trpc_1.router)({
    all: trpc_1.publicProcedure.query(async () => {
        const achievements = await prisma_1.prisma.achievement.findMany();
        return achievements;
    }),
    progress: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        achievement: zod_1.z.string().cuid(),
    }))
        .query(async ({ ctx, input }) => {
        const achievement = await prisma_1.prisma.achievement.findFirst({
            where: {
                id: input.achievement,
            },
        });
        if (!achievement) {
            throw new server_1.TRPCError({
                code: "BAD_REQUEST",
                cause: "",
                message: "Invalid achievement",
            });
        }
        return await (0, achievements_1.verifyAchievement)(ctx.session.user, achievement);
    }),
    medals: trpc_1.protectedProcedure.query(async ({ ctx }) => {
        const user = ctx.session.user.id;
        const achievements = await prisma_1.prisma.achievement.findMany({
            select: {
                id: true,
                medal: true,
            },
        });
        const gemAchievements = achievements.filter((achievement) => achievement.medal === client_1.AchievementMedal.GEM);
        const crownAchievements = achievements.filter((achievement) => achievement.medal === client_1.AchievementMedal.CROWN);
        const ribbonAchievements = achievements.filter((achievement) => achievement.medal === client_1.AchievementMedal.RIBBON);
        const gemCount = await prisma_1.prisma.usersOnAchievements.count({
            where: {
                userId: user,
                achievementId: {
                    in: gemAchievements.map((achievement) => achievement.id),
                },
            },
        });
        const crownCount = await prisma_1.prisma.usersOnAchievements.count({
            where: {
                userId: user,
                achievementId: {
                    in: crownAchievements.map((achievement) => achievement.id),
                },
            },
        });
        const ribbonCount = await prisma_1.prisma.usersOnAchievements.count({
            where: {
                userId: user,
                achievementId: {
                    in: ribbonAchievements.map((achievement) => achievement.id),
                },
            },
        });
        return {
            [client_1.AchievementMedal.GEM]: gemCount,
            [client_1.AchievementMedal.CROWN]: crownCount,
            [client_1.AchievementMedal.RIBBON]: ribbonCount,
        };
    }),
    spottedCountries: trpc_1.protectedProcedure.query(async ({ ctx }) => {
        const spottedCountries = await prisma_1.prisma.countrySpotted.findMany({
            where: {
                userId: ctx.session.user.id,
            },
            distinct: ["countryId"],
            include: {
                country: {
                    select: {
                        isoAlpha3: true,
                    },
                },
            },
        });
        return spottedCountries;
    }),
});
