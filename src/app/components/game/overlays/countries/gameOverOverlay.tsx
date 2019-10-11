import React from "react";
import {strings} from "../../../../i18n";
import {PushPin} from "../../../../helper/svgs";
import {SpinningVectorBox} from "../widgets";
import {NavLink} from "react-router-dom";

export const GameOverOverlay = ({game, leaveGame}) => {
    return <SpinningVectorBox>
        <p>
            {strings.gameDone}
        </p>
        <strong>{strings.scoreTable}</strong>
        {Object.keys(game.players).map((playerID) => {
            const player = game.players[playerID];
            const playerScore = game.scoreBoard[playerID];

            return <div className={`${game.gameWinner === playerID ? "user-result-won" : "user-result-lost"}`} key={playerID} id={playerID}>
                {player.displayName} <PushPin size={16} pinned={true} color={player.color}/> ({playerScore.score} {strings.points})
            </div>;
        })}
        <NavLink to={"/lobby/" + (window as any).currentRoom.id}><button>{strings.backToLobby}</button></NavLink>
        <button onClick={leaveGame}>{strings.backToHome}</button>
    </SpinningVectorBox>;
}
