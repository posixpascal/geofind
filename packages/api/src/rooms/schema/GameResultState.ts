import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";

export class GameResult extends Schema {
  @type(["string"]) winnerIds = new ArraySchema<string>();
}
