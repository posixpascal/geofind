import {Room} from "colyseus";
import {Lobby} from "../schema/Lobby";
import {AnimalsGame} from "../schema/AnimalsGame";

export class AnimalsGameRoom extends Room {
    onMessage(client: any): void {
    }

    public onCreate(options: any) {
        this.setState(new AnimalsGame());
    }

    onJoin(){
    }
}
