"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupThemeColor = void 0;
const lookupThemeColor = (color) => {
    const simplifiedRGB = getComputedStyle(document.querySelector("main")).getPropertyValue("--color-" + color);
    return `rgb(${simplifiedRGB.split(" ").join(", ")})`;
};
exports.lookupThemeColor = lookupThemeColor;
