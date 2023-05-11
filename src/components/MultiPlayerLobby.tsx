import {useRecoilState} from "recoil";
import {multiPlayerState} from "@/state/multiplayer";
import React, {useState} from "react";
import {Box} from "@/components/Box";
import {MultiPlayerPlayerListing} from "@/components/MultiPlayerPlayerListing";
import {GameMapSelection} from "@/components/GameMapSelection";
import {GameSettingsSelection} from "@/components/GameSettingsSelection";
import {PageHeader} from "@/components/PageHeader";
import {Share} from "@/components/Share";
import {IconButton} from "@/components/IconButton";
import {GameModeSelection} from "@/components/GameModeSelection";

export const MultiPlayerLobby = () => {
    const [multiPlayer, setMultiPlayer] = useRecoilState(multiPlayerState);
    const [settings, setSettings] = useState({});
    return <div>
        <PageHeader icon={'🕹️'} title={`Raum: ${multiPlayer.roomCode}`}
                    description={`Ein Spiel von ${multiPlayer.creator.name}`}/>
        <div className={'break-all p-8 hidden'}>{JSON.stringify(multiPlayer)}</div>
        <div className={'grid grid-cols-3 gap-8'}>
            <div className={'col-span-2 flex flex-col gap-4'}>
                <Box title={"Lobby"} mass={1.5}>
                    <MultiPlayerPlayerListing/>
                </Box>

                <Box title={"Settings"} delay={150} mass={1}>
                    <div className={'grid grid-cols-2 gap-4'}>
                        <div className={'col-span-1'}><GameModeSelection/></div>
                        <div className={'col-span-1'}><GameMapSelection/></div>
                    </div>
                    <hr/>
                    <GameSettingsSelection/>
                </Box>
            </div>
            <aside className={'col-span-1 gap-4 flex-col flex'}>
                <Box title={"Actions"} description={""}
                     delay={300} mass={1}>
                    <div className={'flex flex-col gap-4'}>
                        <IconButton disabled={true}>Start Game</IconButton>
                        <IconButton variant={'negative'}>Close Lobby</IconButton>
                    </div>
                </Box>

                <Box title={"Share"} description={"Invite your friends to this game by copying the link below:"}
                     delay={300} mass={1}>
                    <Share url={window.location.href}/>
                </Box>
            </aside>
        </div>
    </div>
}