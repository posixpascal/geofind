import React from "react";
import {NavLink} from "react-router-dom";
import {strings} from "../../../../i18n";
import {MiniScoreboard} from "../../scoreBoard/widgets";
import {SpinningVectorBox} from "../widgets";

export const GameOverOverlay = ({game, leaveGame}) => {
    return (
        <SpinningVectorBox>
            <p>
                {strings.gameDone}
            </p>
            <strong>{strings.scoreTable}</strong>
            <MiniScoreboard game={game}/>
            <NavLink to={"/lobby/" + (window as any).currentRoom.id}>
                <button>{strings.backToLobby}</button>
            </NavLink>
            <button onClick={leaveGame}>{strings.backToHome}</button>
        </SpinningVectorBox>
    );
};
