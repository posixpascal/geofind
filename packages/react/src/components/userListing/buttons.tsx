import React from "react";
import {strings} from "../../i18n";
import {ReadyButton} from "./widgets";
import {Button} from "../buttons";

export const GetReadyButton = ({player}) => {
    const toggleReady = () => {
        window.currentRoom.send({type: "user:readyState:toggle"});
    };
    return (
        <ReadyButton
            isReady={player.isReady}
            onClick={toggleReady}
        >
            <span>{player.isReady ? strings.userReady : strings.ready}</span>
        </ReadyButton>
    );
};

export const InsultButton = () => {
    const randomInsult = Math.floor(8 * Math.random()) + 1;

    return (
        <ReadyButton
            inactive={true}
            isReady={false}
        >
            <span>{strings[`userNotReady${randomInsult}`]}</span>
        </ReadyButton>
    );
};

export const PlayerReadyButton = () => {
    return (
        <ReadyButton
            inactive={true}
            isReady={true}
        >
            <span>{strings.userReady}</span>
        </ReadyButton>
    );
};

export const PlayerNotReadyButton = ({room, player}) => {
    return room.insultMode ? <InsultButton/> : (
        <ReadyButton
            inactive={true}
            isReady={player.isReady}
        >
            <span>{strings.userNotReady}</span>
        </ReadyButton>
    );
};

export const PlayerStatusButton = ({player, room}) => {
    return player.isReady ? <PlayerReadyButton/> : <PlayerNotReadyButton room={room} player={player}/>;
};

export const MuteButton = ({muted, toggleMute}) => {
    return (
        <Button
            variant={"purple"}
            title={muted ? <span>Muted</span> : <span>Mute?</span>}/>
    );
};
