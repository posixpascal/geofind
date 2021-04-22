import {ActionTree, MutationTree} from 'vuex';
import {RootState} from '~/store/index';
import {Room} from "~/models";
import * as Colyseus from "colyseus.js";
import {OpenRoom} from "~/models/OpenRoom";

const reFetchAfter = 60000; // ms

export const state = () => ({});

export type RoomState = ReturnType<typeof state>

export const mutations: MutationTree<RoomState> = {};

const rooms: any  = {};

export const actions: ActionTree<RoomState, RootState> = {
  async fetchAll(context: any){
    const rooms = await (this as any).$collyseus.getAvailableRooms();
    await OpenRoom.insert({
      data: rooms
    });

    await OpenRoom.delete((openRoom) => {
      return !rooms.find(r => r.roomId === openRoom.roomId);
    });
  },
  async create(context: any, settings){
    const room = await (this as any).$collyseus.create(`game_${settings.mode}`, {
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
  async get(context: any, name){
    return rooms[name];
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
      console.error(e);
      this.$router.push("/");
    }

    return room;
  },
  async leave(context: any, roomName) {
    return rooms[roomName].leave();
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
          ...changes.toJSON()
        }
      });
    });

    return room;
  },
  async ready(context: any, room: any) {
    rooms[room.id].send("ready");
  },
  async unready(context: any, room: any) {
    rooms[room.id].send("unready");
  }
}
