import Avatar from "boring-avatars"
import {IconButton} from "./IconButton"
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useTranslation} from "next-i18next";
import {signIn, signOut} from "next-auth/react";
import {useRouter} from "next/router";
import BackIcon from '@/assets/svgs/icons/back.svg';
import Image from 'next/image';
import {animated, useSpring} from "@react-spring/web";

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const {t} = useTranslation('common');
    const {route, back} = useRouter();
    const {user} = useCurrentUser();

    const hasBackButton = (
        route.includes('/multiplayer')
        || route.includes('/singleplayer')
        || route.includes('/profile')
        || route.includes('/feedback')
        || route.includes('/competitive')
    );

    const {x} = useSpring({from: {x: 0}, x: hasBackButton ? 1 : 0, config: {duration: 100}})
    const {y} = useSpring({from: {y: 0}, y: hasBackButton ? 1 : 0, config: {duration: 100}})



    return <animated.nav
        style={{
            transform: y.interpolate({ range: [0, 1], output: [20, 0]}).interpolate(x => `translateY(${x}px)`)
        }}
        className={'flex p-2 px-5 rounded-xl backdrop-blur bg-opacity-50 z-20 bg-orange-100 w-full justify-between'}>
        <div className={'flex items-center gap-3'}>
            <animated.div style={{
                overflow: 'hidden',
                opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
                width: x.interpolate({
                        range: [0, 1],
                        output: [0, 65]
                    }).interpolate(x => `${x}px`)
            }}>
                <IconButton size={'sm'} onClick={back}>
                    <BackIcon className={'h-8 w-8'}/>
                </IconButton>
            </animated.div>
            {user.data?.isLoggedIn ?
                <Image alt={user.data.name!} height={64} width={64} className="rounded-full" src={user.data?.image!}/> :
                <Avatar size={64} variant={'beam'} name={user.data?.name ?? "guest"}/>}
            <div className={'flex flex-col flex-grow'}>
                <div className={'leading-6 text-md md:text-xl'}>
                    Hallo,&nbsp;
                    <span className={'font-bold'}>
                        {user.data ? user.data.name : t("loading")}
                    </span>

                </div>

                <div className={'gap-1 flex text-sm md:text-md'}>
                    <div className={'flex'}>
                        10 Exp
                    </div>
                    <div className={'flex'}>
                        20 Games
                    </div>
                </div>
            </div>
        </div>
        <div className={'flex gap-4 items-center'}>
            {user.data && user.data.isLoggedIn ? <IconButton onClick={() => signOut()} variant={'primary'}>
                <span className={'hidden sm:inline-block'}>
                    Logout
                </span>
            </IconButton> : <IconButton onClick={() => signIn('discord')} variant={'primary'}>
                <span className={'hidden sm:inline-block'}>
                    Login mit Discord
                </span>
            </IconButton>}

            <IconButton variant={'primary'}>
                <span className={'hidden sm:inline-block'}>Einstellungen</span>
            </IconButton>
        </div>
    </animated.nav>
}