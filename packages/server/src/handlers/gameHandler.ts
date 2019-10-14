import {handle, Handler, IMessage} from "./index";
import {Client} from "colyseus";

export class GameHandler extends Handler {
    @handle("game:start")
    startGame(client: Client, payload: any) {
        this.room.state.gameRoom = payload.id;
        this.room.broadcast({type: "game:created", payload});
        this.room.setPrivate(true);
    }
}
