import DE from "./de.json";
import EN from "./en.json";

export const language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
    navigator.language ||   // All browsers
    (navigator as any).userLanguage; // IE <= 10

export const strings: any = language.indexOf("de") > -1 ? DE : EN;
