import {atom, RecoilState} from "recoil";
import {Settings} from "@prisma/client";
import {DEFAULT_SETTINGS} from "@/server/constants/settings";

export const settingsState: RecoilState<Partial<Settings>> = atom({
    key: "settingsKey",
    default: DEFAULT_SETTINGS,
});
