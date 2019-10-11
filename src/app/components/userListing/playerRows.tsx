import React from "react";
import {PlayerRow} from "./playerRow";

export const PlayerRows = ({room, players, onColorChange}) => {
    const playerObjects = Object.keys(players).map((playerId) => players[playerId]);

    const playerRows = players.map((player) => {
        return (
            <div key={player.id}>
                <PlayerRow
                    onColorChange={onColorChange}
                    room={room}
                    player={playerObjects}
                />
            </div>
        );
    });

    return <div>{playerRows}</div>;
};
