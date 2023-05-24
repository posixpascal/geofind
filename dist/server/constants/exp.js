"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceValue = exports.Experience = void 0;
const events_1 = require("@/server/constants/events");
var Experience;
(function (Experience) {
    Experience["COUNTRY_HIT"] = "COUNTRY_HIT";
    Experience["FIRST_TRY_HIT"] = "FIRST_TRY_HIT";
    Experience["FAST_HIT"] = "FAST_HIT";
    Experience["SECOND_TRY_HIT"] = "SECOND_TRY_HIT";
    Experience["ACHIEVEMENT_AWARDED"] = "ACHIEVEMENT_AWARDED";
})(Experience = exports.Experience || (exports.Experience = {}));
exports.ExperienceValue = {
    [Experience.COUNTRY_HIT]: 30,
    [Experience.SECOND_TRY_HIT]: 20,
    [Experience.FAST_HIT]: 50,
    [Experience.FIRST_TRY_HIT]: 70,
    [events_1.ACHIEVEMENT_AWARDED]: 100,
};
