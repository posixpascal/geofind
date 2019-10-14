interface IGeoPoint {
    lat: number;
    lng: number;
}

export const distanceInKm = (point1: IGeoPoint, point2 : IGeoPoint) => {
    return calcDistance(point1.lat, point2.lat, point1.lng, point2.lng);
};

// calculates distance between 2 points
export const calcDistance = (lat1:number, lat2:number, lng1:number, lng2:number) => {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Converts numeric degrees to radians
export const toRad = (value:number) => {
    return value * Math.PI / 180;
};
