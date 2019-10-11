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
                {["pin_1", "pin_2", "pin_3", "pin_4", "pin_5"].map(pinID => {
                    return<PushPin size={12} color={player.color} pinned={!!vote[pinID]} />
                })}

                (Score: {game.scoreBoard[playerID].score})
            </div>;
        })}
    </Overlay>
}
