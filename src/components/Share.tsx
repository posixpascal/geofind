import React from "react";
import {useTranslation} from "next-i18next";
import {Input} from "@/components/Input";

import TelegramIcon from "@/assets/svgs/social/telegram.svg";
import TwitterIcon from "@/assets/svgs/social/twitter.svg";
import WhatsappIcon from "@/assets/svgs/social/whatsapp.svg";
import DiscordIcon from "@/assets/svgs/social/discord.svg";

interface ShareProps {
    url: string;
}

export const Share: React.FC<ShareProps> = ({url}) => {
    const {t} = useTranslation();

    const socialMedia = [
        {
            icon: <TelegramIcon className={'h-8 w-8 fill-card-paragraph'}/>,
            name: "Telegram"
        },
        {
            icon: <TwitterIcon className={'h-8 w-8 fill-card-paragraph'}/>,
            name: "Twitter",
        },
        {
            icon: <WhatsappIcon className={'h-8 w-8 fill-card-paragraph'}/>,
            name: "Whatsapp",
        },
        {
            icon: <DiscordIcon className={'h-8 w-8 fill-card-paragraph'}/>,
            name: "Discord"
        }
    ]

    return <div>
        <Input label={'Link'} name={'link'} type={'url'} value={url} readOnly={true}/>
        <br/>
        Share on:
        <div className={'flex justify-between mt-2 gap-12 text-center'}>
            {socialMedia.map(network => {
                return <a href={'#'} className={'flex flex-col items-center'} key={network.name}>
                    {network.icon}
                    {network.name}
                </a>;
            })}
            <a href={'#'} className={'flex flex-col items-center'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More
            </a>
        </div>
    </div>
}