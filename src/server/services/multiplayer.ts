import {geoPrisma} from "@/server/prismaGeoExtension";
import {prisma} from "@/server/prisma";
import {RoundState} from "@prisma/client";
import ee from "@/server/eventEmitter";
import {SINGLEPLAYER_UPDATED} from "@/server/constants/events";

const createRoomCode = async () => String(Math.random())

export const createMultiPlayer = async (creatorId: string) => {
    const multiplayer = await prisma.multiPlayerGame.create({
        data: {
            creatorId,
            roomCode: await createRoomCode(),
            isPublic: false,

        },
    });

    return multiplayer;
}