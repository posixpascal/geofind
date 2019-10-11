import React from "react";
import {Marker} from "react-google-maps";
import {PushPinSVG} from "../../../helper/svgs";
import {PinMarker} from "./pinMarker";
import {WorldMap} from "./worldMap";
import {composeMap} from "./composeMap";
import {StreetViewPlayerMarkers} from "./playerMarkers";

declare const google: any;

export const StreetViewVoteMap = composeMap({height: "260px"})((props) => (
    <WorldMap {...props}>
        {!props.showAllMarker && <PinMarker {...props} position={props.lastMarkerPosition}/>}
        {props.game && <StreetViewPlayerMarkers game={props.game}/>}
    </WorldMap>
));
