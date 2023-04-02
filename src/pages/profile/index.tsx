import {LocaleName} from "../../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {UserAvatar} from "@/components/UserAvatar";
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
            <animated.div style={{scale, opacity}}
                          className={'bg-card text-card-paragraph flex gap-8 items-center justify-between rounded-xl p-5'}>
                <div className={'flex gap-8 items-center'}>
                    <UserAvatar width={96} height={96}/>
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
                            {t('joined', { at: format(user.data.joinedAt!, "dd.MM.yyyy") })}
                        </p>
                    </div>
                </div>
                <div className={'flex flex-col items-end text-right text-sm'}>
                    <IconButton>
                        {t('saveAccount')}
                    </IconButton>
                    {user.data.isGuest && <p className={'text-card-paragraph'}>
                        {t('loggedInAsGuest')}
                    </p>}
                </div>
            </animated.div>
            <div className={'grid grid-cols-3 gap-8'}>
                <animated.div style={{opacity: opacityBig, scale: scaleBig}}
                              className={'col-span-2 bg-card rounded-xl p-5'}>
                    <ProfileForm />
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
