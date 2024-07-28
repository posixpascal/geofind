import {ActionTree, MutationTree} from 'vuex'
import {RootState} from '~/store/index'
import {Room} from '~/models'
import {GameSettings} from '~/constants/games'
import * as Colyseus from 'colyseus.js'
const reFetchAfter = 60000 // ms

export const state = () => ({})

export type RoomState = ReturnType<typeof state>

export const mutations: MutationTree<RoomState> = {}

const rooms: any = {}

export const actions: ActionTree<RoomState, RootState> = {
  async message(
    context: any,
    {room, type, data}: { room: Room; type: string; data: any }
  ) {
    if (!room || !rooms[room.roomId]) {
      return
    }

    console.log(type, '--> ', {room, data});
    await rooms[room.roomId].send(type, data)
  },
  async create(context: any, settings: GameSettings) {
    console.info("creating room", settings.room);
    const room = await this.$colyseus.create(settings.room, {
      ...settings,
      username: localStorage.getItem('username'),
      pin: localStorage.getItem('pin'),
    })

    localStorage.setItem('roomSession' + room.id, room.sessionId)
    await Room.insertFromColyseus(room)
    await context.dispatch('subscribe', room)
    await this.$router.push(window.$nuxt.localePath('/lobby/' + room.id))
  },
  async subscribe(context: any, room) {
    const {id, sessionId} = room;
    rooms[id] = room;
    room.onStateChange(async (state) => {
        (window as any).state = state;
        const model = await Room.query().where('roomId', id).first()
        await Room.insertOrUpdate({
          data: {
            id: model.id,
            roomId: id,
            sessionId: sessionId,
            ...state.toJSON(),
          },
        })
      });
  },
  async join(context: any, roomId) {
    try {
      let room
      if (localStorage.getItem('roomSession' + roomId)) {
        try {
          room = await this.$colyseus.reconnect(
            roomId,
            localStorage.getItem('roomSession' + roomId)
          )
        } catch (e) {
            // reconnect may not be successful, try to join with new session.
            room = await this.$colyseus.joinById(roomId, {
              username: localStorage.getItem('username'),
              pin: localStorage.getItem('pin'),
            })
        }
      } else {
        room = await this.$colyseus.joinById(roomId, {
          username: localStorage.getItem('username'),
          pin: localStorage.getItem('pin'),
        })
      }

      rooms[roomId] = room;
      localStorage.setItem('roomSession' + roomId, room.sessionId)
      await Room.insertFromColyseus(room)
      await context.dispatch('subscribe', room)
    } catch (e) {
      console.info(e)
      await this.$router.push(window.$nuxt.localePath('/?err=roomNotFound'))
    }
  },
  async leave(context: any, roomName) {
    if (rooms[roomName]) {
      return (rooms[roomName] as Colyseus.Room).leave();
    }
  },
}
