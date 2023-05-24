"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomName = void 0;
const words_1 = require("@/server/constants/words");
const randomName = (locale = "en") => {
    console.log(locale);
    const adjective = words_1.ADJECTIVES[locale].at(Math.floor(Math.random() * words_1.ADJECTIVES[locale].length));
    const animal = words_1.ANIMALS[locale].at(Math.floor(Math.random() * words_1.ANIMALS[locale].length));
    return `${adjective} ${animal}`;
};
exports.randomName = randomName;
