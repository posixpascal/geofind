import {useSelector} from "@legendapp/state/react";
import {multiPlayerState} from "@/state/multiplayer";
import {MultiPlayerSession, RoundState} from "@prisma/client";
import React from "react";
import {Overlay} from "@/components/utils/Overlay";
import {animated, useSpring} from "@react-spring/web";
import {useWindowSize} from "react-use";
import {UserAvatar} from "@/components/user/UserAvatar";
import {humanizeDistance} from "@/utils/geo";
import {trpc} from "@/utils/trpc";
import {countryName} from "@/components/maps/CountryPanel";
import {useLocale} from "next-intl";

export const ScoreBoard: React.FC<{ visible: boolean }> = ({
                                                               visible,
                                                           }) => {
    const locale = useLocale();
    const multiPlayer = useSelector(() => multiPlayerState.get());
    const countryCoords = trpc.countries.lookup.useQuery(
        {
            id: multiPlayer.countryId,
        },
        {
            refetchInterval: 1000,
        }
    );
    const {width, height} = useWindowSize();
    const sessions = multiPlayer
        .sessions! //.filter((session) => session.state === "CONNECTED")
        .sort((a: MultiPlayerSession, b: MultiPlayerSession) => {
            if (a.score > b.score) {
                return -1;
            }

            if (b.score > a.score) {
                return 1;
            }

            return 0;
        });

    const [style] = useSpring(
        {
            top: visible
                ? height / 2
                : height - (50 + multiPlayer.sessions.length * 50),
            left: visible ? width / 2 : 10,
            translateX: visible ? "-50%" : "0",
            translateY: visible ? "-50%" : "0",
            paddingLeft: visible ? 40 : 20,
            paddingRight: visible ? 40 : 20,
            paddingTop: visible ? 12 : 8,
            paddingBottom: visible ? 12 : 8,
            minWidth: visible ? Math.min(width - 80, 500) : 180,
            height: visible
                ? Math.min(height - 80, 500)
                : 50 + multiPlayer.sessions.length * 50,
            background: visible ? "#ffffff70" : "#ffffff00",
            boxShadow: visible
                ? "3px 3px 10px rgba(0,0,0,.2)"
                : "3px 3px 0px rgba(0,0,0,0)",
        },
        [visible]
    );

    const [fontStyle] = useSpring(
        {
            fontSize: visible ? 32 : 18,
            marginBottom: visible ? 8 : 12,
        },
        [visible]
    );

    const [userFontStyle] = useSpring(
        {
            fontSize: visible ? 20 : 14,
        },
        [visible]
    );

    const [metaDataStyle] = useSpring(
        {
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0,
            fontSize: visible ? 14 : 2,
        },
        [visible]
    );

    const [scoreStyle] = useSpring(
        {
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0,
            fontSize: visible ? 24 : 2,
        },
        [visible]
    );

    const maxScore = Math.max(
        ...multiPlayer.sessions.map((session) => session.score)
    );

    if (!countryCoords.data) {
        return <></>;
    }

    const {lat, lng} = countryCoords.data[0];

    return (
        <Overlay visible={multiPlayer.roundState === RoundState.SCOREBOARD}>
            <animated.div
                className={
                    "absolute transform-gpu shadow-xl flex items-start rounded-xl bg-white bg-opacity-60 backdrop-blur"
                }
                style={style}
            >
                <div className={"w-full"}>
                    <animated.div className="font-black" style={fontStyle}>
                        <div className={"flex justify-center text-center w-full"}>
                            Scoreboard
                        </div>
                    </animated.div>

                    <div className={"gap-4 flex flex-col"}>
                        {sessions.map((session) => {
                            const distance = humanizeDistance(
                                {
                                    latitude: session.lat,
                                    longitude: session.lng,
                                },
                                {latitude: lat, longitude: lng}
                            );

                            return (
                                <div key={session.id}>
                                    <animated.div
                                        style={userFontStyle}
                                        className={"flex justify-between items-center"}
                                    >
                                        <div className={"flex items-center gap-4"}>
                                            <UserAvatar
                                                width={visible ? 48 : 32}
                                                height={visible ? 48 : 32}
                                                user={session.user}
                                            ></UserAvatar>
                                            <div>
                                                <div>
                                                    {session.user.name}{" "}
                                                    {maxScore > 0 && maxScore === session.score
                                                        ? "👑"
                                                        : ""}
                                                </div>
                                                {session.isCorrect && (
                                                    <animated.div style={metaDataStyle}>
                                                        {multiPlayer.country.flagEmoji}{" "}
                                                        {countryName(multiPlayer.country, locale as any)} getroffen!
                                                    </animated.div>
                                                )}

                                                {!session.isCorrect && (
                                                    <div>
                                                        <animated.div style={metaDataStyle}>
                                                            <strong>{distance}</strong> entfernt
                                                        </animated.div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <animated.div style={scoreStyle} className={"font-black"}>
                                            {session.score} Treffer
                                        </animated.div>
                                    </animated.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </animated.div>
        </Overlay>
    );
};
