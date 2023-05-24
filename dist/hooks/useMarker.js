"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMarker = void 0;
const maplibre_gl_1 = require("maplibre-gl");
const react_1 = require("react");
const marker_1 = require("@/state/marker");
const react_2 = require("@legendapp/state/react");
const useMarker = ({ map }) => {
    const [marker, setMarker] = (0, react_1.useState)(null);
    const lngLat = (0, react_2.useSelector)(() => marker_1.markerState.get());
    const setLngLat = (values) => marker_1.markerState.set(values);
    (0, react_1.useEffect)(() => {
        if (!map) {
            return;
        }
        // Drop a marker
        const pin = new maplibre_gl_1.Marker({
            draggable: true,
            color: "#ff7a00",
        }).setLngLat([30.5, 50.5]);
        pin.addTo(map);
        // On marker movement
        pin.on("dragend", (event) => {
            setLngLat(event.lngLat);
        });
        // On map movement
        const handleClick = (event) => {
            pin.setLngLat(event.lngLat);
            setLngLat(event.lngLat);
        };
        map.on("click", handleClick);
        setMarker(pin);
        return () => {
            pin.remove();
            map.off("click", handleClick);
        };
    }, [setMarker, map, setLngLat]);
    (0, react_1.useEffect)(() => {
        if (marker) {
            setLngLat(marker.getLngLat());
        }
    }, [marker, setLngLat]);
    return { marker, lngLat };
};
exports.useMarker = useMarker;
