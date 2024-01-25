import { GameBoardFactory } from "./gameBoard"

test('Place ship (1)', () => {
    const gameBoard = GameBoardFactory()
    const ship = {getSize: () => 3}

    expect(gameBoard.placeShip(ship, {x: 1, y: 1, horizontal: true})).toBeTruthy();
})

test('Place ship (2) - Outside Bounderies', () => {
    const gameBoard = GameBoardFactory()
    const ship = {getSize: () => 3}

    expect(gameBoard.placeShip(ship, {x: 9, y: 1, horizontal: true})).toBeFalsy();
})

test('Place ship (3) - Adjacent Placement', () => {
    const gameBoard = GameBoardFactory()
    const ship = {getSize: () => 3}

    expect(gameBoard.placeShip(ship, {x: 1, y: 1, horizontal: true})).toBeTruthy();
    expect(gameBoard.placeShip(ship, {x: 1, y: 2, horizontal: true})).toBeFalsy();
})

test('Place ship (4) - Crossed Placement', () => {
    const gameBoard = GameBoardFactory()
    const ship = {getSize: () => 3}

    expect(gameBoard.placeShip(ship, {x: 1, y: 3, horizontal: true})).toBeTruthy();
    expect(gameBoard.placeShip(ship, {x: 3, y: 1, horizontal: false})).toBeFalsy();
})

test('Receive attack', () => {
    const gameBoard = GameBoardFactory();
    const ship = {
        hit: jest.fn(),
        getSize: () => 3, 
    }

    gameBoard.placeShip(ship, {x: 1, y: 2, h: true});

    expect(gameBoard.receiveAttack({x: 1, y: 2})).toBeTruthy();
    expect(ship.hit).toHaveBeenCalled();
});

test('Miss attack', () => {
    const gameBoard = GameBoardFactory();
    const ship = {
        hit: jest.fn(),
        getSize: () => 3,
    }

    gameBoard.placeShip(ship, {x: 1, y: 2, horizontal: true});

    expect(gameBoard.receiveAttack({x: 1, y: 3})).toBeFalsy();
    expect(ship.hit).not.toHaveBeenCalled();
});

test ('Is game over', () => {
    const gameBoard = GameBoardFactory();
    const ship = {
        isSunk: () => true,
        getSize: () => 3,
    }

    gameBoard.placeShip(ship, {x: 1, y: 2, horizontal: false})

    expect(gameBoard.isGameOver()).toBeTruthy();
})