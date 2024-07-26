import numeral from 'numeral'
import { toRad } from './calcDistance'

export const humanizeDistance = (pointA, pointB, unitless = false) => {
  const deltaLatitude = toRad(pointA.lat - pointB.lat)
  const deltaLongitude = toRad(pointA.lng - pointB.lng)

  const a =
    Math.pow(Math.sin(deltaLatitude / 2), 2) +
    Math.pow(Math.sin(deltaLongitude / 2), 2) *
      Math.cos(toRad(pointA.lat)) *
      Math.cos(toRad(pointB.lat))

  const hav = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const result = {
    distance: hav * 6373,
    unit: 'km',
    smallUnit: 'm',
    factor: 1000,
    smallBorder: 0.1,
  }

  if (unitless) {
    return parseInt(result.distance.toFixed(0))
  }

  if (result.distance >= result.smallBorder) {
    return `${numeral(result.distance).format('0.0')} ${result.unit}`
  }

  let distance = result.distance * result.factor
  if (distance < 40) return `< 50 ${result.smallUnit}`

  distance = Math.round(distance / 50) * 50
  return `${numeral(distance).format('0.0')} ${result.smallUnit}`
}
