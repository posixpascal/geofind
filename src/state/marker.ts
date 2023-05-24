import { observable } from "@legendapp/state";

interface MarkerState {
  lat: number;
  lng: number;
}

export const markerState = observable<MarkerState>({
  lat: 30,
  lng: 30,
});
