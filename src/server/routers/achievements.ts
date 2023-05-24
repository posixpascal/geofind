import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import { verifyAchievement } from "@/server/services/achievements";
import { AchievementMedal } from "@prisma/client";

export const achievementsRouter = router({
  all: publicProcedure.query(async () => {
    const achievements = await prisma.achievement.findMany();
    return achievements;
  }),
  progress: protectedProcedure
    .input(
      z.object({
        achievement: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) => {
      const achievement = await prisma.achievement.findFirst({
        where: {
          id: input.achievement,
        },
      });
      if (!achievement) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "",
          message: "Invalid achievement",
        });
      }
      return await verifyAchievement(ctx.session.user, achievement);
    }),
  medals: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user.id;

    const achievements = await prisma.achievement.findMany({
      select: {
        id: true,
        medal: true,
      },
    });

    const gemAchievements = achievements.filter(
      (achievement) => achievement.medal === AchievementMedal.GEM
    );
    const crownAchievements = achievements.filter(
      (achievement) => achievement.medal === AchievementMedal.CROWN
    );
    const ribbonAchievements = achievements.filter(
      (achievement) => achievement.medal === AchievementMedal.RIBBON
    );

    const gemCount = await prisma.usersOnAchievements.count({
      where: {
        userId: user,
        achievementId: {
          in: gemAchievements.map((achievement) => achievement.id),
        },
      },
    });

    const crownCount = await prisma.usersOnAchievements.count({
      where: {
        userId: user,
        achievementId: {
          in: crownAchievements.map((achievement) => achievement.id),
        },
      },
    });

    const ribbonCount = await prisma.usersOnAchievements.count({
      where: {
        userId: user,
        achievementId: {
          in: ribbonAchievements.map((achievement) => achievement.id),
        },
      },
    });

    return {
      [AchievementMedal.GEM]: gemCount,
      [AchievementMedal.CROWN]: crownCount,
      [AchievementMedal.RIBBON]: ribbonCount,
    };
  }),
  spottedCountries: protectedProcedure.query(async ({ ctx }) => {
    const spottedCountries = await prisma.countrySpotted.findMany({
      where: {
        userId: ctx.session.user!.id,
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
