import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class RoundResult extends Schema {
  @type(["string"]) winnerIds = new ArraySchema<string>();
}
