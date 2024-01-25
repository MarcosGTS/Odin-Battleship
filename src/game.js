import { shipFactory } from "./ship";
import { GameBoardFactory } from "./gameBoard";
import { Player } from "./player";

const GAME_BOARD1 = [
    {size: 3, x: 1, y: 2, horizontal: true},
    {size: 1, x: 4, y: 6, horizontal: true},
    {size: 2, x: 0, y: 2, horizontal: false},
]

const Game = () => {
    const user = Player('Marcos', GAME_BOARD1);
    const ai = Player('Computer', GAME_BOARD1);
    const queue = [user, ai];
    let currentPlayer = 0;
    let gameover = false;

    user.createBoard(GameBoardFactory, shipFactory);
    ai.createBoard(GameBoardFactory, shipFactory);

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

export {Game}