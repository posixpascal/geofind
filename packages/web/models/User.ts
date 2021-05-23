import {Model} from "@vuex-orm/core";
import {MAP_STYLES} from "~/constants/mapstyles";
import {PIN_COLORS} from "~/constants/pins";

export class User extends Model {
  static entity = 'users';
  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.uid(),
      displayName: this.string(null).nullable(),
      metadata: this.attr({}),
      isAnonymous: this.boolean(true),
    }
  }

  _id!: string;
  metadata!: any;
  displayName: string;
  isAnonymous: boolean;

  get mapStyleName(){
    return this.metadata.mapStyle || 'basic';
  }

  get mapStyle(){
    return MAP_STYLES[this.mapStyleName];
  }

  get pinColor(){
    return PIN_COLORS[this.metadata.pin]
  }
}
