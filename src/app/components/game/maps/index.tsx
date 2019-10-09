import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import {LogoSVG, PushPinSVG} from "../../../helper/svgs";

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
    return <GoogleMap
        defaultZoom={3}
        ref={props.passRef}
        defaultCenter={props.center}
        onClick={props.mapClicked}
        defaultOptions={{
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "all",
                    elementType: "labels",
                    stylers: [
                        {visibility: "off"},
                    ],
                },
            ],
        }}
    >

        {!props.showAllMarker &&
        <Marker onDragEnd={props.markerMoved} icon={{url: PushPinSVG({color: props.player.color, size: 60})}}
                position={props.lastMarkerPosition} animation={(google as any).maps.Animation.DROP} draggable={true}/>}

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
    </GoogleMap>;},
);
