import React from "react";
import {strings} from "../../../../i18n";
import {PushPin} from "../../../../helper/svgs";

export const GameOverOverlay = ({game, leaveGame}) => {
    return <div>
        <p>
            {strings.gameDone}
        </p>
        <strong>{strings.scoreTable}</strong>
        {Object.keys(game.players).map((playerID) => {
            const player = game.players[playerID];
            const playerScore = game.scoreBoard[playerID];

            return <div className={`${game.gameWinner === playerID ? "user-result-won" : "user-result-lost"}`}
                        key={playerID} id={playerID}>
                {player.displayName} <PushPin size={16} pinned={true}
                                              color={player.color}/> ({playerScore.score} {strings.points})
            </div>;
        })}
        <button onClick={leaveGame}>{strings.backToHome}</button>
    </div>;
}
