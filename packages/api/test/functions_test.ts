import { getRandomCountry } from '../src/db/getRandomCountry'
import { boot, ColyseusTestServer } from '@colyseus/testing'
import appConfig from '../src/arena.config'
import { client } from '../src/db/client'
import assert from 'assert'
import { calcDistance } from '../src/functions/calcDistance'
import { humanizeDistance } from '../src/functions/humanizeDistance'
describe('functions', () => {
  it('calculates human distance', async () => {
    const point1 = { latitude: 51.5847043, longitude: 7.1139366 }
    const point3 = { latitude: 51.5848043, longitude: 7.1140366 }
    const point2 = { latitude: 55.7448439, longitude: 37.6092715 }
    const point4 = { latitude: 51.5849043, longitude: 7.1144366 }

    assert.equal(humanizeDistance(point1, point2), '2044.4 km')
    assert.equal(humanizeDistance(point1, point3), '< 50 m')
    assert.equal(humanizeDistance(point1, point4), '50.0 m')
  })

  it('calculates difference between points', async () => {
    const point1 = [51.5847043, 7.1139366]
    const point2 = [55.7448439, 37.6092715]
    assert.equal(
      calcDistance(point1[0], point1[1], point2[0], point2[1]).toFixed(0),
      '5218'
    )

    assert.equal(
      calcDistance(point2[0], point2[1], point1[0], point1[1]).toFixed(0),
      '3853'
    )
  })
})
