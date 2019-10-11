import React from "react";
import {GoogleMap, Marker, OverlayView, StreetViewPanorama, withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import {LogoSVG, PushPinSVG} from "../../../helper/svgs";
import {WorldMap} from "./worldMap";

declare const google: any;
const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
});
export const StreetViewGameMap = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
        loadingElement: <div style={{zIndex: 15, height: `100%`}}/>,
        containerElement: <div style={{zIndex: 15, height: (window.innerHeight + 80) + "px"}}/>,
        mapElement: <div style={{zIndex: 15, height: (window.innerHeight + 80) + "px"}}/>,
    }),
    withScriptjs,
    withGoogleMap,
)((props) => <WorldMap {...props}>
        <StreetViewPanorama position={props.game.country} visible>

        </StreetViewPanorama>
    </WorldMap>
);
