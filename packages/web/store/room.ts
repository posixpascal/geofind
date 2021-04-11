import {ActionTree, MutationTree} from 'vuex';
import {RootState} from '~/store/index';
import {Room} from "~/models";
import * as Colyseus from "colyseus.js";

const reFetchAfter = 60000; // ms

export const state = () => ({});

export type RoomState = ReturnType<typeof state>

export const mutations: MutationTree<RoomState> = {};

const rooms: any  = {};

export const actions: ActionTree<RoomState, RootState> = {
  async create(context: any, settings){
    const room = await (this as any).$collyseus.joinOrCreate(`game_${settings.mode}`, {
      ...settings
    });

    if (!room){ return; }
    rooms[room.id] = room;

    await Room.insertOrUpdate({
      data: {
        id: room.id,
        name: room.name,
      }
    });

    return room;
  },
  async join(context: any, roomName) {
    let room: Colyseus.Room | null = null;
    try {
      room = await (window as any).$nuxt.$collyseus.joinById(roomName);
      if (!room){ return; }
      rooms[room.id] = room;
      await Room.insertOrUpdate({
        data: {
          id: room.id,
          name: room.name,
        }
      })
    } catch (e) {
      this.$router.push("/");
    }

    return room;
  },
  async message(context, { roomId, action, payload }){
    if (!rooms[roomId]){ return; }
    rooms[roomId].send(action, payload);
  },
  async setmap(context, {roomId, ref}){
    rooms[roomId].map = ref;
  },
  async subscribe(context: any, room: any) {
    if (!room) {
      return;
    }

    room.onStateChange(async (changes: any) => {
      await Room.update({
        where: room.id,
        data: {
          ...room,
          ...changes.toJSON()
        }
      });
    });
  }
}
