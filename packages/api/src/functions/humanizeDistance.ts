import numeral from "numeral";
import { toRad } from "./calcDistance";

export const humanizeDistance = (
  pointA,
  pointB,
  unitSystem,
  unitless = false
) => {
  unitSystem = unitSystem || "metric";

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
