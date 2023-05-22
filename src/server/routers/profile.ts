import {protectedProcedure, publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";
import {z} from "zod";

export const profileRouter = router({
  all: publicProcedure.query(async () => {}),
  user: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const user = await prisma.user.findUnique({
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

      const spottedCountries = await prisma.countrySpotted.findMany({
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
  experiences: protectedProcedure
    .input(z.object({}))
    .query(
      async ({ ctx }): Promise<{ experience: number; createdAt: Date }[]> => {
        const userId = ctx.session.user.id!;
        return await prisma.dailyExperience.findMany({
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
      }
    ),
});
