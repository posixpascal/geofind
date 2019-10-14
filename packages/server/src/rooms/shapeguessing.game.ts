import {Room} from "colyseus";
import {AnimalsGame} from "../schema/AnimalsGame";
import {ShapeGuessingGame} from "../schema/ShapeGuessingGame";

export class ShapeGuessingGameRoom extends Room {
    onMessage(client: any): void {
    }

    public onCreate(options: any) {
        this.setState(new ShapeGuessingGame());
    }

    onJoin(){

    }
}
