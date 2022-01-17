import { Schema, MapSchema, type } from "@colyseus/schema";

export class Domain extends Schema {
  @type("string") alpha2Code: string;
}
