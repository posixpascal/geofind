"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveMultiPlayer = exports.joinMultiPlayer = exports.createMultiPlayer = void 0;
const prisma_1 = require("@/server/prisma");
const client_1 = require("@prisma/client");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
const createRoomCode = async () => {
    let characters = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
    const randomRoomCode = (length) => Array.from({ length })
        .map((_, index) => characters[Math.floor(Math.random() * characters.length)])
        .join("");
    let length = 2;
    let roomCode = randomRoomCode(length);
    while (true) {
        const existingGame = await prisma_1.prisma.multiPlayerGame.findUnique({
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
const createMultiPlayer = async (creatorId) => {
    const multiplayer = await prisma_1.prisma.multiPlayerGame.create({
        data: {
            creatorId,
            roomCode: await createRoomCode(),
            isPublic: false,
        },
    });
    return multiplayer;
};
exports.createMultiPlayer = createMultiPlayer;
const joinMultiPlayer = async (userId, multiPlayerGameId) => {
    const existingSession = await prisma_1.prisma.multiPlayerSession.findUnique({
        where: {
            multiPlayerGameId_userId: {
                userId,
                multiPlayerGameId,
            },
        },
    });
    if (existingSession) {
        await prisma_1.prisma.multiPlayerSession.update({
            where: {
                id: existingSession.id,
            },
            data: {
                state: client_1.GameSessionState.CONNECTED,
            },
        });
    }
    else {
        await prisma_1.prisma.multiPlayerSession.create({
            data: {
                userId,
                multiPlayerGameId,
                state: client_1.GameSessionState.CONNECTED,
                score: 0,
            },
        });
    }
    eventEmitter_1.default.emit(events_1.MULTIPLAYER_UPDATED, multiPlayerGameId);
};
exports.joinMultiPlayer = joinMultiPlayer;
const leaveMultiPlayer = async (userId, multiPlayerGameId) => {
    const existingSession = await prisma_1.prisma.multiPlayerSession.findUnique({
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
    await prisma_1.prisma.multiPlayerSession.update({
        where: {
            id: existingSession.id,
        },
        data: {
            state: client_1.GameSessionState.DISCONNECTED,
        },
    });
    eventEmitter_1.default.emit(events_1.MULTIPLAYER_UPDATED, multiPlayerGameId);
};
exports.leaveMultiPlayer = leaveMultiPlayer;
