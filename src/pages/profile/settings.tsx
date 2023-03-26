import {LocaleName} from "../../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import {Switch} from "@headlessui/react";
import {trpc} from "@/utils/trpc";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import React, {useEffect, useMemo, useState} from "react";
import {animated, useTransition} from "@react-spring/web";
import { Settings } from "@prisma/client";

export default function ProfileSettingsPage() {
    const {t} = useTranslation('settings');
    const userSettings = trpc.settings.list.useQuery();
    const updateSetting = trpc.settings.update.useMutation();
    const [ready, setReady] = useState(false);
    const [settings, setSettings] = useState<Settings>({
        enableAnimations: true,
        enableLowPowerMode: false,
        enableFriends: true,
        enableExperience: true,
        enableDarkMode: false,
        enableAds: false,
    });

    const allSettings = useMemo(() => [
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
        {
            key: 'enableDarkMode',
            emoji: t('darkmode.emoji'),
            name: t("darkmode.title"),
            description: t("darkmode.description")
        }
    ], []);

    useEffect(() => {
        if (!userSettings.data) {
            return;
        }

        setSettings({
            ...userSettings.data
        });

        setReady(true);
    }, [setSettings, userSettings.data])

    const toggleSetting = (key: string, v: any) => {
        setSettings((settings) => {
            updateSetting.mutate({
                key,
                value: v
            });

            return {
                ...settings,
                [key]: v
            }
        });
    }

    const transition = useTransition(userSettings.data ? allSettings : [], {
        trail: 400 / allSettings.length,
        from: {opacity: 0, scale: 0},
        enter: {opacity: 1, scale: 1},
        leave: {opacity: 0, scale: 0},
    });


    if (!ready || !userSettings.isSuccess || userSettings.isLoading) {
        return <LoadingSpinner/>;
    }

    return (
        <div>
            <div className={'bg-white dark:bg-slate-900 dark:text-slate-200 p-5 rounded-xl'}>
                <h3 className={'font-black text-2xl'}>{t('title')}</h3>
                <h3 className={'text-gray-600 dark:text-slate-400'}>{t('description')}</h3>

            </div>
            <div className={'grid grid-cols-2 mt-5 gap-8'}>
                {transition((style, setting) => (
                    <animated.div style={{...style}} key={setting.name}
                                  className={'bg-white dark:bg-slate-900 dark:text-slate-200 flex items-center justify-between rounded-xl p-5'}>
                        <div className={'min-w-[60px] text-5xl'}>
                            {setting.emoji}
                        </div>
                        <div className={'flex-grow whitespace-pre-wrap break-all'}>
                            <h3 className={'text-xl font-black'}>{setting.name}</h3>
                            <p>
                                {setting.description}
                            </p>
                        </div>
                        <div>
                            <Switch
                                defaultChecked={settings[setting.key]}
                                onChange={(e) => toggleSetting(setting.key, e)}
                                className={`
                                    ${settings[setting.key] ? 'bg-orange-600' : 'bg-gray-200'}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-orange-600 focus:ring-offset-2`}
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
        </div>
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
