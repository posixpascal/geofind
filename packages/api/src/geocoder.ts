import NodeGeocoder from "node-geocoder";
var HttpsAdapter = require("node-geocoder/lib/httpadapter/httpsadapter.js");
var httpAdapter = new HttpsAdapter(null, {
  headers: {
    "user-agent": "geofind.io <posixpascal@googlemail.com>",
  },
});

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  //apiKey: process.env.GOOGLE_MAPS_API_KEY,
  email: "posixpascal@googlemail.com",
  language: "de",
  httpAdapter,
});

export const reverseCoordinates = async (coordinates: any) => {
  const lookupCountries = await geocoder.reverse({
    lat: coordinates[0],
    lon: coordinates[1],
    zoom: 10,
  });

  return lookupCountries[0];
};
