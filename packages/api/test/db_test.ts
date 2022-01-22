import { getRandomCountry } from '../src/db/getRandomCountry'
import { boot, ColyseusTestServer } from '@colyseus/testing'
import appConfig from '../src/arena.config'
import { client } from '../src/db/client'
import assert from 'assert'
describe('testing db client', () => {
  // before(async () => await client.connect())
  // after(async () => await client.end())

  it('gets a random country', async () => {
    const country = await getRandomCountry({}, [])
    assert.equal(typeof country.id === 'string', true)
    assert.equal(typeof country.lat === 'number', true)
    assert.equal(typeof country.lng === 'number', true)
  })
})
