import React, {ReactNode} from "react";
import {Tile} from "@/components/Tile";
import {useTranslation} from "next-i18next";
import {Tag} from "./Tag";

import GlobeIcon from "@/assets/svgs/icons/globe.svg"
import JoystickIcon from "@/assets/svgs/icons/joystick.svg"
import SwordsIcon from "@/assets/svgs/icons/swords.svg"
import AchievementsIcon from "@/assets/svgs/icons/achievements.svg"
import PinIcon from "@/assets/svgs/icons/pin.svg"
import LearnIcon from "@/assets/svgs/icons/learn.svg"
import ClockIcon from "@/assets/svgs/icons/clock.svg"
import EmailIcon from "@/assets/svgs/icons/email.svg"
import Link from "next/link";


interface MainMenuItem {
    to: string;
    icon: ReactNode;
    tag: ReactNode;
    title: string;
    content: string
}

export const MenuItems = () => {
    const {t: menu} = useTranslation('menu');

    const menuItems: MainMenuItem[] = [
        {
            to: "/multiplayer/create",
            icon: <GlobeIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'blue'} title={menu('tags.multiplayer')}/>,
            title: menu('multiplayer_create.title'),
            content: menu('multiplayer_create.content'),
        },

        {
            to: "/multiplayer/join",
            icon: <JoystickIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'blue'} title={menu('tags.multiplayer')}/>,
            title: menu('multiplayer_join.title'),
            content: menu('multiplayer_join.content'),
        },

        {
            to: "/competitive/ladder",
            icon: <SwordsIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'red'} title={menu('tags.competitive')}/>,
            title: menu('competitive_ladder.title'),
            content: menu('competitive_ladder.content'),
        },

        {
            to: "/competitive/timetrial",
            icon: <ClockIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'red'} title={menu('tags.competitive')}/>,
            title: menu('competitive_timetrial.title'),
            content: menu('competitive_timetrial.content'),
        },

        {
            to: "/profile/achievements",
            icon: <AchievementsIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'orange'} title={menu('tags.profile')}/>,
            title: menu('achievements.title'),
            content: menu('achievements.content'),
        },

        {
            to: "/profile/pins",
            icon: <PinIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'orange'} title={menu('tags.profile')}/>,
            title: menu('pins.title'),
            content: menu('pins.content'),
        },

        {
            to: "/singleplayer/",
            icon: <LearnIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'green'} title={menu('tags.singleplayer')}/>,
            title: menu('singleplayer.title'),
            content: menu('singleplayer.content'),
        },

        {
            to: "/feedback",
            icon: <EmailIcon className={'w-[80px] h-[80px]'}/>,
            tag: <Tag variant={'gray'} title={menu('tags.other')}/>,
            title: menu('feedback.title'),
            content: menu('feedback.content'),
        },
    ];

    return (<>
        {menuItems.map(menuItem => <Link href={menuItem.to} key={menuItem.to}>
            <Tile
                key={menuItem.to}
                {...menuItem}
            /></Link>)}
    </>);
}