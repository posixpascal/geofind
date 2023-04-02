import { MenuItems } from "@/components/MenuItems";
import { LocaleName } from "../../../types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {useRouter} from "next/router";
import {trpc} from "@/utils/trpc";
import {GameState, MultiPlayerGame, SinglePlayerGame} from "@prisma/client";
import {useRecoilState} from "recoil";
import {multiPlayerState} from "@/state/multiplayer";
import {useEffect, useMemo, useState} from "react";
import {LoadingSpinner} from "@/components/LoadingSpinner";
import { MultiPlayerLobby } from "@/components/MultiPlayerLobby";
export default function MultiplayerPage() {
    const [multiPlayer, setMultiPlayer] = useRecoilState(multiPlayerState);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    trpc.multiplayer.subscribe.useSubscription(
        {
            id: String(id),
        },
        {
            onStarted(){
                setLoading(false);
            },
            onData(game: MultiPlayerGame) {
                setMultiPlayer(game);
            },
        }
    );

    const view = useMemo(() => {
        if (!multiPlayer){
            return <></>
        }

        if (multiPlayer.gameState === GameState.LOBBY){
            return <MultiPlayerLobby />
        }

        if (multiPlayer.gameState === GameState.PLAYING){
            return <MultiPlayerGame />
        }

        return <>Unsupported State: {multiPlayer.gameState}</>
    }, [multiPlayer?.gameState])

    return (
       <div>
           <LoadingSpinner isLoading={loading} />
           {view}
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
            ...(await serverSideTranslations(locale, ["common", "multiplayer", "menu"])),
        },
    };
};
