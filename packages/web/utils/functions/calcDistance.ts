export const toRad = (degree) => {
  return (degree * Math.PI) / 180
}

export const calcDistance = (lat1, lat2, lng1, lng2) => {
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lng2 - lng1)
  lat1 = toRad(lat1)
  lat2 = toRad(lat2)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}
