import {Achievement, AchievementType} from "@prisma/client";
import {User} from "next-auth";
import {prisma} from "@/server/prisma";
import {Continents} from "@/utils/enums";
import ee from "@/server/eventEmitter";
import {ACHIEVEMENT_AWARDED} from "@/server/constants/events";
import {grantAchievementExperience,} from "@/server/services/user";

export const verifyAchievement = async (
  user: Partial<User>,
  achievement: Achievement
) => {
  if (await hasAchievement(user, achievement)) {
    return {
      awarded: true,
    };
  }

  let result = {
    awarded: false,
    total: 0,
    progress: 0,
  };

  switch (achievement.type) {
    case AchievementType.CONTINENTS:
      result = await verifyContinentAchievement(user, achievement);
      break;
  }

  if (result.awarded) {
    return await awardAchievement(user, achievement);
  }

  return result;
};

export const awardAchievement = async (
  user: Partial<User>,
  achievement: Achievement
) => {
  await prisma.usersOnAchievements.create({
    data: {
      userId: user.id!,
      achievementId: achievement.id,
      awardedAt: new Date(),
    },
  });

  ee.emit(ACHIEVEMENT_AWARDED, achievement);
  await grantAchievementExperience(user.id!, achievement.experienceOnGain);
};

export const verifyContinentAchievement = async (
  user: Partial<User>,
  achievement: Achievement
) => {
  let result = {
    awarded: false,
    progress: 0,
    total: 0,
  };

  switch (achievement.name) {
    case Continents.ALL.toString().toLocaleLowerCase(): {
      const worldCountries = await prisma.country.count();
      const spottedCountries = await prisma.countrySpotted.count({
        where: {
          userId: user.id,
        },
        distinct: ["countryId"],
      });

      return {
        awarded: spottedCountries >= worldCountries,
        progress: spottedCountries,
        total: worldCountries,
      };
    }

    default:
      const continents: Record<string, string> = {
        europe: "Europe",
        asia: "Asia",
        northamerica: "North America",
        southamerica: "South America",
        oceania: "Oceania",
        africa: "Africa",
      };

      const continentCountries = await prisma.country.findMany({
        where: {
          continent: continents[achievement.name],
        },
        select: {
          id: true,
        },
      });

      const spottedCountries = await prisma.countrySpotted.findMany({
        select: {
          countryId: true,
        },
        where: {
          userId: user.id,
          countryId: {
            in: continentCountries.map(
              (continentCountry) => continentCountry.id
            ),
          },
        },
        distinct: ["countryId"],
      });

      return {
        awarded: spottedCountries.length >= continentCountries.length,
        progress: spottedCountries.length,
        total: continentCountries.length,
      };
  }
};

export const hasAchievement = async (
  user: Partial<User>,
  achievement: Achievement
) => {
  const awardedAchievement = await prisma.usersOnAchievements.findFirst({
    where: {
      achievementId: achievement.id,
      userId: user.id,
    },
  });

  return !!awardedAchievement;
};
