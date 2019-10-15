import {ArraySchema, MapSchema, Schema, type} from "@colyseus/schema";
import {ChatMessage} from "./ChatMessage";
import {Player} from "./Player";

export class ScoreBoard extends Schema {
    @type(Player)
    public player: Player;

    @type("number")
    public score: number;
}
