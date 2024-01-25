import { Game } from "./game";

const content = document.querySelector("#content");

function loadPage(pageCreator) {
    content.innerHTML = '';
    content.appendChild(pageCreator());
}

function renderMenu() {
    const menuHtml = document.createElement("div");
    menuHtml.innerHTML = `
        <h1>menu</h1>
        <button id="to-game">game</button>
    `
    menuHtml.querySelector('#to-game').addEventListener("click", () => loadPage(renderGame));

    return menuHtml;
}

function renderOptions() {
    const optionsHtml = document.createElement("div");
    optionsHtml.innerHTML = `
        <h1>Options</h1>
        <button id="to-game">game</button>
    `;

    optionsHtml.querySelector("#to-game").addEventListener("click", () => loadPage(renderGame));
    return optionsHtml; 
}

function renderGame() {
    const gameHtml = document.createElement("div");
    const game = Game();

    gameHtml.innerHTML = `
        <h1>Game</h1>
        <div>
            <canvas id="board1"></canvas>
        </div>
        <button id="to-menu">Menu</button>
        <button id="to-options">Options</button>
    `

    const board = gameHtml.querySelector("#board1");
    renderBoard(board, game.getPlayers()[0]);

    gameHtml.querySelector("#to-menu").addEventListener("click", () => loadPage(renderMenu));
    gameHtml.querySelector("#to-options").addEventListener("click", () => loadPage(renderOptions));

    return gameHtml;
}

function renderBoard(canvas, player) {
   const ctx = canvas.getContext("2d");
   const WIDTH = canvas.width
   const HEIGHT = canvas.height

   console.log(WIDTH, HEIGHT);
}

export {loadPage, renderMenu}