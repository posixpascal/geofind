import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import {LogoSVG, PushPinSVG} from "../../../helper/svgs";
import {PinMarker} from "./pinMarker";
import {WorldMap} from "./worldMap";

declare const google: any;

export const GameMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
        loadingElement: <div style={{zIndex: 15, height: `100%`}}/>,
        containerElement: <div style={{zIndex: 15, height: (window.innerHeight - 53) + "px"}}/>,
        mapElement: <div style={{zIndex: 15, height: (window.innerHeight - 53) + "px"}}/>,
    }),
    withScriptjs,
    withGoogleMap,
)((props) => {
        return <WorldMap {...props}>

            {!props.showAllMarker &&
            <PinMarker markerMoved={props.markerMoved} color={props.player.color} position={props.lastMarkerPosition}/>}

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
