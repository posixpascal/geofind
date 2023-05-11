import {Renderable} from "@gmf/renderer";

export class Game implements Renderable {
    constructor(private config: GameConfiguration){

    }
    render(){
        console.info(this.config);
    }
}