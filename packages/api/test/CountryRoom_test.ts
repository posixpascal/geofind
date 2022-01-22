import assert from 'assert'
import { ColyseusTestServer, boot } from '@colyseus/testing'

// import your "arena.config.ts" file here.
import appConfig from '../src/arena.config'
import { CountryRoomState } from '../src/rooms/schema/CountryRoomState'
import { LOBBY_PHASE, PLAY_PHASE } from '@geofind/web/constants/phases'
import {
  ROOM_LOBBY,
  ROOM_RESTART,
  ROOM_SETTINGS,
  ROOM_START,
  ROOM_VOTE,
  USER_UPDATE,
} from '../src/constants/messages'
import { Dispatcher } from '@colyseus/command'
import { OnPrepareRoundCommand } from '../src/commands/OnPrepareRoundCommand'
import {
  ROUND_END_STATE,
  ROUND_PREPARE_STATE,
  ROUND_START_STATE,
  SCOREBOARD_STATE,
} from '../src/constants/game'
import { OnVoteCommand } from '../src/commands/OnVoteCommand'
import { Client } from 'colyseus'
import { OnEndRoundCommand } from '../src/commands/OnEndRoundCommand'
import { OnScoreboardCommand } from '../src/commands/OnScoreboardCommand'
import { messages } from '../src/constants/messages'
import { OnStartRoundCommand } from '../src/commands/OnStartRoundCommand'

describe('testing country room', () => {
  let colyseus: ColyseusTestServer

  before(async () => (colyseus = await boot(appConfig)))
  after(async () => colyseus.shutdown())

  beforeEach(async () => await colyseus.cleanup())

  it('connecting into a room', async () => {
    const room = await colyseus.createRoom<CountryRoomState>('countries', {
      roundTime: 15,
    })
    const client1 = await colyseus.connectTo(room)
    assert.strictEqual(client1.sessionId, room.clients[0].sessionId)
    await room.waitForNextPatch()

    assert.equal(room.state.players.get(client1.sessionId).pin, 1, 'pin equal')
    assert.equal(room.state.phase, LOBBY_PHASE)
    assert.equal(room.state.roundTime, 15)

    const client2 = await colyseus.connectTo(room, {
      username: 'Hello',
    })

    assert.equal(
      room.state.players.get(client2.sessionId).username,
      'Hello',
      'username equal'
    )
  })

  it('correctly handles ingame events', async () => {
    const room = await colyseus.createRoom<CountryRoomState>('countries')
    const client1 = await colyseus.connectTo(room)
    const client2 = await colyseus.connectTo(room)
    await room.waitForNextPatch()
    assert.equal(room.state.creatorId, client1.sessionId)
    client2.send(ROOM_START)
    assert.equal(room.state.phase, LOBBY_PHASE)
    client1.send(ROOM_START)
    await room.waitForNextPatch()
    assert.equal(room.state.phase, PLAY_PHASE)

    assert.equal(room.state.creatorId, client1.sessionId)
    client2.send(ROOM_LOBBY)
    await room.waitForNextPatch()
    client1.send(ROOM_LOBBY)
    await room.waitForNextPatch()
    assert.equal(room.state.phase, LOBBY_PHASE)
    await room.waitForNextPatch()
    client2.send(ROOM_RESTART)
    await room.waitForNextPatch()
    assert.equal(room.state.phase, LOBBY_PHASE)
    client1.send(ROOM_RESTART)
    await room.waitForNextPatch()
    assert.equal(room.state.phase, PLAY_PHASE)

    client2.send(USER_UPDATE, {
      username: 'test',
    })
    await room.waitForNextPatch()
    await room.waitForNextPatch()
    assert.equal(room.state.players.get(client2.sessionId).username, 'test')
    client1.send(ROOM_SETTINGS, {
      map: 'europe',
      roundTime: 1,
    })
    await room.waitForNextPatch()
    await room.waitForNextPatch()
    assert.equal(room.state.map, 'europe')
    const dispatcher = new Dispatcher(room)
    await dispatcher.dispatch(new OnStartRoundCommand())
    await room.waitForNextPatch()
    setTimeout(() => {
      assert.equal(room.state.state, ROUND_END_STATE)
    }, 1200)
  })

  it('selects a random country from the pool', async () => {
    const room = await colyseus.createRoom<CountryRoomState>('countries')
    const client1 = await colyseus.connectTo(room)
    await room.waitForNextPatch()
    const dispatcher = new Dispatcher(room)
    await dispatcher.dispatch(new OnPrepareRoundCommand())
    assert.equal(room.state.state, ROUND_START_STATE)
    await room.waitForNextPatch()
    assert.equal(
      room.state.country.id !== undefined,
      true,
      'country is not null'
    )
    assert.equal(
      room.state.country.lat !== undefined,
      true,
      'country is not null'
    )
    assert.equal(
      room.state.country.lng !== undefined,
      true,
      'country is not null'
    )

    // send incorrect vote.
    await client1.send(ROOM_VOTE, {
      position: [room.state.country.lat, 0],
    })
    await dispatcher.dispatch(new OnVoteCommand(), {
      client: client1 as any,
      latlng: [room.state.country.lat, 0],
    })
    await room.waitForNextPatch()
    if (room.state.votes.get(client1.sessionId).isCorrect) {
      console.log(
        'correct??',
        room.state.country.lat,
        room.state.country.lng,
        room.state.country.alpha2code
      )
    }
    assert.equal(room.state.votes.get(client1.sessionId).isCorrect, false)

    await dispatcher.dispatch(new OnVoteCommand(), {
      client: client1 as any,
      latlng: [room.state.country.lat, room.state.country.lng],
    })

    await room.waitForNextPatch()
    if (!room.state.votes.get(client1.sessionId).isCorrect) {
      console.log(
        room.state.country.lat,
        room.state.country.lng,
        room.state.country.alpha2code
      )
    }
    assert.equal(room.state.votes.get(client1.sessionId).isCorrect, true)
    assert.equal(room.state.votes.get(client1.sessionId).hasCountry, true)
    assert.equal(
      room.state.votes.get(client1.sessionId).country.id,
      room.state.country.id
    )

    // force round end
    await dispatcher.dispatch(new OnEndRoundCommand())
    assert.equal(room.state.state, ROUND_END_STATE)
    await room.waitForNextPatch()
    assert.equal(room.state.scoreboard.get(client1.sessionId).points, 1)
    // proceed to scoreboard
    await dispatcher.dispatch(new OnScoreboardCommand())
    assert.equal(room.state.state, SCOREBOARD_STATE)

    await room.waitForNextPatch()
    await dispatcher.dispatch(new OnPrepareRoundCommand())
    assert.equal(room.state.rounds, 2)
  })
})
