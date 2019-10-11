import React from "react";
import {GoogleMap} from "react-google-maps";

export const WorldMap = ({children, passRef, center, mapClicked}) => {
    return <GoogleMap
        defaultZoom={3}
        ref={passRef}
        defaultCenter={center}
        onClick={mapClicked}
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
        }}>{children}</GoogleMap>
};
