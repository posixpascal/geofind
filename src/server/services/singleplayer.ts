import {prisma} from "@/server/prisma";
import {RoundState} from "@prisma/client";
import ee from "@/server/eventEmitter";
import {SINGLEPLAYER_UPDATED} from "@/server/constants/events";
import {LngLat} from "maplibre-gl";
import {geoPrisma} from "@/server/prismaGeoExtension";
import logger from "@/server/logger";
import {Experience} from "@/server/constants/exp";
import {grantExperience, recordSpottedCountry} from "@/server/services/user";
import {
    SINGLEPLAYER_ERROR_TIME,
    SINGLEPLAYER_PREPARE_TIME,
    SINGLEPLAYER_SUCCESS_TIME,
} from "@/server/constants/timings";

export const createSinglePlayer = async (creatorId: string) => {
  const [randomCountry] = await geoPrisma.country.takeRandom(3);
  const singleplayer = await prisma.singlePlayerGame.create({
    data: {
      creatorId,
      countryId: randomCountry.id,
      trialsForRound: 1,
      roundState: RoundState.PREPARED,
    },
  });

  ee.emit(SINGLEPLAYER_UPDATED, singleplayer.id);
  return singleplayer;
};

export const startSinglePlayer = async (id: string) => {
  const game = await prisma.singlePlayerGame.update({
    where: {
      id,
    },
    data: {
      roundState: RoundState.STARTED,
    },
  });

  ee.emit(SINGLEPLAYER_UPDATED, game.id);
};

export const skipSinglePlayerRound = async (id: string) => {
  const game = await prisma.singlePlayerGame.findUnique({
    where: {
      id,
    },
  });

  if (!game) {
    throw new Error("Invalid game");
  }

  await prisma.singlePlayerGame.update({
    where: {
      id,
    },
    data: {
      roundState: RoundState.ENDED,
    },
  });

  ee.emit(SINGLEPLAYER_UPDATED, game.id);
};

export const solveSinglePlayerRound = async (id: string, lngLat: LngLat) => {
  const game = await prisma.singlePlayerGame.findUnique({
    where: {
      id,
    },
  });

  if (!game) {
    throw new Error("Invalid game");
  }

  // First lookup own vote
  const voted = await geoPrisma.country.within(lngLat);
  const target = await geoPrisma.country.withLngLat(game.countryId);
  return { voted, target };
};

export const voteSinglePlayer = async (id: string, lngLat: LngLat) => {
  const game = await prisma.singlePlayerGame.findUnique({
    where: {
      id,
    },
  });

  if (!game) {
    throw new Error("Invalid game");
  }

  logger.debug({ event: "VoteOnLngLat", data: { lngLat } });
  const votedCountry = await geoPrisma.country.within(lngLat);
  const isCorrect =
    votedCountry.length && game.countryId === votedCountry[0].id;

  logger.debug({ event: "Vote", data: { country: votedCountry[0] } });

  if (isCorrect) {
    await prisma.singlePlayerGame.update({
      where: {
        id,
      },
      data: {
        roundState: RoundState.SUCCESS,
      },
    });

    let experiences = [Experience.COUNTRY_HIT];

    if (game.trialsForRound === 1) {
      experiences.push(Experience.FIRST_TRY_HIT);
    }

    if (game.trialsForRound === 2) {
      experiences.push(Experience.SECOND_TRY_HIT);
    }

    grantExperience(game.creatorId, experiences);
    recordSpottedCountry(game.creatorId, game.countryId);

    ee.emit(SINGLEPLAYER_UPDATED, game.id);

    /*setTimeout(() => {
                      this.nextRound();
                  }, SINGLEPLAYER_SUCCESS_TIME);
      */
    return;
  }

  await prisma.singlePlayerGame.update({
    where: {
      id,
    },
    data: {
      roundState: RoundState.FAILURE,
    },
  });

  if (game.trialsForRound >= game.maxTrials) {
    await prisma.singlePlayerGame.update({
      where: {
        id,
      },
      data: {
        roundState: RoundState.ENDED,
      },
    });
    ee.emit(SINGLEPLAYER_UPDATED, id);

    setTimeout(() => {
      nextSinglePlayerRound(id);
    }, SINGLEPLAYER_SUCCESS_TIME);
  } else {
    // vote is not correct
    await prisma.singlePlayerGame.update({
      where: {
        id,
      },
      data: {
        trialsForRound: game.trialsForRound + 1,
      },
    });

    setTimeout(async () => {
      // vote is not correct
      await prisma.singlePlayerGame.update({
        where: {
          id,
        },
        data: {
          roundState: RoundState.STARTED,
        },
      });

      ee.emit(SINGLEPLAYER_UPDATED, id);
    }, SINGLEPLAYER_ERROR_TIME);

    return geoPrisma.country.withLngLat(game.countryId);
  }

  ee.emit(SINGLEPLAYER_UPDATED, id);
};

export const nextSinglePlayerRound = async (id: string) => {
  const game = await prisma.singlePlayerGame.findUnique({
    where: {
      id,
    },
  });

  const [randomCountry] = await geoPrisma.country.takeRandom(1);
  await prisma.singlePlayerGame.update({
    where: {
      id,
    },
    data: {
      countryId: randomCountry.id,
      trialsForRound: 1,
      roundState: RoundState.PREPARED,
      roundNumber: game ? game.roundNumber + 1 : 1,
    },
  });

  setTimeout(async () => {
    await prisma.singlePlayerGame.update({
      where: {
        id,
      },
      data: {
        roundState: RoundState.STARTED,
      },
    });
    ee.emit(SINGLEPLAYER_UPDATED, id);
  }, SINGLEPLAYER_PREPARE_TIME);

  ee.emit(SINGLEPLAYER_UPDATED, id);
};
