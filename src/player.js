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

    function makeMove({position}) {
        return gameboard.receiveAttack(position);
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

export {Player};