"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countriesRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const enums_1 = require("@/utils/enums");
const prisma_1 = require("@/server/prisma");
const client_1 = require("@prisma/client");
const prismaGeoExtension_1 = require("@/server/prismaGeoExtension");
exports.countriesRouter = (0, trpc_1.router)({
    capital: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        country: zod_1.z.string(),
        planet: zod_1.z.string(),
    }))
        .query(async ({ input }) => {
        const { country } = input;
        return {
            capital: "Test",
        };
    }),
    timesFound: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .query(async ({ ctx, input }) => {
        const { id } = input;
        const countrySpotted = await prisma_1.prisma.countrySpotted.findFirst({
            where: {
                userId: ctx.session.user.id,
                countryId: id,
            },
        });
        if (!countrySpotted) {
            return 0;
        }
        return countrySpotted.timesFound;
    }),
    facts: trpc_1.protectedProcedure
        .input(zod_1.z.object({
        id: zod_1.z.string().cuid(),
    }))
        .mutation(async ({ ctx, input }) => {
        const { id } = input;
        const facts = await prisma_1.prisma.countryFact.findMany({
            where: {
                countryId: id,
            },
        });
        return facts;
    }),
    random: trpc_1.publicProcedure
        .input(zod_1.z.object({
        ignoredIds: zod_1.z.set(zod_1.z.string().cuid()),
        continent: zod_1.z.nativeEnum(enums_1.Continents).default(enums_1.Continents.ALL),
    }))
        .query(async ({ ctx, input }) => {
        const { ignoredIds, continent } = input;
        const countryIds = await prisma_1.prisma.$queryRaw(client_1.Prisma.sql `
                    SELECT id
                    FROM public."Country"
                    WHERE id NOT IN (${Array.from(ignoredIds).join(",")})
                    ORDER BY random()
                    LIMIT 1
                `);
        if (countryIds.length === 0) {
            // TODO: what happens if a user has found every country :D
            throw new Error("No countries available.");
        }
        const country = await prismaGeoExtension_1.geoPrisma.country.findOne({
            id: countryIds[0]
        });
        console.log(country);
        return country;
    }),
});
