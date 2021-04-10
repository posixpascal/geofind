import React from "react";
import {GoogleMap} from "react-google-maps";

export const WorldMap = ({children, passRef, center, mapClicked}) => {

    const defaultOptions = {
        disableDefaultUI: true,
        styles: [
            {
                elementType: "labels",
                featureType: "all",
                stylers: [
                    {visibility: "off"},
                ],
            },
        ],
    };

    return (
        <GoogleMap
            defaultZoom={3}
            ref={passRef}
            defaultCenter={center}
            onClick={mapClicked}
            defaultOptions={defaultOptions as any}
        >
            {children}
        </GoogleMap>
    );
};
