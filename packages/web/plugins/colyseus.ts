import { Context, Plugin } from '@nuxt/types'
import * as Colyseus from 'colyseus.js'
import { GameRoom } from '~/constants/games';
import Vue from 'vue';

class RoomManager {
  public rooms: Map<string, Colyseus.Room> = new Map();
  public state: Map<string, any> = new Map();
  constructor(private readonly context: Context, private readonly colyseus: Colyseus.Client){}

  async create(game: GameRoom, settings: any){
    const room = await this.colyseus.create(game, settings).then((room) => {
      return this.attachListeners(room);
    });
    this.rooms.set(room.id, room);
    return room;
  }

  async connect(roomId: string){
    if (!this.rooms.has(roomId)){
      const room = await this.colyseus.joinById(roomId).then((room) => {
        return this.attachListeners(room);
      });
      this.rooms.set(room.id, room);
      console.info("Joined room", {roomId, room});
      return;
    }
    
    const room = this.rooms.get(roomId);    
    if (!(room as any).hasJoined){
      room.removeAllListeners();
      const newRoom = await this.colyseus.joinById(roomId).then((room) => {
        return this.attachListeners(room);
      });
      this.rooms.set(newRoom.id, newRoom);
      console.info("Joined room", {roomId, room});
    }
  }

  attachListeners(room: Colyseus.Room){
      let state = Vue.observable({
        value: {}
      });

      room.onStateChange((newState) => {
        state.value = newState;
      });

      this.state.set(room.id, state);
      return room;
  }

  lobby(room: Colyseus.Room) {
    return this.context.localePath({
      name: "lobby-id",
      params: {
        id: room.id,
      }
    });
  }
}

const plugin: Plugin = async (context: Context, inject) => {
  const client = new Colyseus.Client(context.$config.colyseusUrl);
  inject('colyseus', client);
  inject('rooms', new RoomManager(context, client));
  
}

declare module '@nuxt/types' {
  interface Context {
    $colyseus: Colyseus.Client,
    $rooms: RoomManager
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $colyseus: Colyseus.Client
    $rooms: RoomManager
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $colyseus: Colyseus.Client
    $rooms: RoomManager
  }
}

export default plugin
