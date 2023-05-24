"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceBetween = exports.humanizeDistance = exports.calcDistance = exports.toRad = void 0;
const toRad = (degree) => {
    return (degree * Math.PI) / 180;
};
exports.toRad = toRad;
const calcDistance = (lat1, lat2, lng1, lng2) => {
    const R = 6371; // km
    const dLat = (0, exports.toRad)(lat2 - lat1);
    const dLon = (0, exports.toRad)(lng2 - lng1);
    lat1 = (0, exports.toRad)(lat1);
    lat2 = (0, exports.toRad)(lat2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};
exports.calcDistance = calcDistance;
const humanizeDistance = (pointA, pointB, unitless = false) => {
    const deltaLatitude = (0, exports.toRad)(pointA.latitude - pointB.latitude);
    const deltaLongitude = (0, exports.toRad)(pointA.longitude - pointB.longitude);
    const a = Math.pow(Math.sin(deltaLatitude / 2), 2) +
        Math.pow(Math.sin(deltaLongitude / 2), 2) *
            Math.cos((0, exports.toRad)(pointA.latitude)) *
            Math.cos((0, exports.toRad)(pointB.latitude));
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
    if (distance < 40)
        return `< 50 ${result.smallUnit}`;
    distance = Math.round(distance / 50) * 50;
    return `${distance} ${result.smallUnit}`;
};
exports.humanizeDistance = humanizeDistance;
const distanceBetween = (pointA, pointB) => {
    const [latitude, longitude] = pointA;
    const [latitude2, longitude2] = pointB;
    const point1 = { latitude, longitude };
    const point2 = { latitude: latitude2, longitude: longitude2 };
    return (0, exports.humanizeDistance)(point1, point2, true);
};
exports.distanceBetween = distanceBetween;
