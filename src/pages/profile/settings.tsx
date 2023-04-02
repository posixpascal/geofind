import {LocaleName} from "../../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Switch} from "@headlessui/react";
import {trpc} from "@/utils/trpc";
import React, {useEffect, useMemo, useState} from "react";
import {animated, useSpringRef, useTransition} from "@react-spring/web";
import {PageHeader} from "@/components/PageHeader";
import {useLocalStorage} from "react-use";
import {DEFAULT_SETTINGS, Layout} from "@/components/Layout";
import {COLOR_PALETTES, ColorPaletteKey} from "@/server/constants/colorPalette";
import {ColorSwatch} from "@/components/ColorSwatch";
import {Clickable} from "@/components/Clickable";
import {Settings} from "@prisma/client";
import {SettingsKey} from "@/server/constants/settings";
import { Container } from "@/components/Container";
import {useRecoilState} from "recoil";
import {settingsState} from "@/state/settings";



export default function ProfileSettingsPage() {
    const {t} = useTranslation('settings');
    const [settings, setSettings] = useRecoilState<Partial<Settings>>(settingsState);
    const userSettings = trpc.settings.list.useQuery();
    const updateSetting = trpc.settings.update.useMutation({
        onMutate(result){
            setSettings({
                ...settings,
                [result.key]: result.value
            });
        },
    });
    const [ready, setReady] = useState(false);

    const allSettings : {
        key: SettingsKey,
        emoji: string,
        name: string,
        description: string
    }[] = useMemo(() => [
        {
            key: 'enableAnimations',
            emoji: t('animations.emoji'),
            name: t("animations.title"),
            description: t("animations.description")
        },
        {
            key: 'enableLowPowerMode',
            emoji: t('lowpower.emoji'),
            name: t("lowpower.title"),
            description: t("lowpower.description")
        },
        {
            key: 'enableFriends',
            emoji: t('friends.emoji'),
            name: t("friends.title"),
            description: t("friends.description")
        },
        {
            key: 'enableExperience',
            emoji: t('experience.emoji'),
            name: t("experience.title"),
            description: t("experience.description")
        },
        {
            key: 'enableAds',
            emoji: t('ads.emoji'),
            name: t("ads.title"),
            description: t("ads.description")
        },
    ], []);

    useEffect(() => {
        setSettings({
            ...userSettings.data
        });
    }, [userSettings.data])

    const toggleSetting = (key: string, value: string|boolean) => {
        updateSetting.mutate({
            key,
            value: value
        })
    }

    const animation = useSpringRef();
    const [transition, api] = useTransition(allSettings.length ? allSettings : [], () => ({
        ref: animation,
        trail: 400 / allSettings.length,
        from: {opacity: 0, scale: 0},
        enter: {opacity: 1, scale: 1},
        leave: {opacity: 0, scale: 0},
    }));

    const colorSchemeAnimation = useSpringRef();
    const [colorSchemeTransition] = useTransition<ColorPaletteKey, any>(Object.keys(COLOR_PALETTES) as ColorPaletteKey[], () => ({
        ref: colorSchemeAnimation,
        trail: 400 / allSettings.length,
        from: {opacity: 0, scale: 0},
        enter: {opacity: 1, scale: 1},
        leave: {opacity: 0, scale: 0},
    }));

    useEffect(() => {
        animation.start();
        colorSchemeAnimation.start();
    }, [allSettings])

    if (!settings){
        return <></>
    }

    return (
        <Container>
            <PageHeader
                title={t('title')}
                description={t('description')}
            />
            <div className={'grid grid-cols-1 md:grid-cols-2 mt-5 gap-8'}>
                {transition((style, setting) => (
                    <animated.div style={{...style}} key={setting.key}
                                  className={'bg-card will-change-transform theme-transition flex items-center justify-between rounded-xl p-5'}>
                        <div className={'min-w-[60px] text-card-headline text-5xl'}>
                            {setting.emoji}
                        </div>
                        <div className={'flex-grow whitespace-pre-wrap text-card-paragraph'}>
                            <h3 className={'text-xl font-black'}>{setting.name}</h3>
                            <p>
                                {setting.description}
                            </p>
                        </div>
                        <div className={'items-center flex gap-2 ml-4'}>
                            <span className={'text-card-paragraph'}>
                                {settings[setting.key] ? "An" : "Aus"}
                            </span>
                            <Switch
                                defaultChecked={!!settings[setting.key]}
                                onClick={(e) => toggleSetting(setting.key,  !settings[setting.key])}
                                className={`
                                    ${settings[setting.key] ? 'bg-tertiary' : 'bg-background'}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-button focus:ring-offset-2`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`
                                        ${settings[setting.key] ? 'translate-x-5' : 'translate-x-0'}
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    `}
                                />
                            </Switch>
                        </div>
                    </animated.div>
                ))}
            </div>


            <PageHeader
                title={t('colorSchemeTitle')}
                description={t('colorSchemeDescription')}
            />
            <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-8'}>
                {colorSchemeTransition((style, colorPaletteKey: ColorPaletteKey) => (
                    <Clickable key={colorPaletteKey} onClick={() => toggleSetting('colorPalette', colorPaletteKey)}>
                    <animated.div
                                  style={{...style, background: COLOR_PALETTES[colorPaletteKey].background}}
                                  className={`flex items-center justify-between rounded-xl p-5 relative`}>
                        <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].button}/>
                        <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].tertiary}/>
                        <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].secondary}/>
                        <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].paragraph}/>
                        <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].headline}/>
                        {settings?.colorPalette === colorPaletteKey && <span className={'absolute -top-2 -right-2'}>✅</span>}
                    </animated.div>
                    </Clickable>
                ))}
            </div>
        </Container>
    );
}


export const getServerSideProps = async ({
                                             locale,
                                         }: {
    locale: LocaleName;
}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "settings", "menu"])),
        },
    };
};
