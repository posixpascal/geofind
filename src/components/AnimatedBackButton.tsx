import {IconButton} from "@/components/IconButton";
import BackIcon from "@/assets/svgs/icons/back.svg";
import {animated, useSpring} from "@react-spring/web";
import React, {useCallback} from "react";
import {useRecoilState} from "recoil";
import {singlePlayerState} from "@/state/singleplayer";
import {useRouter} from "next/router";

export const AnimatedBackButton = () => {
    const {route, back, push} = useRouter();

    const hasBackButton =
        route.includes("/multiplayer") ||
        route.includes("/singleplayer") ||
        route.includes("/profile") ||
        route.includes("/feedback") ||
        route.includes("/competitive");

    const {x} = useSpring({
        from: {x: 0},
        x: hasBackButton ? 1 : 0,
    });

    return <animated.div
        className={"absolute z-0"}
        style={{
            opacity: x.interpolate({range: [0, 1], output: [0, 1]}),
            transform: x
                .interpolate({range: [0, 1], output: [0, 70]})
                .interpolate((x) => `translateX(-${x}%)`),
        }}
    >
        <IconButton size={"sm"} onClick={back}>
            <BackIcon className={"h-8 w-8"}/>
        </IconButton>
    </animated.div>
}