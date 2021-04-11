import {Model} from "@vuex-orm/core";

export class Room extends Model {
  static entity = 'rooms';

  static fields(){
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
      scoreboard: this.attr(null)
    }
  }

  public state!:any;
  public name!:string;
  public scoreboard: any;
}
