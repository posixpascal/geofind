import React from "react";
import {Marker} from "react-google-maps";
import {PushPinSVG} from "../../../helper/svgs";

declare const google : any;

export const PinMarker = ({markerMoved, color, position}) => {
    return <Marker onDragEnd={markerMoved} icon={{url: PushPinSVG({color, size: 60})}}
            position={position} animation={(google as any).maps.Animation.DROP} draggable={true}/>
};
