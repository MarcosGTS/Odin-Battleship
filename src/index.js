import {DomManager} from "./domManager";
import {Game} from "./game";

const content = document.querySelector("#content");
const domManager = DomManager(content, Game);

domManager.renderMenu();