import React from "react";
import {Marker} from "react-google-maps";
import {PushPinSVG} from "../../../helper/svgs";

declare const google: any;
export const PlayerMarkers = ({game}) => {
    const playerMarkers = Object.keys(game.votes).map((playerID) => {
        const vote = game.votes[playerID];
        const player = game.players[playerID];
        return (
            <Marker
                key={player.displayName}
                icon={{url: PushPinSVG({color: player.color})}}
                position={vote.country}
                animation={(google as any).maps.Animation.DROP}
                draggable={false}
            />
        );
    });

    return <>{playerMarkers}</>;
};

export const StreetViewPlayerMarkers = ({game}) => {
    const availablePins = ["pin_1", "pin_2", "pin_3", "pin_4", "pin_5"];
    const playerMarkers = Object.keys(game.votes).map((playerID) => {
        const vote = game.votes[playerID];
        const player = game.players[playerID];
        const pins = availablePins.filter((pinID) => vote[pinID]);
        return pins.map((pinID) => (
                <Marker
                    key={`${playerID}_${pinID}`}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={{lat: vote[pinID].lat, lng: vote[pinID].lng}}
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}
                />
            ));
    });

    return <>{playerMarkers}</>
};
