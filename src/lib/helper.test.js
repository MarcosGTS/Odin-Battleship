import { contains, cartesianDistace } from "./helper";

test('Same axes distance ', () => {
    expect(cartesianDistace({x:0, y:0}, {x: 0, y: 3})).toBe(3);
})

test('Diagonal distance', () => {
    expect(cartesianDistace({x:0, y:0}, {x:3, y:4})).toBe(5);
})

test('Decimal numbers', () => {
    expect(cartesianDistace({x: 1, y: 1}, {x:2, y:2})).toBe(2**(1/2));
})

test('Contains point', () => {
    expect(contains(0, 10, {x: 0, y: 2})).toBeTruthy();
})