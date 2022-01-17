import numeral from "numeral";

export const calculateMidPoint = (latLngA: any, latLngB: any) => {
  function toRadians(degress: number): number {
    return degress * (Math.PI / 180);
  }

  function toDegrees(radians: number): string {
    return (radians * (180 / Math.PI)).toFixed(4);
  }

  const lngDiff = toRadians(latLngB.lng - latLngA.lng);
  const latA = toRadians(latLngA.lat);
  const latB = toRadians(latLngB.lat);
  const lngA = toRadians(latLngA.lng);

  const bx = Math.cos(latB) * Math.cos(lngDiff);
  const by = Math.cos(latB) * Math.sin(lngDiff);

  const latMidway = toDegrees(
    Math.atan2(
      Math.sin(latA) + Math.sin(latB),
      Math.sqrt((Math.cos(latA) + bx) * (Math.cos(latA) + bx) + by * by)
    )
  );
  const lngMidway = toDegrees(lngA + Math.atan2(by, Math.cos(latA) + bx));

  return { lat: latMidway, lng: lngMidway };
};

export const humanizeDistance = (
  pointA,
  pointB,
  unitSystem,
  unitless = false
) => {
  unitSystem = unitSystem || "metric";
  const toRad = (degree) => (degree * Math.PI) / 180;

  const deltaLatitude = toRad(pointA.latitude - pointB.latitude);
  const deltaLongitude = toRad(pointA.longitude - pointB.longitude);

  const a =
    Math.pow(Math.sin(deltaLatitude / 2), 2) +
    Math.pow(Math.sin(deltaLongitude / 2), 2) *
      Math.cos(toRad(pointA.latitude)) *
      Math.cos(toRad(pointB.latitude));

  const hav = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const result =
    unitSystem === "metric"
      ? {
          distance: hav * 6373,
          unit: "km",
          smallUnit: "m",
          factor: 1000,
          smallBorder: 0,
        }
      : {
          distance: hav * 3960,
          unit: "mi",
          smallUnit: "yd",
          factor: 1760,
          smallBorder: 0.5,
        };

  if (unitless) {
    return result.distance;
  }

  if (result.distance < result.smallBorder) {
    let distance = result.distance * result.factor;
    if (distance < 40) return `< 50 ${result.smallUnit}`;

    distance = Math.round(distance / 50) * 50;
    return `${numeral(distance).format("0.0")} ${result.smallUnit}`;
  }

  return `${numeral(result.distance).format("0.0")} ${result.unit}`;
};

export const distanceInKm = (point1, point2) => {
  return calcDistance(point1.lat, point2.lat, point1.lng, point2.lng);
};

export const calcDistance = (lat1, lat2, lng1, lng2) => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const toRad = (degree) => {
  return (degree * Math.PI) / 180;
};
