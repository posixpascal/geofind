"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAchievement = exports.verifyContinentAchievement = exports.awardAchievement = exports.verifyAchievement = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("@/server/prisma");
const enums_1 = require("@/utils/enums");
const eventEmitter_1 = __importDefault(require("@/server/eventEmitter"));
const events_1 = require("@/server/constants/events");
const user_1 = require("@/server/services/user");
const verifyAchievement = async (user, achievement) => {
    if (await (0, exports.hasAchievement)(user, achievement)) {
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
        case client_1.AchievementType.CONTINENTS:
            result = await (0, exports.verifyContinentAchievement)(user, achievement);
            break;
    }
    if (result.awarded) {
        return await (0, exports.awardAchievement)(user, achievement);
    }
    return result;
};
exports.verifyAchievement = verifyAchievement;
const awardAchievement = async (user, achievement) => {
    await prisma_1.prisma.usersOnAchievements.create({
        data: {
            userId: user.id,
            achievementId: achievement.id,
            awardedAt: new Date(),
        },
    });
    eventEmitter_1.default.emit(events_1.ACHIEVEMENT_AWARDED, achievement);
    await (0, user_1.grantAchievementExperience)(user.id, achievement.experienceOnGain);
};
exports.awardAchievement = awardAchievement;
const verifyContinentAchievement = async (user, achievement) => {
    let result = {
        awarded: false,
        progress: 0,
        total: 0,
    };
    switch (achievement.name) {
        case enums_1.Continents.ALL.toString().toLocaleLowerCase(): {
            const worldCountries = await prisma_1.prisma.country.count();
            const spottedCountries = await prisma_1.prisma.countrySpotted.count({
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
            const continents = {
                europe: "Europe",
                asia: "Asia",
                northamerica: "North America",
                southamerica: "South America",
                oceania: "Oceania",
                africa: "Africa",
            };
            const continentCountries = await prisma_1.prisma.country.findMany({
                where: {
                    continent: continents[achievement.name],
                },
                select: {
                    id: true,
                },
            });
            const spottedCountries = await prisma_1.prisma.countrySpotted.findMany({
                select: {
                    countryId: true,
                },
                where: {
                    userId: user.id,
                    countryId: {
                        in: continentCountries.map((continentCountry) => continentCountry.id),
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
exports.verifyContinentAchievement = verifyContinentAchievement;
const hasAchievement = async (user, achievement) => {
    const awardedAchievement = await prisma_1.prisma.usersOnAchievements.findFirst({
        where: {
            achievementId: achievement.id,
            userId: user.id,
        },
    });
    return !!awardedAchievement;
};
exports.hasAchievement = hasAchievement;
