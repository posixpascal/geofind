import React from "react";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import {hashCode} from "../../../helper/hash";
import {LogoSVG, PushPinSVG} from "../../../helper/svgs";
import {PinMarker} from "./pinMarker";

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
        <PinMarker markerMoved={props.markerMoved} color={props.player.color} position={props.lastMarkerPosition}/>}

        {props.game && Object.keys(props.game.votes).map((playerID, index) => {
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
    </GoogleMap>);
