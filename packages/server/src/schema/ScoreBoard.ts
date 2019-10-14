import {Schema, ArraySchema, MapSchema, type} from "@colyseus/schema";
import {Player} from "./Player";
import {ChatMessage} from "./ChatMessage";

export class ScoreBoard extends Schema {
    @type(Player)
    player: Player;

    @type("number")
    score: number
}
