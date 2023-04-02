import {Settings} from "@prisma/client";


export type SettingsKey = keyof Omit<Settings, 'id' | 'userId'>

export const DEFAULT_SETTINGS : Record<SettingsKey, any> = {
    enableAnimations: true,
    enableExperience: true,
    enableFriends: true,
    enableLowPowerMode: false,
    enablePrivacyMode: true,
    enableAds: false,
    colorPalette: 'main',
}