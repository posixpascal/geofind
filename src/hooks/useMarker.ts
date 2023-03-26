import maplibregl, {
  LngLat,
  LngLatLike,
  MapMouseEvent,
  Marker,
} from "maplibre-gl";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { markerState } from "@/state/marker";

type UseMarkerFunction = (args: { map?: maplibregl.Map | null }) => {
  marker: Marker | null;
  lngLat: LngLatLike | undefined;
};
export const useMarker: UseMarkerFunction = ({ map }) => {
  const [marker, setMarker] = useState<Marker | null>(null);
  const [lngLat, setLngLat] = useRecoilState(markerState);

  useEffect(() => {
    if (!map) {
      return;
    }

    // Drop a marker
    const pin = new Marker({
      draggable: true,
      color: "#ff7a00",
    }).setLngLat([30.5, 50.5]);
    pin.addTo(map);

    // On marker movement
    pin.on("dragend", (event) => {
      setLngLat(event.lngLat);
    });

    // On map movement
    const handleClick = (event: MapMouseEvent) => {
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

  useEffect(() => {
    if (marker) {
      setLngLat(marker.getLngLat());
    }
  }, [marker, setLngLat]);

  return { marker, lngLat };
};
