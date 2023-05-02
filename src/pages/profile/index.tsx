import {LocaleName} from "../../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {format} from "date-fns";
import {IconButton} from "@/components/IconButton";
import React from "react";
import {trpc} from "@/utils/trpc";
import {AchievementMedal, Settings} from "@prisma/client";
import {animated, useSpring} from "@react-spring/web";
import {FriendList} from "@/components/FriendList";
import {ExperienceList} from "@/components/ExperienceList";
import {ProfileForm} from "@/components/ProfileForm";
import {useTranslation} from "next-i18next";
import {useRecoilState} from "recoil";
import {settingsState} from "@/state/settings";

export default function ProfilePage() {
    const [settings, setSettings] = useRecoilState<Partial<Settings>>(settingsState);

    const {user} = useCurrentUser();
    const {t} = useTranslation('profile');
    const achievements = trpc.achievements.medals.useQuery();
    const {scale, opacity} = useSpring({
        from: {scale: 0, opacity: 0},
        to: {scale: 1, opacity: 1},
        config: {mass: 2}
    });

    const {scale: scaleSmall, opacity: opacitySmall} = useSpring({
        from: {scale: 0, opacity: 0},
        to: {scale: 1, opacity: 1},
        config: {mass: 1.5},
        delay: 800,
    });

    const {scale: scaleBig, opacity: opacityBig} = useSpring({
        from: {scale: 0, opacity: 0},
        to: {scale: 1, opacity: 1},
        config: {mass: 1},
        delay: 400,
    });

    if (!user.data || user.isLoading || achievements.isLoading) {
        return <LoadingSpinner/>
    }


    return (
        <div className={'flex flex-col gap-8'}>
            <div className={'grid w-full grid-cols-1 lg:grid-cols-3 gap-8'}>
                <animated.div style={{scale, opacity}}
                              className={'bg-card text-card-paragraph flex col-span-2 gap-8 items-center justify-between rounded-xl p-5'}>
                    <div className={'col-span-1'}>
                        <div className={'flex flex-col gap-1'}>
                            <h2 className={'text-4xl font-black flex items-center gap-4 text-card-headline'}>
                                {user.data!.name!}
                                {settings.enableFriends && <><span>
                                &bull;
                            </span>
                                    <span className={''}>
                                {user.data!.friendCode}
                            </span></>}
                            </h2>
                            <p className={'text-2xl flex gap-8'}>
                            <span>
                                {achievements.data![AchievementMedal.RIBBON]} 🎀
                            </span>
                                <span>
                                {achievements.data![AchievementMedal.CROWN]} 👑
                            </span>
                                <span>
                                {achievements.data![AchievementMedal.GEM]} 💎
                            </span>
                            </p>
                            <p className={'text-xl'}>
                                {t('joined', {at: format(user.data.joinedAt!, "dd.MM.yyyy")})}
                            </p>
                        </div>
                    </div>
                </animated.div>
                <animated.div style={{scale, opacity}}>
                    <div
                        className={'bg-card h-full text-card-paragraph flex gap-8 items-center justify-between rounded-xl p-5 text-right text-sm'}>
                        <div className={'items-start flex-col w-full lg:justify-center h-full flex'}>
                            <h2 className={'text-2xl font-black flex items-center gap-4 text-card-headline'}>
                                {t("saveAccount")}
                            </h2>
                            {user.data.isGuest && <p className={'text-card-paragraph mb-8'}>
                                {t('loggedInAsGuest')}
                            </p>}
                            <div className={'flex w-full'}>
                                <IconButton full={true} size={'sm'}>
                                    {t('registerNow')}
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </animated.div>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'}>
                <animated.div style={{opacity: opacityBig, scale: scaleBig}}
                              className={'grid-cols-1 xl:col-span-2 bg-card rounded-xl p-5'}>
                    <ProfileForm/>
                </animated.div>
                <div className={'flex flex-col gap-4'}>
                    {settings.enableFriends && <animated.div style={{opacity: opacitySmall, scale: scaleSmall}}>
                        <div className={'bg-card rounded-xl p-5'}>
                            <FriendList/>
                        </div>
                    </animated.div>}
                    {settings.enableExperience &&
                        <animated.div style={{opacity: opacitySmall, scale: scaleSmall}}>
                            <div className={'bg-card rounded-xl p-5'}>
                                <ExperienceList/>
                            </div>
                        </animated.div>}
                </div>
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
            ...(await serverSideTranslations(locale, ["common", "profile", "experience", "friends", "menu"])),
        },
    };
};
