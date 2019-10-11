import React from "react";
import {StreetViewPanorama, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import {WorldMap} from "./worldMap";
import {composeMap} from "./composeMap";

declare const google: any;

export const StreetViewGameMap = composeMap({height: (window.innerHeight + 80) + "px"})((props) => <WorldMap {...props}>
        <StreetViewPanorama position={props.game.country} visible>

        </StreetViewPanorama>
    </WorldMap>
);
