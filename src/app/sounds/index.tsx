import UIfx from "uifx";

// @ts-ignore - Parcel does resolve this
import helloDarknessMp3 from "./helloDarkness.mp3";

// @ts-ignore - Parcel does resolve this
import mapPinMp3 from "./mapPin.mp3";

export const helloDarknessSound = new UIfx(
    helloDarknessMp3,
    {
        volume: 0.5,
    },
);

export const mapPinSound = new UIfx(
    mapPinMp3,
    {
        volume: 0.05,
    },
);

export const playSoundIfPossible = async (sound) => {
    if (!localStorage.getItem("audioMuted")) {
        return sound.play();
    }
};
