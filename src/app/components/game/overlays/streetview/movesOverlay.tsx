import React from "react";

import {PushPin} from "../../../../helper/svgs";
import {Overlay} from "../widgets";

export const StreetViewMovesOverlay = ({game}) => {
    return <Overlay style={{
        right: "20px",
        bottom: "20px",
        left: "initial",
        top: "initial",
        width: "100%",
    }}>
        {game && Object.keys(game.players).map((playerID) => {
            const vote = game.votes[playerID] || {};
            const player = game.players[playerID];
            return <div>
                {player.displayName}
                <PushPin size={12} color={player.color} pinned={!!vote.pin_1}/>
                <PushPin size={12} color={player.color} pinned={!!vote.pin_2}/>
                <PushPin size={12} color={player.color} pinned={!!vote.pin_3}/>
                <PushPin size={12} color={player.color} pinned={!!vote.pin_4}/>
                <PushPin size={12} color={player.color} pinned={!!vote.pin_5}/>
                (Score: {game.scoreBoard[playerID].score})
            </div>;
        })}
    </Overlay>
}
