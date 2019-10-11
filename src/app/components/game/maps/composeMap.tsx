import React from "react";
import {compose, withProps} from "recompose";
import {withGoogleMap, withScriptjs} from "react-google-maps";

export const composeMap = ({height}) => {
    return compose(
        withProps({
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
            loadingElement: <div style={{zIndex: 15, height: `100%`}}/>,
            containerElement: <div style={{zIndex: 15, height}}/>,
            mapElement: <div style={{zIndex: 15, height}}/>,
        }),
        withScriptjs,
        withGoogleMap,
    )
};