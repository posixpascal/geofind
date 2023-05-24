"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grantAchievementExperience = exports.grantExperience = exports.recordSpottedCountry = void 0;
const prisma_1 = require("@/server/prisma");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
const exp_1 = require("@/server/constants/exp");
const recordSpottedCountry = async (userId, countryId) => {
    const spottedBefore = await prisma_1.prisma.countrySpotted.findFirst({
        where: {
            userId,
            countryId,
        },
    });
    if (!spottedBefore) {
        return await prisma_1.prisma.countrySpotted.create({
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
    return await prisma_1.prisma.countrySpotted.update({
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
exports.recordSpottedCountry = recordSpottedCountry;
const grantExperience = async (userId, experiences) => {
    await prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            experience: {
                increment: experiences.reduce((acc, type) => acc + exp_1.ExperienceValue[type], 0),
            },
        },
    });
    eventEmitter_1.default.emit(events_1.EXPERIENCE_UPDATED, experiences);
};
exports.grantExperience = grantExperience;
const grantAchievementExperience = async (userId, amount = 0) => {
    await prisma_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            experience: {
                increment: amount,
            },
        },
    });
    eventEmitter_1.default.emit(events_1.EXPERIENCE_UPDATED, [events_1.ACHIEVEMENT_AWARDED]);
};
exports.grantAchievementExperience = grantAchievementExperience;
