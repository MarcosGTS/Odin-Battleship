import { cartesianDistace, contains } from "./lib/helper";

const GameBoardFactory = () => {
    const ships = [];
    const attacks = [];
    
    function getShips() {
        return [...ships];
    }

    function getAttacks() {

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
        if (!contains(0, 10, place)) return false;

        // Distace > 2**(1/2)
        for (const ship of ships) {
            const result = ship.positions
                .some((pos) => cartesianDistace(place, pos) <= (2)**(1/2));
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

        if (hitedShip) {
            hitedShip.hit()
            attacks.push({...attackPos, hit: true});
            return true;
        }

        attacks.push(...{attackPos, hit: false});
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
        getAttacks, 
        placeShip,
        receiveAttack,
        isGameOver,
        createShip
    }
}

export {GameBoardFactory};