import React from "react";
import {strings} from "../../../../i18n";
import {PushPin} from "../../../../helper/svgs";
import {MiniScoreboard} from "../../scoreBoard/widgets";

export const GameOverOverlay = ({game, leaveGame}) => {
    return <div>
        <p>
            {strings.gameDone}
        </p>
        <strong>{strings.scoreTable}</strong>
        <MiniScoreboard game={game} />
        <button onClick={leaveGame}>{strings.backToHome}</button>
    </div>;
}
