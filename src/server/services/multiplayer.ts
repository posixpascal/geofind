import { prisma } from "@/server/prisma";
import { GameSessionState } from "@prisma/client";
import ee from "@/server/eventEmitter";
import { MULTIPLAYER_UPDATED } from "@/server/constants/events";

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
