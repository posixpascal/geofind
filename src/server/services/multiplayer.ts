import { prisma } from "@/server/prisma";
import { GameSessionState, GameState, RoundState } from "@prisma/client";
import ee from "@/server/eventEmitter";
import { MULTIPLAYER_UPDATED } from "@/server/constants/events";
import { geoPrisma } from "@/server/prismaGeoExtension";
import {
  MULTIPLAYER_END_TIME,
  MULTIPLAYER_PREPARE_TIME,
  MULTIPLAYER_SUCCESS_TIME,
} from "@/server/constants/timings";
import { LngLat } from "maplibre-gl";

const MAX_SYNCHRONIZATION_ATTEMPTS = 10;

const createRoomCode = async () => {
  let characters = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
  const randomRoomCode = (length: number) =>
    Array.from({ length })
      .map(
        (_, index) => characters[Math.floor(Math.random() * characters.length)]
      )
      .join("");

  let length = 2;
  let roomCode = randomRoomCode(length);
  while (true) {
    const existingGame = await prisma.multiPlayerGame.findUnique({
      where: {
        roomCode,
      },
    });

    if (!existingGame) {
      break;
    }

    roomCode = randomRoomCode(length++);
  }

  return roomCode;
};

export const createMultiPlayer = async (creatorId: string) => {
  const multiplayer = await prisma.multiPlayerGame.create({
    data: {
      creatorId,
      roomCode: await createRoomCode(),
      isPublic: false,
    },
  });

  return multiplayer;
};

export const joinMultiPlayer = async (
  userId: string,
  multiPlayerGameId: string
) => {
  const existingSession = await prisma.multiPlayerSession.findUnique({
    where: {
      multiPlayerGameId_userId: {
        userId,
        multiPlayerGameId,
      },
    },
  });

  if (existingSession) {
    await prisma.multiPlayerSession.update({
      where: {
        id: existingSession.id,
      },
      data: {
        state: GameSessionState.CONNECTED,
      },
    });
  } else {
    await prisma.multiPlayerSession.create({
      data: {
        userId,
        multiPlayerGameId,
        state: GameSessionState.CONNECTED,
        score: 0,
      },
    });
  }

  ee.emit(MULTIPLAYER_UPDATED, multiPlayerGameId);
};

export const leaveMultiPlayer = async (
  userId: string,
  multiPlayerGameId: string
) => {
  const existingSession = await prisma.multiPlayerSession.findUnique({
    where: {
      multiPlayerGameId_userId: {
        userId,
        multiPlayerGameId,
      },
    },
  });

  if (!existingSession) {
    return;
  }

  await prisma.multiPlayerSession.update({
    where: {
      id: existingSession.id,
    },
    data: {
      state: GameSessionState.DISCONNECTED,
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, multiPlayerGameId);
};

export const voteMultiPlayer = async (
  userId: string,
  multiPlayerGameId: string,
  { lng, lat }: any
) => {
  console.log("user", userId, "on", lng, lat);
  const multiplayer = await prisma.multiPlayerGame.findUnique({
    where: {
      id: multiPlayerGameId,
    },
  });

  const existingSession = await prisma.multiPlayerSession.findUnique({
    where: {
      multiPlayerGameId_userId: {
        userId,
        multiPlayerGameId,
      },
    },
  });

  if (!existingSession) {
    return;
  }

  const countriesWithin = await geoPrisma.country.within(
    LngLat.convert({
      lat,
      lng,
    })
  );

  console.log(countriesWithin);

  const isCorrect = countriesWithin.some(
    (country) => country.id === multiplayer.countryId
  );

  await prisma.multiPlayerSession.update({
    where: {
      id: existingSession.id,
    },
    data: {
      lat,
      lng,
      isCorrect,
    },
  });
  ee.emit(MULTIPLAYER_UPDATED, multiPlayerGameId);
};

export const startMultiPlayerGame = async (id: string) => {
  console.info("Started multiplayer game");
  await prisma.multiPlayerGame.update({
    where: {
      id,
    },
    data: {
      gameState: GameState.PLAYING,
      synchronized: false,
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, id);
  synchronizeGame(id);
};

export const endMultiPlayerGame = async (id: string) => {
  console.info("Ended multiplayer game");
  await prisma.multiPlayerGame.update({
    where: {
      id,
    },
    data: {
      gameState: GameState.ENDED,
      synchronized: true,
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, id);
};

const checkGameOver = async (id: string) => {
  const game = await prisma.multiPlayerGame.findUnique({
    where: {
      id,
    },
    include: {
      sessions: true,
    },
  });

  if (!game) {
    return;
  }

  const playersFinished = game.sessions.filter((session) => session.score > 10); // TODO: score
  if (playersFinished.length === 1) {
    await endMultiPlayerGame(id);
  }
};

const scoreBoardMultiPlayerRound = async (id: string) => {
  const game = await prisma.multiPlayerGame.findUnique({
    where: {
      id,
    },
    include: {
      sessions: true,
    },
  });

  if (!game) {
    return;
  }

  // evaluate all votes
  for await (const session of game.sessions) {
    if (session.isCorrect) {
      await prisma.multiPlayerSession.update({
        where: {
          id: session.id,
        },
        data: {
          score: {
            increment: 1,
          },
        },
      });
    }
  }

  await prisma.multiPlayerGame.update({
    where: {
      id,
    },
    data: {
      roundState: RoundState.SCOREBOARD,
    },
  });
  await checkGameOver(id);

  ee.emit(MULTIPLAYER_UPDATED, id);
  setTimeout(async () => {
    await prepareMultiPlayerRound(id);
  }, MULTIPLAYER_SUCCESS_TIME);
};

export const endMultiPlayerRound = async (id: string) => {
  const game = await prisma.multiPlayerGame.findUnique({
    where: {
      id,
    },
  });

  if (!game) {
    return;
  }

  await prisma.multiPlayerGame.update({
    where: {
      id,
    },
    data: {
      roundState: RoundState.ENDED,
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, id);

  setTimeout(() => {
    scoreBoardMultiPlayerRound(id);
  }, MULTIPLAYER_END_TIME);
};

export const startMultiPlayerRound = async (id: string) => {
  const game = await prisma.multiPlayerGame.findUnique({
    where: {
      id,
    },
  });

  if (!game) {
    return;
  }

  await prisma.multiPlayerGame.update({
    where: {
      id,
    },
    data: {
      roundState: RoundState.STARTED,
      roundStartedAt: new Date(),
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, id);
  setTimeout(() => {
    endMultiPlayerRound(id);
  }, (game.roundTime + 1) * 1000);
};

export const prepareMultiPlayerRound = async (id: string) => {
  const [{ id: countryId }] = await geoPrisma.country.takeRandom(1);
  await prisma.multiPlayerGame.update({
    where: {
      id,
    },
    data: {
      gameState: GameState.PLAYING,
      roundState: RoundState.PREPARED,
      countryId,
      sessions: {
        updateMany: {
          where: {
            multiPlayerGameId: id,
          },
          data: {
            lat: null,
            lng: null,
            isCorrect: false,
          },
        },
      },
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, id);

  setTimeout(() => {
    startMultiPlayerRound(id);
  }, MULTIPLAYER_PREPARE_TIME);
};

export const synchronizeSession = async (
  userId: string,
  multiPlayerGameId: string
) => {
  const existingSession = await prisma.multiPlayerSession.findUnique({
    where: {
      multiPlayerGameId_userId: {
        userId,
        multiPlayerGameId,
      },
    },
  });

  if (!existingSession) {
    return;
  }

  await prisma.multiPlayerSession.update({
    where: {
      id: existingSession.id,
    },
    data: {
      isSynchronized: true,
    },
  });

  ee.emit(MULTIPLAYER_UPDATED, multiPlayerGameId);
};

/**
 * Wait until every connected session has their map loaded or forcefully apply synchronization
 * @param id
 */
const synchronizeGame = (id) => {
  let fails = 0;
  let synchronizationInterval = setInterval(async () => {
    const sessions = await prisma.multiPlayerSession.findMany({
      where: {
        multiPlayerGame: {
          id,
        },
        state: GameSessionState.CONNECTED,
      },
    });

    const inSynchronization = sessions.some(
      (session) => !session.isSynchronized
    );
    if (inSynchronization && fails < MAX_SYNCHRONIZATION_ATTEMPTS) {
      fails++;
      return;
    }

    // Game is synchronized (maybe). Proceed anyway.
    await prisma.multiPlayerGame.update({
      where: {
        id,
      },
      data: {
        synchronized: true,
      },
    });

    clearInterval(synchronizationInterval);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // TODO: sleep
    await prepareMultiPlayerRound(id);
    ee.emit(MULTIPLAYER_UPDATED, id);
  }, 300);
};
