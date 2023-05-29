import React, {ReactNode, useEffect, useRef, useState} from "react";
import {createMapStyle} from "@/hooks/createMapStyle";
import type {StylePropertySpecification} from "maplibre-gl";
import maplibregl, {MapMouseEvent, Marker, StyleSpecification,} from "maplibre-gl";
import {animated, useSpring} from "@react-spring/web";
import {LoadingSpinner} from "@/components/utils/LoadingSpinner";
import {PIN_COLORS} from "@/server/constants/pins";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import "maplibre-gl/dist/maplibre-gl.css";
import {PinComponents} from "@/components/user/UserPinSelection";
import {renderToString} from "react-dom/server";
import {mapState} from "@/state/map";
import {userPin} from "@/state/userPin";

interface MapProps {
    children: ReactNode;
    onMapHandle?: (map: maplibregl.Map) => void;
    onMapLoaded?: (map?: maplibregl.Map) => void;
    onCoordsChange?: (event: MapMouseEvent) => void;
    mapStyle?: StylePropertySpecification;
    onMapInstance?: (map: maplibregl.Map) => void;
    withMarker: boolean;
}

const customMarker = (user) => {
    const wrapper = document.createElement("div");
    const pin = PinComponents[user.pin];
    const element = renderToString(pin);
    wrapper.innerHTML = `<div style="color: ${
        PIN_COLORS[user.color]
    }; width: 38px; height:38px; position: relative; top: -14px;">${element}</div>`;
    return wrapper;
};

export const Map: React.FC<MapProps> = ({
                                            onMapHandle,
                                            onMapLoaded,
                                            onCoordsChange,
                                            withMarker,
                                            mapStyle,
                                            children,
    ...props
                                        }) => {
    const {user} = useCurrentUser();
    const map = useRef(null);
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const pin = useRef<Marker | null>(null);
    const [loading, setLoading] = useState(true);
    const {x} = useSpring({
        from: {x: 0},
        x: loading ? 0 : 1,
        config: {duration: 300},
    });

    useEffect(() => {
        if (!mapContainer.current || map.current || !user.data) return;
        const style: StyleSpecification = mapStyle ?? createMapStyle();

        map.current = new maplibregl.Map({
            container: mapContainer!.current!,
            style: style,
        });

        map.current.on("load", () => {
            setLoading(false);
            onMapLoaded(map.current);
            mapState.set(map.current);
        });

        if (withMarker) {
            map.current.on("click", (event) => {
                pin.current.setLngLat(event.lngLat);
                onCoordsChange(event);
            });

            pin.current = new Marker({
                element: customMarker(user.data),
                draggable: true,
                color: PIN_COLORS[user.data.color] || "#ff7a00",
            });

            pin.current.setLngLat([30.5, 50.5]);

            pin.current.addTo(map.current);

            pin.current.on("dragend", (event) => {
                onCoordsChange(event);
            });

            userPin.set(pin.current);
        }
    }, [user, mapContainer, map]);

    return (
        <div>
            <LoadingSpinner isLoading={loading}/>
            <animated.div
                style={{
                    opacity: x.interpolate({
                        range: [0, 1],
                        output: [0, 1],
                    }),
                }}
                className={"absolute inset-0 w-min-screen h-min-screen"}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "100%",
                    }}
                    ref={mapContainer}
                    {...props}
                ></div>
                {children}
            </animated.div>
        </div>
    );
};

export default Map;
