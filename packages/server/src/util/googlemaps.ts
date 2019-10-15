import * as gmaps from "@google/maps";
export const googleMapsClient = gmaps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
});
