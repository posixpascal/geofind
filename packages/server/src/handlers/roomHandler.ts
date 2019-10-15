import {Client} from "colyseus";
import {handle, Handler} from "./index";

export class RoomHandler extends Handler {
    @handle("room:insultMode:set")
    public toggleInsultMode(client: Client, message: any) {
        this.room.state.insultMode = !this.room.state.insultMode;
    }

    @handle("room:name:set")
    public setName(client: Client, message: any) {
        this.room.state.name = message;
    }

    @handle("room:update")
    public update(client: Client, message: any) {
        if ("name" in message) {
            this.room.state.name = message.name;
        }

        if ("gameMode" in message) {
            this.room.state.gameMode = message.gameMode;
        }

        if ("insultMode" in message) {
            this.room.state.insultMode = message.insultMode;
        }

        if ("victoryScore" in message) {
            this.room.state.victoryScore = parseInt(message.victoryScore, 10);
        }
        if ("roundTime" in message) {
            this.room.state.roundTime = parseInt(message.roundTime, 10);
        }
        if ("maxRounds" in message) {
            this.room.state.maxRounds = parseInt(message.maxRounds, 10);
        }
    }
}
