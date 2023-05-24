"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextSinglePlayerRound = exports.voteSinglePlayer = exports.solveSinglePlayerRound = exports.skipSinglePlayerRound = exports.startSinglePlayer = exports.createSinglePlayer = void 0;
const prisma_1 = require("@/server/prisma");
const client_1 = require("@prisma/client");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
const prismaGeoExtension_1 = require("@/server/prismaGeoExtension");
const logger_1 = __importDefault(require("@/server/logger"));
const exp_1 = require("@/server/constants/exp");
const user_1 = require("@/server/services/user");
const timings_1 = require("@/server/constants/timings");
const createSinglePlayer = async (creatorId) => {
    const [randomCountry] = await prismaGeoExtension_1.geoPrisma.country.takeRandom(3);
    const singleplayer = await prisma_1.prisma.singlePlayerGame.create({
        data: {
            creatorId,
            countryId: randomCountry.id,
            trialsForRound: 1,
            roundState: client_1.RoundState.PREPARED,
        },
    });
    eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, singleplayer.id);
    return singleplayer;
};
exports.createSinglePlayer = createSinglePlayer;
const startSinglePlayer = async (id) => {
    const game = await prisma_1.prisma.singlePlayerGame.update({
        where: {
            id,
        },
        data: {
            roundState: client_1.RoundState.STARTED,
        },
    });
    eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, game.id);
};
exports.startSinglePlayer = startSinglePlayer;
const skipSinglePlayerRound = async (id) => {
    const game = await prisma_1.prisma.singlePlayerGame.findUnique({
        where: {
            id,
        },
    });
    if (!game) {
        throw new Error("Invalid game");
    }
    await prisma_1.prisma.singlePlayerGame.update({
        where: {
            id,
        },
        data: {
            roundState: client_1.RoundState.ENDED,
        },
    });
    eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, game.id);
};
exports.skipSinglePlayerRound = skipSinglePlayerRound;
const solveSinglePlayerRound = async (id, lngLat) => {
    const game = await prisma_1.prisma.singlePlayerGame.findUnique({
        where: {
            id,
        },
    });
    if (!game) {
        throw new Error("Invalid game");
    }
    // First lookup own vote
    const voted = await prismaGeoExtension_1.geoPrisma.country.within(lngLat);
    const target = await prismaGeoExtension_1.geoPrisma.country.withLngLat(game.countryId);
    return { voted, target };
};
exports.solveSinglePlayerRound = solveSinglePlayerRound;
const voteSinglePlayer = async (id, lngLat) => {
    const game = await prisma_1.prisma.singlePlayerGame.findUnique({
        where: {
            id,
        },
    });
    if (!game) {
        throw new Error("Invalid game");
    }
    logger_1.default.debug({ event: "VoteOnLngLat", data: { lngLat } });
    const votedCountry = await prismaGeoExtension_1.geoPrisma.country.within(lngLat);
    const isCorrect = votedCountry.length && game.countryId === votedCountry[0].id;
    logger_1.default.debug({ event: "Vote", data: { country: votedCountry[0] } });
    if (isCorrect) {
        await prisma_1.prisma.singlePlayerGame.update({
            where: {
                id,
            },
            data: {
                roundState: client_1.RoundState.SUCCESS,
            },
        });
        let experiences = [exp_1.Experience.COUNTRY_HIT];
        if (game.trialsForRound === 1) {
            experiences.push(exp_1.Experience.FIRST_TRY_HIT);
        }
        if (game.trialsForRound === 2) {
            experiences.push(exp_1.Experience.SECOND_TRY_HIT);
        }
        (0, user_1.grantExperience)(game.creatorId, experiences);
        (0, user_1.recordSpottedCountry)(game.creatorId, game.countryId);
        eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, game.id);
        /*setTimeout(() => {
                          this.nextRound();
                      }, SINGLEPLAYER_SUCCESS_TIME);
          */
        return;
    }
    await prisma_1.prisma.singlePlayerGame.update({
        where: {
            id,
        },
        data: {
            roundState: client_1.RoundState.FAILURE,
        },
    });
    if (game.trialsForRound >= game.maxTrials) {
        await prisma_1.prisma.singlePlayerGame.update({
            where: {
                id,
            },
            data: {
                roundState: client_1.RoundState.ENDED,
            },
        });
        eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, id);
        setTimeout(() => {
            (0, exports.nextSinglePlayerRound)(id);
        }, timings_1.SINGLEPLAYER_SUCCESS_TIME);
    }
    else {
        // vote is not correct
        await prisma_1.prisma.singlePlayerGame.update({
            where: {
                id,
            },
            data: {
                trialsForRound: game.trialsForRound + 1,
            },
        });
        setTimeout(async () => {
            // vote is not correct
            await prisma_1.prisma.singlePlayerGame.update({
                where: {
                    id,
                },
                data: {
                    roundState: client_1.RoundState.STARTED,
                },
            });
            eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, id);
        }, timings_1.SINGLEPLAYER_ERROR_TIME);
        return prismaGeoExtension_1.geoPrisma.country.withLngLat(game.countryId);
    }
    eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, id);
};
exports.voteSinglePlayer = voteSinglePlayer;
const nextSinglePlayerRound = async (id) => {
    const game = await prisma_1.prisma.singlePlayerGame.findUnique({
        where: {
            id,
        },
    });
    const [randomCountry] = await prismaGeoExtension_1.geoPrisma.country.takeRandom(1);
    await prisma_1.prisma.singlePlayerGame.update({
        where: {
            id,
        },
        data: {
            countryId: randomCountry.id,
            trialsForRound: 1,
            roundState: client_1.RoundState.PREPARED,
            roundNumber: game ? game.roundNumber + 1 : 1,
        },
    });
    setTimeout(async () => {
        await prisma_1.prisma.singlePlayerGame.update({
            where: {
                id,
            },
            data: {
                roundState: client_1.RoundState.STARTED,
            },
        });
        eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, id);
    }, timings_1.SINGLEPLAYER_PREPARE_TIME);
    eventEmitter_1.default.emit(events_1.SINGLEPLAYER_UPDATED, id);
};
exports.nextSinglePlayerRound = nextSinglePlayerRound;
