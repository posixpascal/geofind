import {ColorPalette, ColorPaletteKey} from "@/server/constants/colorPalette";

export const lookupThemeColor = (color: keyof ColorPalette) => {
    const simplifiedRGB = getComputedStyle(document.querySelector('main')!).getPropertyValue('--color-' + color);
    return `rgb(${simplifiedRGB.split(' ').join(', ')})`;
}