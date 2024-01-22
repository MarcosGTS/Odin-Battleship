import { shipFactory } from "./ship";

test('Get hits from ship', () => {
    const ship = shipFactory(3);
    expect(ship.getHits()).toBe(0);
})

test('Ship get hitted', () => {
    const ship = shipFactory(3);
    ship.hit();
    expect(ship.getHits()).toBe(1);
})

test('Ship is sunked', () => {
    const ship = shipFactory(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
})

test('Ship is not sunked', () => {
    const ship = shipFactory(3);
    ship.hit();
    ship.hit(); 
    expect(ship.isSunk()).toBeFalsy();
})