import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {LogoSVG, PushPinSVG} from "../../../helper/svgs";
import {PinMarker} from "./pinMarker";
import {WorldMap} from "./worldMap";
import {composeMap} from "./composeMap";

declare const google: any;

export const GameMap = composeMap({height: (window.innerHeight - 53) + "px"})((props) => {
        return <WorldMap {...props}>

            {!props.showAllMarker && <PinMarker {...props} position={props.lastMarkerPosition}/>}

            {props.showAllMarker && props.game && Object.keys(props.game.votes).map((playerID) => {
                const vote = props.game.votes[playerID];
                const player = props.game.players[playerID];
                return <Marker
                    key={player.displayName}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={
                        {lat: vote.country.lat, lng: vote.country.lng}
                    }
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}/>;
            })}
            {props.showAllMarker && props.game &&
            <Marker position={{lat: props.game.country.lat, lng: props.game.country.lng}}
                    icon={{url: LogoSVG()}} animation={(google as any).maps.Animation.DROP} draggable={false}/>
            }
        </WorldMap>;
    },
);
