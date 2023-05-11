import React, {useEffect, useState} from "react";
import {animated, useSpring} from "@react-spring/web";
import {SinglePlayerState} from "@/state/singleplayer";
import {useTranslation} from "next-i18next";
import {IconButton} from "@/components/IconButton";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {markerState} from "@/state/marker";
import {trpc} from "@/utils/trpc";
import {distanceBetween} from "@/utils/geo";
import {SINGLEPLAYER_ERROR_TIME} from "@/server/constants/timings";
import {RoundState} from "@prisma/client";
import {DistanceAnimation} from "./DistanceAnimation";

interface RoundPreparedDialogProps {
    singlePlayer: SinglePlayerState
}

export const SinglePlayerRoundStatus: React.FC<RoundPreparedDialogProps> = ({
                                                                                singlePlayer,
                                                                            }) => {
    const router = useRouter();
    const {t} = useTranslation();
    const style = useSpring({
        config: {duration: 300},
    });



    const [distance, setDistance] = useState(0);
    const [marker] = useRecoilState(markerState);

    const timesFound = trpc.countries.timesFound.useQuery({
        id: singlePlayer.countryId!,
    });
    const vote = trpc.singleplayer.vote.useMutation();
    const skip = trpc.singleplayer.skip.useMutation();
    const prepare = trpc.singleplayer.prepare.useMutation();

    const {locale} = useRouter();

    const submitVote = () => {
        vote
            .mutateAsync({
                id: singlePlayer.id!,
                lngLat: {
                    lng: marker.lng,
                    lat: marker.lat,
                },
            })
            .then((result: any) => {
                if (result) {
                    const [country] = result;
                    const distance = distanceBetween(
                        [marker.lng, marker.lat],
                        [country.lng, country.lat]
                    );
                    setDistance(distance);
                }
            });
    };

    useEffect(() => {
        if (distance) {
            let timer = setTimeout(() => {
                setDistance(0);
            }, SINGLEPLAYER_ERROR_TIME);
            return () => clearTimeout(timer);
        }
    }, [distance]);

    const submitSkip = () => {
        skip
            .mutateAsync({
                id: singlePlayer.id!,
            })
            .then((result) => {
                console.log(result);
            });
    };

    const submitNext = () => {
        prepare.mutateAsync({
            id: singlePlayer.id!,
        });
    };


    if (!singlePlayer.country) {
        return <div></div>
    }

    const country = singlePlayer.country;

    return (
        <div
            className={'transform-gpu shadow-xl m-5 p-4 rounded-xl -translate-x-2/4 bg-card bg-opacity-60 backdrop-blur  left-[50%] absolute max-w-xl w-full top-0'}>
            <animated.div style={style}>
                <div className={'grid grid-cols-3 items-center justify-center text-center gap-2'}>
                    <div className={'col-span-1 text-xl'}>
                        Gesucht wird
                    </div>
                    <div className={'text-7xl'}>
                        {singlePlayer.country?.flagEmoji}
                    </div>
                    <div className={'text-xl font-bold'}>
                        {singlePlayer.country?.nameCommon}
                    </div>
                </div>
                {distance > 0 && <DistanceAnimation distance={distance}/>}
                {(distance === 0 && singlePlayer.roundState === RoundState.SUCCESS) && <div>
                    <div className={'text-center'}>
                        <p>
                            ✅Gefunden nach {singlePlayer.trialsForRound} Runde!
                        </p>
                        <p className={'text-sm'}>
                            Insgesamt {timesFound.data}x gefunden
                        </p>
                    </div>
                    <div className={'grid px-3 grid-cols-2 gap-8 mt-4'}>
                        <IconButton variant={'positive'} full={true} size={'sm'} onClick={submitNext}>
                            Weiter
                        </IconButton>
                    </div>
                </div>}
                {(distance === 0 && singlePlayer.roundState === RoundState.STARTED) &&
                    <div className={'grid px-3 grid-cols-2 gap-8 mt-4'}>
                        <div>
                            <IconButton variant={'secondary'} full={true} size={'sm'} onClick={submitSkip}>
                                Auflösen
                            </IconButton>
                        </div>
                        <div>
                            <IconButton variant={'positive'} full={true} size={'sm'} onClick={submitVote}>
                                Raten
                            </IconButton>
                        </div>
                    </div>}

                {(!distance && singlePlayer.roundState === RoundState.ENDED) && <div>
                    <div>
                        <IconButton variant={'positive'} full={true} size={'sm'} onClick={submitNext}>
                            Nächste Frage
                        </IconButton>
                    </div>
                </div>}
            </animated.div>
        </div>
    );
};
