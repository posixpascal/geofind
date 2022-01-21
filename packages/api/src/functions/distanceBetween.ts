import { humanizeDistance } from './humanizeDistance'

const distanceBetween = (
  pointA: [number, number],
  pointB: [number, number]
) => {
  const [latitude, longitude] = pointA
  const [latitude2, longitude2] = pointB

  const point1 = { latitude, longitude }
  const point2 = { latitude: latitude2, longitude: longitude2 }

  return humanizeDistance(point1, point2, true) as number
}

export default distanceBetween
