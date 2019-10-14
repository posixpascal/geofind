import { Schema, ArraySchema, MapSchema, type } from "@colyseus/schema";
import {Player} from "./Player";
import {ChatMessage} from "./ChatMessage";

export class BuildingsGame extends Schema {
    @type([ChatMessage])
    messages = new ArraySchema<ChatMessage>();

    @type({map: Player})
    players = new MapSchema<Player>();
}
