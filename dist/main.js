/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadPage: () => (/* binding */ loadPage),
/* harmony export */   renderMenu: () => (/* binding */ renderMenu)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


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
    const game = (0,_game__WEBPACK_IMPORTED_MODULE_0__.Game)();

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



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




const GAME_BOARD1 = [
    {size: 3, x: 1, y: 2, horizontal: true},
    {size: 1, x: 4, y: 6, horizontal: true},
    {size: 2, x: 0, y: 2, horizontal: false},
]

const Game = () => {
    const user = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('Marcos', GAME_BOARD1);
    const ai = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('Computer', GAME_BOARD1);
    const queue = [user, ai];
    let currentPlayer = 0;
    let gameover = false;

    user.createBoard(_gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoardFactory, _ship__WEBPACK_IMPORTED_MODULE_0__.shipFactory);
    ai.createBoard(_gameBoard__WEBPACK_IMPORTED_MODULE_1__.GameBoardFactory, _ship__WEBPACK_IMPORTED_MODULE_0__.shipFactory);

    function makeMove(move)  {
        if (gameover) return;

        const player = queue[currentPlayer];
        const hit = player.makeMove(move);

        if (hit == false) {
            currentPlayer = (currentPlayer + 1) % queue.length;
        } 
        
        gameover = player.getBoard().isGameOver();
    }

    function getPlayers() {
        return [user, ai];
    }

    return {
        makeMove,
        getPlayers,
    }   
}



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shipFactory: () => (/* binding */ shipFactory)
/* harmony export */ });
const shipFactory = (size) => {
    let hits = 0;

    function getSize() {
        return size;
    }

    function getHits() {
        return hits;
    }

    function hit() {
        hits += 1;
    }

    function isSunk() {
        return hits >= size;
    }

    return {
        hit,
        isSunk,
        getHits,
        getSize,
    }
}



/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameBoardFactory: () => (/* binding */ GameBoardFactory)
/* harmony export */ });
/* harmony import */ var _lib_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);


const GameBoardFactory = () => {
    const ships = [];
    const attacks = [];
    
    function getShips() {
        return [...ships];
    }

    function createShip (ship, {x, y, horizontal}) {
        const positions = [];
        
        for (let i = 0, size = ship.getSize(); i < size; i++) {
            if (horizontal) {
                positions.push({y, x: x + i});
            } else {
                positions.push({x, y: y + i});
            }
        }

        return {
            ...ship,
            positions
        }
    }

    function isValidShip(ship) {
        return ship.positions.every(
            pos => isPlaceValid(pos)
        );
    }

    function isPlaceValid(place) {
        // Is inside boundaries
        if (!(0,_lib_helper__WEBPACK_IMPORTED_MODULE_0__.contains)(0, 10, place)) return false;

        // Distace > 2**(1/2)
        for (const ship of ships) {
            const result = ship.positions
                .some((pos) => (0,_lib_helper__WEBPACK_IMPORTED_MODULE_0__.cartesianDistace)(place, pos) <= (2)**(1/2));
            if (result) return false;
        }
        
        return true;
    }

    function placeShip(ship, {x, y, horizontal}) {
        const newShip = createShip(ship, {x, y, horizontal})

        if (isValidShip(newShip)) {
            ships.push(newShip);
            return true;
        }

        return false;
    }

    function receiveAttack(attackPos) {
        const hitedShip = ships.find((ship) => shipWasHited(ship, attackPos));
        attacks.push(attackPos)

        if (hitedShip) {
            hitedShip.hit()
            return true;
        }

        return false;
    }

    function isGameOver() {
        return ships.every((ship) => ship.isSunk());
    }

    function shipWasHited(ship, {x, y}) {
        return ship.positions.some((pos) => pos.x == x && pos.y == y);
    }

    return {
        getShips,
        placeShip,
        receiveAttack,
        isGameOver,
        createShip
    }
}



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cartesianDistace: () => (/* binding */ cartesianDistace),
/* harmony export */   contains: () => (/* binding */ contains)
/* harmony export */ });
function cartesianDistace(p1, p2) {
    return ((p1.x - p2.x)**2 + (p1.y - p2.y)**2)**(1/2);
}

function contains(min, max, point) {
    return (min <= point.x && point.x <= max 
        && min <= point.y && point.y <= max)
}



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
const Player = (name, enemyBoard) => {
    let gameboard = null;

    function createBoard(gameboardFactory, shipFactory) {
        gameboard = gameboardFactory();

        for(const ship of enemyBoard) {
            const {size, x, y, horizontal} = ship;
            const newShip = shipFactory(size);

            gameboard.placeShip(newShip, {x, y, horizontal})
        }

        return gameboard;
    }

    function makeMove(move) {
        return gameboard.recieveAttack(move);
    }

    function getName() {
        return name;
    }

    function getBoard() {
        return gameboard;
    }

    return {
        getName,
        getBoard,
        createBoard,
        makeMove,
    }
}



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


(0,_domManager__WEBPACK_IMPORTED_MODULE_0__.loadPage)(_domManager__WEBPACK_IMPORTED_MODULE_0__.renderMenu)
})();

/******/ })()
;