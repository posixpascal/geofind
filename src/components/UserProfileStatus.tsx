import {UserAvatar} from "@/components/UserAvatar";
import {expLevel} from "@/utils/experience";
import React, {useState} from "react";
import {useRecoilState} from "recoil";
import {Settings} from "@prisma/client";
import {settingsState} from "@/state/settings";
import {useTranslation} from "next-i18next";
import {useCurrentUser} from "@/hooks/useCurrentUser";

export const UserProfileStatus = () => {
    const [settings, setSettings] = useRecoilState<Partial<Settings>>(settingsState);

    const {t} = useTranslation();
    const {user} = useCurrentUser();
    const [experience, setExperience] = useState(0);

    return <div className={'flex items-center gap-4'}>
        <UserAvatar width={64} height={64}/>
        <div className={"flex flex-col flex-grow"}>
            <div className={"leading-6 text-md md:text-xl"}>
                Hallo,&nbsp;
                <span className={"font-bold"}>{user.data ? user.data.name : t("loading")}</span>
            </div>

            <div className={"gap-1 flex text-sm md:text-md"}>
                {(settings.enableExperience && user.data) && (
                    <div className={"flex"}>Lvl. {expLevel(experience)}</div>
                )}
                <div className={"flex"}></div>
            </div>
        </div>
    </div>
}