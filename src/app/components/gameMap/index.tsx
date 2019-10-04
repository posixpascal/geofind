import React from "react";
import {compose, withProps} from "recompose"
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {LogoSVG, PushPinSVG} from "../../helper/svgs";

declare const google : any;

export const GameMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: (window.innerHeight - 53) + "px" }}/>,
        mapElement: <div style={{height: (window.innerHeight - 53) + "px"}}/>,
    }),
    withScriptjs,
    withGoogleMap
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
                        {visibility: "off"}
                    ]
                }
            ]
        }}
    >
        {!props.showAllMarker && <Marker onDragEnd={props.markerMoved} icon={{ url: PushPinSVG({ color: props.player.color, size: 60 })}} position={props.lastMarkerPosition} animation={(google as any).maps.Animation.DROP} draggable={true} />}
        {props.showAllMarker && props.game && props.game.results.map((result) => {
            return <Marker key={result.user.name} icon={{ url: PushPinSVG({ color: result.user.color })}} position={{lat: result.lat, lng: result.lng}} animation={(google as any).maps.Animation.DROP} draggable={false} />
        })}
        {props.showAllMarker && props.game && <Marker position={{lat: props.game.requirement.latlng[0], lng: props.game.requirement.latlng[1]}} icon={{url: LogoSVG() }} animation={(google as any).maps.Animation.DROP} draggable={false} />
        }
    </GoogleMap>
);
