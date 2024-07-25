export const calculateMidPoint = (latLngA: any, latLngB: any) => {
  function toRadians(degress: number): number {
    return degress * (Math.PI / 180)
  }

  function toDegrees(radians: number): string {
    return (radians * (180 / Math.PI)).toFixed(4)
  }

  const lngDiff = toRadians(latLngB.lng - latLngA.lng)
  const latA = toRadians(latLngA.lat)
  const latB = toRadians(latLngB.lat)
  const lngA = toRadians(latLngA.lng)

  const bx = Math.cos(latB) * Math.cos(lngDiff)
  const by = Math.cos(latB) * Math.sin(lngDiff)

  const latMidway = toDegrees(
    Math.atan2(
      Math.sin(latA) + Math.sin(latB),
      Math.sqrt((Math.cos(latA) + bx) * (Math.cos(latA) + bx) + by * by)
    )
  )
  const lngMidway = toDegrees(lngA + Math.atan2(by, Math.cos(latA) + bx))

  return { lat: latMidway, lng: lngMidway }
}
