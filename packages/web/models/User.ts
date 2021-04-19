import {Model} from "@vuex-orm/core";

export class User extends Model {
  static entity = 'users';
  static primaryKey = '_id';

  static fields() {
    return {
      _id: this.uid(),
      displayName: this.string(null).nullable(),
      metadata: this.attr({})
    }
  }

  metadata!: any;
  displayName: string;
}
