import { Schema, MapSchema, type } from "@colyseus/schema";

export class Translation extends Schema {
  @type("string") country: string;
  @type("string") capital: string;
}
