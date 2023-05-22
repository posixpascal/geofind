import {prisma} from "@/server/prisma";
import ee from "@/server/eventEmitter";
import {ACHIEVEMENT_AWARDED, EXPERIENCE_UPDATED,} from "@/server/constants/events";
import {Experience, ExperienceValue} from "@/server/constants/exp";

export const recordSpottedCountry = async (
  userId: string,
  countryId: string
) => {
  const spottedBefore = await prisma.countrySpotted.findFirst({
    where: {
      userId,
      countryId,
    },
  });

  if (!spottedBefore) {
    return await prisma.countrySpotted.create({
      data: {
        userId,
        countryId,
        firstFoundAt: new Date(),
        lastFoundAt: new Date(),
        timesFound: 1,
        timesFailed: 0,
      },
    });
  }

  return await prisma.countrySpotted.update({
    where: {
      id: spottedBefore.id,
    },
    data: {
      timesFound: {
        increment: 1,
      },
      lastFoundAt: new Date(),
    },
  });
};

export const grantExperience = async (
  userId: string,
  experiences: Experience[]
) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      experience: {
        increment: experiences.reduce(
          (acc, type) => acc + ExperienceValue[type],
          0
        ),
      },
    },
  });

  ee.emit(EXPERIENCE_UPDATED, experiences);
};

export const grantAchievementExperience = async (
  userId: string,
  amount: number = 0
) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      experience: {
        increment: amount,
      },
    },
  });

  ee.emit(EXPERIENCE_UPDATED, [ACHIEVEMENT_AWARDED]);
};
