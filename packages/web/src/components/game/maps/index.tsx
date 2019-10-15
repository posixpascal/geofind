import React from "react";
import {Marker} from "react-google-maps";
import {composeMap} from "./composeMap";
import {PinMarker} from "./pinMarker";
import {PlayerMarkers} from "./playerMarkers";
import {WorldMap} from "./worldMap";

declare const google: any;

export const GameMap = composeMap({height: (window.innerHeight - 53) + "px"})((props) => {
        const countryMarker = (
            <Marker
                position={props.game.country}
                animation={(google as any).maps.Animation.DROP}
                draggable={false}
            />
        );

        return (
            <WorldMap {...props}>
                {!props.showAllMarker && <PinMarker {...props} position={props.lastMarkerPosition}/>}
                {props.showAllMarker && countryMarker}
                {props.showAllMarker && <PlayerMarkers game={props.game}/>}

            </WorldMap>
        );
    },
);
