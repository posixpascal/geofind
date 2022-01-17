import NodeGeocoder from "node-geocoder";

const geocoder = NodeGeocoder({
  provider: "google",
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

export const reverseCoordinates = async (coordinates: any) => {
  const lookupCountries = await geocoder.reverse({
    lat: coordinates[0],
    lon: coordinates[1],
  });

  return lookupCountries[0];
};
