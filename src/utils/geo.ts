interface LatLon {
  latitude: number;
  longitude: number;
}

export const toRad = (degree: number ) => {
  return (degree * Math.PI) / 180;
};

export const calcDistance = (lat1: number, lat2: number, lng1: number, lng2: number) => {
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

export const humanizeDistance = (pointA: LatLon, pointB: LatLon, unitless = false) => {
  const deltaLatitude = toRad(pointA.latitude - pointB.latitude);
  const deltaLongitude = toRad(pointA.longitude - pointB.longitude);

  const a =
    Math.pow(Math.sin(deltaLatitude / 2), 2) +
    Math.pow(Math.sin(deltaLongitude / 2), 2) *
      Math.cos(toRad(pointA.latitude)) *
      Math.cos(toRad(pointB.latitude));

  const hav = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const result = {
    distance: hav * 6373,
    unit: "km",
    smallUnit: "m",
    factor: 1000,
    smallBorder: 0.1,
  };

  if (unitless) {
    return result.distance;
  }
  console.log(result);

  if (result.distance >= result.smallBorder) {
    return `${result.distance} ${result.unit}`;
  }

  let distance = result.distance * result.factor;
  if (distance < 40) return `< 50 ${result.smallUnit}`;

  distance = Math.round(distance / 50) * 50;
  return `${distance} ${result.smallUnit}`;
};

export const distanceBetween = (
  pointA: [number, number],
  pointB: [number, number]
) => {
  const [latitude, longitude] = pointA;
  const [latitude2, longitude2] = pointB;

  const point1 = { latitude, longitude };
  const point2 = { latitude: latitude2, longitude: longitude2 };

  return humanizeDistance(point1, point2, true) as number;
};
