import {DomManager} from "./domManager";
import {Game} from "./game";

const game = Game();
const content = document.querySelector("#content");
const domManager = DomManager(content, game);

domManager.renderMenu();
domManager.subscribe('game-move', game.makeMove);