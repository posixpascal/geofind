import { observable } from "@legendapp/state";
import { Map, Marker } from "maplibre-gl";
export const userPin = observable<Marker>();
export const otherUserPins = observable<Marker>();
