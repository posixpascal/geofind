import { atom, RecoilState } from "recoil";

interface MarkerState {
  lat: number;
  lng: number;
}

export const markerState: RecoilState<MarkerState> = atom({
  key: "markerState",
  default: {
    lat: 30,
    lng: 30,
  },
});
