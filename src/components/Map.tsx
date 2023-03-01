import {ReactNode, useEffect, useRef, useState} from "react";
import maplibregl, {StyleSpecification} from 'maplibre-gl';
import {useMapStyle} from "@/hooks/useMapStyle";
import "maplibre-gl/dist/maplibre-gl.css";
import {animated, useSpring} from "@react-spring/web";

interface MapProps {
    children: ReactNode,
    onMapHandle: (map: maplibregl.Map) => void
}

export const Map: React.FC<MapProps> = ({onMapHandle, children}) => {
    const [loading, setLoading] = useState(true);
    const [map, setMap] = useState<maplibregl.Map|null>(null);
    const style: StyleSpecification = useMapStyle();
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const {x} = useSpring({from: {x: 0}, x: loading ? 0 : 1, config: {duration: 300}})

    useEffect(() => {
        if (map) return;

        const mapCtrl = new maplibregl.Map({
            container: mapContainer!.current!,
            style: style,
        });

        mapCtrl.on('load', () => {
            setLoading(false);
        });

        setMap(mapCtrl);
    }, [setMap, style]);

    useEffect(() => {
        if (!map) { return; }
        onMapHandle(map);
    }, [map])


    return <animated.div
        style={{
            opacity: x.interpolate({
                range: [0, 1],
                output: [0, 1]
            })
        }}
        className={'fixed inset-0 w-min-screen h-min-screen'}>
        <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
        }} ref={mapContainer}></div>

        {children}
    </animated.div>
}