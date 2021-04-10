import React from "react";
import {PushPin} from "../../../../helper/svgs";
import {Overlay} from "../widgets";

export const StreetViewMovesOverlay = ({game}) => {
    const availablePins = ["pin1", "pin2", "pin3", "pin4", "pin5"];

    const overlayStyle = {
        bottom: "20px",
        left: "initial",
        right: "20px",
        top: "initial",
        width: "100%",
    };

    const PinsLeft = ({player, vote}) => {
        const pinsAvailable = availablePins.map((pinID) => {
            return (
                <span key={player.id}>
                    <PushPin
                        size={12}
                        color={player.color}
                        pinned={!!vote[pinID]}
                    />
                </span>
            );
        });
        return <>{pinsAvailable}</>;
    };

    const MovesLeft = () => {
        const movesLeft = Object.keys(game.players).map((playerID) => {
            const vote = game.votes[playerID] || {};
            const player = game.players[playerID];
            return (
                <div key={player.id}>
                    {player.displayName}
                    <PinsLeft player={player} vote={vote}/>

                    (Score: {game.scoreBoard[playerID].score})
                </div>
            );
        });
        return <>{movesLeft}</>;
    };

    return (
        <Overlay style={overlayStyle}>
            {game && <MovesLeft/>}
        </Overlay>
    );
};
