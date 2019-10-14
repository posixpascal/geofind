import React from "react";
import {Marker} from "react-google-maps";
import {LogoSVG} from "../../../helper/svgs";
import {composeMap} from "./composeMap";
import {PinMarker} from "./pinMarker";
import {PlayerMarkers} from "./playerMarkers";
import {WorldMap} from "./worldMap";

declare const google: any;

export const GameMap = composeMap({height: (window.innerHeight - 53) + "px"})((props) => {
        return (
            <WorldMap {...props}>
                {!props.showAllMarker && <PinMarker {...props} position={props.lastMarkerPosition}/>}
                {props.showAllMarker && <Marker
                    position={props.game.country}
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}
                />}
                {props.showAllMarker && <PlayerMarkers game={props.game}/>}

            </WorldMap>
        );
    },
);
