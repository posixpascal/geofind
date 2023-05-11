import {LocaleName} from "../../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useState} from "react";
import {Map} from "@/components/Map";
import maplibregl from "maplibre-gl";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import {useRouter} from "next/router";
import {trpc} from "@/utils/trpc";
import {RoundState, SinglePlayerGame} from "@prisma/client";
import {useRecoilState} from "recoil";
import {singlePlayerState} from "@/state/singleplayer";
import {useMarker} from "@/hooks/useMarker";
import {SinglePlayerRoundStatus} from "@/components/SinglePlayerRoundStatus";
import {UserExperience} from "@/components/UserExperience";
import {useSinglePlayer} from "@/hooks/useSinglePlayer";
import {TriesIndicator} from "@/components/TriesIndicator";
import {FactsIndicator} from "@/components/FactsIndicator";
import {Overlay} from "@/components/Overlay";
import {IconButton} from "@/components/IconButton";

export default function Singleplayer() {
    const router = useRouter();
    const {id} = router.query;
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const [singlePlayer, setSinglePlayer] = useRecoilState(singlePlayerState);
    const {marker} = useMarker({map});
    useSinglePlayer(marker, singlePlayer, map);

    const back = async () => {
        await router.push('/');
    }

    trpc.singleplayer.subscribe.useSubscription(
        {
            id: String(id),
        },
        {
            onData(game: SinglePlayerGame) {
                setSinglePlayer(game);
            },
        }
    );

    return (
        <Map onMapHandle={setMap}>
            <Overlay visible={singlePlayer.roundState === RoundState.PREPARED}>
                <div className={'z-20 absolute left-4 top-4'}>
                    <IconButton variant={'negative'} full={true} size={'sm'} onClick={back}>
                        Abbrechen
                    </IconButton>
                </div>
                <LoadingSpinner isLoading={!singlePlayer.id}/>
                <SinglePlayerRoundStatus singlePlayer={singlePlayer}/>
                <UserExperience/>
                <TriesIndicator/>
                <FactsIndicator/>
            </Overlay>
        </Map>
    );
}

export const getServerSideProps = async ({
                                             locale,
                                         }: {
    locale: LocaleName;
}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "experience",
                "menu",
            ])),
        },
    };
};
