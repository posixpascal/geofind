import React from "react";
import {withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";

export const composeMap = ({height}) => {
    return compose(
        withProps({
            containerElement: <div style={{zIndex: 15, height}}/>,
            googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBrYhUk7lxR-FYLg5AQIpAIEyFlxsClq2k",
            loadingElement: <div style={{zIndex: 15, height: `100%`}}/>,
            mapElement: <div style={{zIndex: 15, height}}/>,
        }),
        withScriptjs,
        withGoogleMap,
    );
};
