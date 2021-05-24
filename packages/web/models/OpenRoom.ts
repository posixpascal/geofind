import {Model} from "@vuex-orm/core";
import {User} from "~/models/User";

export class OpenRoom extends Model {
  static entity = 'open-rooms';
  static primaryKey = "roomId";
  static fields() {
    return {
      roomId: this.string(null).nullable(),
      clients: this.number(0),
      maxClients: this.attr(64),
      metadata: this.attr(null),
      locked: this.boolean(false),
      public: this.boolean(false),
    }
  }

  public roomId!: any;
  public metadata!: any;
  public maxClients!: any;
  public players!: any;
  public locked!: boolean;
  public public!: boolean;
}
