import React from "react";
import {Marker} from "react-google-maps";
import {PushPinSVG} from "../../../helper/svgs";
import {composeMap} from "./composeMap";
import {PinMarker} from "./pinMarker";
import {StreetViewPlayerMarkers} from "./playerMarkers";
import {WorldMap} from "./worldMap";

declare const google: any;

export const StreetViewVoteMap = composeMap({height: "260px"})((props) => (
    <WorldMap {...props}>
        {!props.showAllMarker && <PinMarker {...props} position={props.lastMarkerPosition}/>}
        {props.game && <StreetViewPlayerMarkers game={props.game}/>}
    </WorldMap>
));
