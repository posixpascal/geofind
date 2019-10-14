import {Room} from "colyseus";
import {AnimalsGame} from "../schema/AnimalsGame";
import {BuildingsGame} from "../schema/BuildingsGame";

export class BuildingsGameRoom extends Room {
    onMessage(client: any): void {
    }

    public onCreate(options: any) {
        this.setState(new BuildingsGame());
    }

    onJoin(){

    }
}
