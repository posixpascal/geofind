import {ActionTree, MutationTree} from 'vuex';
import {RootState} from '~/store/index';
import {Room} from "~/models";
import * as Colyseus from "colyseus.js";

const reFetchAfter = 60000; // ms

export const state = () => ({});

export type RoomState = ReturnType<typeof state>

export const mutations: MutationTree<RoomState> = {};


export const actions: ActionTree<RoomState, RootState> = {
  async join(context: any, roomName) {
    let room: Colyseus.Room;
    try {
      room = await (window as any).$nuxt.$collyseus.joinById(roomName);
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
  async subscribe(context: any, room: any) {
    if (!room) {
      return;
    }
    room.onMessage((msg, data) => {
      console.log(msg, data);
    });

    room.onStateChange(async (changes: any) => {
      console.log(changes);
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
