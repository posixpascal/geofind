"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const trpc_1 = require("../trpc");
const prisma_1 = require("@/server/prisma");
const zod_1 = require("zod");
exports.profileRouter = (0, trpc_1.router)({
    all: trpc_1.publicProcedure.query(async () => { }),
    user: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .query(async ({ input }) => {
        const { id } = input;
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                friendCode: true,
                experience: true,
                multiPlayerGames: {
                    include: {
                        _count: true,
                    },
                },
            },
        });
        if (!user) {
            return {
                user: null,
            };
        }
        const spottedCountries = await prisma_1.prisma.countrySpotted.findMany({
            where: {
                userId: user.id,
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
        return {
            user,
            spottedCountries,
        };
    }),
    experiences: trpc_1.protectedProcedure
        .input(zod_1.z.object({}))
        .query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        return await prisma_1.prisma.dailyExperience.findMany({
            where: {
                userId,
            },
            orderBy: {
                experience: "desc",
            },
            take: 30,
            select: {
                experience: true,
                createdAt: true,
            },
        });
    }),
});
