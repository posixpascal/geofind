import {Game} from "@gmf/core";
import { LibreGLRenderer } from "@gmf/renderer";

const game = new Game({
   renderer: new LibreGLRenderer(),
   questions: [

   ]
});

document.addEventListener('DOMContentLoaded', () => {
   game.render("#app");
});