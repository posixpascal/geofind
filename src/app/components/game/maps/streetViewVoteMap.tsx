import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import {hashCode} from "../../../helper/hash";
import {LogoSVG, PushPinSVG} from "../../../helper/svgs";

declare const google: any;

export const StreetViewVoteMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
        loadingElement: <div style={{zIndex: 15, height: `100%`}}/>,
        containerElement: <div style={{zIndex: 15, height: "260px"}}/>,
        mapElement: <div style={{zIndex: 15, height: "260px"}}/>,
    }),
    withScriptjs,
    withGoogleMap,
)((props) =>
    <GoogleMap
        defaultZoom={3}
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

        {props.game && Object.keys(props.game.votes).map((playerID, index) => {
            const vote = props.game.votes[playerID];
            const player = props.game.players[playerID];
            return <div key={playerID + "_pin_1_" + index}>
            {vote.pin_1 && <Marker
                    key={playerID + "_pin_1_" + index}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={
                        {lat: vote.pin_1.lat, lng: vote.pin_1.lng}
                    }
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}/>}
            {vote.pin_2 && <Marker
                    key={playerID + "_pin_2_" + index}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={
                        {lat: vote.pin_2.lat, lng: vote.pin_2.lng}
                    }
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}/>}
            {vote.pin_3 && <Marker
                    key={playerID + "_pin_3_" + index}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={
                        {lat: vote.pin_3.lat, lng: vote.pin_3.lng}
                    }
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}/>}
            {vote.pin_4 && <Marker
                    key={playerID + "_pin_4_" + index}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={
                        {lat: vote.pin_4.lat, lng: vote.pin_4.lng}
                    }
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}/>}
            {vote.pin_5 && <Marker
                    key={playerID + "_pin_5_" + index}
                    icon={{url: PushPinSVG({color: player.color})}}
                    position={
                        {lat: vote.pin_5.lat, lng: vote.pin_5.lng}
                    }
                    animation={(google as any).maps.Animation.DROP}
                    draggable={false}/>}
            </div>;
        })}
    </GoogleMap>,
);
