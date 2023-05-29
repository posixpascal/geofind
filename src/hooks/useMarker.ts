import maplibregl, {
  LngLat,
  LngLatLike,
  MapMouseEvent,
  Marker,
} from "maplibre-gl";
import { useEffect, useState } from "react";
import { markerState } from "@/state/marker";
import { useSelector } from "@legendapp/state/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PIN_COLORS } from "@/server/constants/pins";

type UseMarkerFunction = (args: { map?: maplibregl.Map | null }) => {
  marker: Marker | null;
  lngLat: LngLatLike | undefined;
};
export const useMarker: UseMarkerFunction = ({ map }) => {
  const { user } = useCurrentUser();
  const [marker, setMarker] = useState<Marker | null>(null);
  const lngLat = useSelector(() => markerState.get());

  const handleClick = (event: MapMouseEvent) => {
    //pin.setLngLat(event.lngLat);
    setLngLat(event.lngLat);
  };

  const setLngLat = (values: LngLat) => markerState.set(values);

  useEffect(() => {
    if (!map || !user.data || marker) {
      return;
    }

    // Drop a marker
    const pin = new Marker({
      draggable: true,
      color: PIN_COLORS[user.data.color] || "#ff7a00",
    });
    pin.setLngLat([30.5, 50.5]);
    pin.addTo(map);

    // On marker movement
    pin.on("dragend", (event) => {
      setLngLat(event.lngLat);
    });

    setMarker(pin);
    return () => {
      pin.remove();
      setMarker(null);
    };
  }, [user, map]);

  useEffect(() => {
    if (marker) {
      setLngLat(marker.getLngLat());
    }
  }, [marker, setLngLat]);

  return { marker, lngLat };
};
