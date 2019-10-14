import { Schema, MapSchema, type } from "@colyseus/schema";
import {Player} from "./Player";

export const ChatMessageTypes = {
    USER_MESSAGE: 1,
    STATUS_MESSAGE: 2,
    SYSTEM_MESSAGE: 3
};

export class ChatMessage extends Schema {
    @type("string")
    id: string;

    @type("string")
    message: string;

    @type("number")
    createdAt: number;

    @type(Player)
    player: Player;

    @type("number")
    type: number;
}
