import React from "react";
import {StreetViewPanorama} from "react-google-maps";
import {composeMap} from "./composeMap";
import {WorldMap} from "./worldMap";

export const StreetViewGameMap = composeMap({height: (window.innerHeight + 80) + "px"})((props) => (
        <WorldMap {...props}>
            <StreetViewPanorama position={props.game.country} visible={true} />
        </WorldMap>
    )
);
