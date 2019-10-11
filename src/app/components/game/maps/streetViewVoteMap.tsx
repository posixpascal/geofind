import React from "react";
import {Marker} from "react-google-maps";
import {PushPinSVG} from "../../../helper/svgs";
import {PinMarker} from "./pinMarker";
import {WorldMap} from "./worldMap";
import {composeMap} from "./composeMap";

declare const google: any;

export const StreetViewVoteMap = composeMap({height: "260px"})((props) =>
    <WorldMap {...props}>

        {!props.showAllMarker && <PinMarker {...props} position={props.lastMarkerPosition}/>}

        {props.game && Object.keys(props.game.votes).map((playerID) => {
            const vote = props.game.votes[playerID];
            const player = props.game.players[playerID];
            const pins = ["pin_1", "pin_2", "pin_3", "pin_4", "pin_5"].filter(pinID => vote[pinID]);
            return pins.map(pinID => <Marker
                key={`${playerID}_${pinID}`}
                icon={{url: PushPinSVG({color: player.color})}}
                position={{lat: vote[pinID].lat, lng: vote[pinID].lng}}
                animation={(google as any).maps.Animation.DROP}
                draggable={false}/>
            )
        })}
    </WorldMap>);
