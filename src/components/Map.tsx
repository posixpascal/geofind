import React, {ReactNode, useEffect, useRef, useState} from "react";
import {createMapStyle} from "@/hooks/createMapStyle";
import maplibregl, {StyleSpecification} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {animated, useSpring} from "@react-spring/web";
import {LoadingSpinner} from "@/components/LoadingSpinner";

interface MapProps {
    children: ReactNode;
    onMapHandle: (map: maplibregl.Map) => void;
    mapStyle?: StyleSpecification;
    onMapInstance? : (map: maplibregl.Map) => void;
}

export const Map: React.FC<MapProps> = ({
                                            onMapHandle,
                                            mapStyle,
                                            children,
    onMapInstance,
                                        }) => {
    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const style: StyleSpecification = mapStyle ?? createMapStyle();
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const {x} = useSpring({
        from: {x: 0},
        x: loading ? 0 : 1,
        config: {duration: 300},
    });

    useEffect(() => {
        if (map) return;

        const mapCtrl = new maplibregl.Map({
            container: mapContainer!.current!,
            style: style,
        });

        mapCtrl.on("load", () => {
            setLoading(false);
        });

        if (onMapInstance){
            onMapInstance(mapCtrl);
        }

        setMap(mapCtrl);
    }, [map, setMap, style]);

    useEffect(() => {
        if (!map) {
            return;
        }
        onMapHandle(map);
    }, [onMapHandle, map]);

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
                >

                </div>
                {children}
            </animated.div>
        </div>
    );
};
