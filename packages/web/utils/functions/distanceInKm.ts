import { calcDistance } from './calcDistance'

export const distanceInKm = (point1, point2) => {
  return calcDistance(point1.lat, point2.lat, point1.lng, point2.lng)
}
