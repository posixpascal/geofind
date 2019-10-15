import {Client} from "colyseus";
import {handle, Handler} from "./index";

export class GameHandler extends Handler {
    @handle("game:start")
    public startGame(client: Client, payload: any) {
        this.room.state.gameRoom = payload.id;
        this.room.broadcast({type: "game:created", payload});
        this.room.setPrivate(true);
    }
}
