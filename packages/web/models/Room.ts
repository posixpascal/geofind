import {Model} from "@vuex-orm/core";

export class Room extends Model {
  static entity = 'rooms';

  static fields(){
    return {
      id: this.uid(),
      name: this.string(null).nullable(),
      state: this.attr({}),
      roundTimeLeft: this.number(30),
      players: this.attr({})
    }
  }

  public state!:any;
  public name!:string;
}
