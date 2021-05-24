import {Model} from "@vuex-orm/core";
import {User} from "~/models/User";

interface IVote {
  distanceInKm: number;
}

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
      mapStyle: this.string(''),
      borders: this.boolean(true),
      roundTime: this.number(null),
      players: this.attr({}),
      country: this.attr(null),
      votes: this.attr(null),
      round: this.number(0),
      maxRounds: this.number(0),
      pointsNeeded: this.number(0),
      locked: this.boolean(false),
      public: this.boolean(false),
      suddenDeath: this.boolean(false),
      directMatchesOnly: this.boolean(false),
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

  public id!: any;
  public state!: any;
  public name!: string;
  public mode!:string;
  public scoreboard: any;
  public leaderId!: string;
  public players!: any;
  public round: number;
  public maxRounds: number;
  public votes!: IVote[];
  public country!: any;
  public borders!: boolean;
  public mapStyle!: string;
  public mapSet!: any;
  public pointsNeeded!: any;
  public roundTime!: any;
  public directMatchesOnly!: any;
  public gameMode!: any;
  public public!: any;
  public suddenDeath!: any;
}
