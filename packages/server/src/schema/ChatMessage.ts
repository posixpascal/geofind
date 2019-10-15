import { MapSchema, Schema, type } from "@colyseus/schema";
import {Player} from "./Player";

export const ChatMessageTypes = {
    USER_MESSAGE: 1,
    STATUS_MESSAGE: 2,
    SYSTEM_MESSAGE: 3,
};

export class ChatMessage extends Schema {
    @type("string")
    public id: string;

    @type("string")
    public message: string;

    @type("number")
    public createdAt: number;

    @type(Player)
    public player: Player;

    @type("number")
    public type: number;
}
