import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { Continents } from "@/utils/enums";
import { prisma } from "@/server/prisma";
import { Prisma } from "@prisma/client";
import { geoPrisma } from "@/server/prismaGeoExtension";

export const countriesRouter = router({
  capital: protectedProcedure
    .input(
      z.object({
        country: z.string(),
        planet: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { country } = input;
      return {
        capital: "Test",
      };
    }),
  timesFound: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const countrySpotted = await prisma.countrySpotted.findFirst({
        where: {
          userId: ctx.session.user.id!,
          countryId: id,
        },
      });

      if (!countrySpotted) {
        return 0;
      }

      return countrySpotted.timesFound;
    }),
  facts: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const facts = await prisma.countryFact.findMany({
        where: {
          countryId: id,
        },
      });

      return facts;
    }),
  random: publicProcedure
    .input(
      z.object({
        ignoredIds: z.set(z.string().cuid()),
        continent: z.nativeEnum(Continents).default(Continents.ALL),
      })
    )
    .query(async ({ ctx, input }) => {
      const { ignoredIds, continent } = input;

      const countryIds: string[] = await prisma.$queryRaw(
        Prisma.sql`
                    SELECT id
                    FROM public."Country"
                    WHERE id NOT IN (${Array.from(ignoredIds).join(",")})
                    ORDER BY random()
                    LIMIT 1
                `
      );

      if (countryIds.length === 0) {
        // TODO: what happens if a user has found every country :D
        throw new Error("No countries available.");
      }

      const country = await geoPrisma.country.findOne(countryIds[0]);

      console.log(country);
      return country;
    }),
});
