import {animated, useSpring} from "@react-spring/web";
import {useRecoilState} from "recoil";
import React from "react";
import {AnimatedBackButton} from "@/components/AnimatedBackButton";
import {Container} from "@/components/Container";
import {singlePlayerState} from "@/state/singleplayer";
import {UserProfileStatus} from "@/components/UserProfileStatus";
import {UsersOnlineCounter} from "@/components/UsersOnlineCounter";
import {useRouter} from "next/router";

interface NavbarProps {
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const route = useRouter();
    const hideNavbar = route.pathname.includes('/singleplayer') || route.pathname.includes('/multiplayer');

    const style = useSpring({
        from: {
            translateY: `0%`,
            scale: 1,
            opacity: 1
        },
        to: {
            translateY: hideNavbar ? `-150%` : `0%`,
            //scale: hideNavbar ? 0 : 1,
            opacity: hideNavbar ? 0 : 1,
        },
    })

    return (
        <Container className={'mx-auto z-20 w-full max-w-7xl'}>
            <animated.nav
                style={style}
                className={"flex py-2 mt-4 bg-background/70 backdrop-blur px-5 rounded-xl text-card-headline w-full justify-between"}>
                <div className={"flex items-center justify-between w-full gap-3"}>
                    <AnimatedBackButton/>
                    <UserProfileStatus/>
                    <UsersOnlineCounter />
                </div>
            </animated.nav>
        </Container>
    );
};
