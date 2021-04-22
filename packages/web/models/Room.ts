import {Model} from "@vuex-orm/core";
import {User} from "~/models/User";

export class Room extends Model {
  static entity = 'rooms';

  static fields() {
    return {
      id: this.uid(),
      name: this.string(null).nullable(),
      state: this.attr({}),
      mode: this.string(null).nullable(),
      gameMode: this.string(null).nullable(),
      mapSet: this.string(null).nullable(),
      gameStartsIn: this.number(3),
      roundTime: this.number(null),
      players: this.attr({}),
      country: this.attr(null),
      votes: this.attr(null),
      scoreboard: this.attr(null),
      leaderId: this.attr(null)
    }
  }

  isLeader(user: User) {
    return (user._id === this.leaderId);
  }

  player(user: User) {
    for (const id in this.players) {
      if (this.players[id].id === user._id && this.players.hasOwnProperty(id)) {
        return this.players[id];
      }
    }
    return {};
  }

  isReady() {
    let ready = true;
    for (const id in this.players) {
      if (this.players.hasOwnProperty(id)) {
        ready = (ready && this.players[id].isReady);
      }
    }
    return ready;
  }

  public state!: any;
  public name!: string;
  public scoreboard: any;
  public leaderId!: string;
  public players!: any;
}
