import Ship from "../src/Ship.js";

// const ship3 = Ship(3);
// const ship4 = Ship(4);
// const ship5 = Ship(5);

describe("ship functionality tests", () => {
  let ship2 = Ship(2);

  afterEach(() => {
    ship2 = Ship(2);
  });

  test("ship length 2", () => {
    expect(ship2.getLength()).toBe(2);
  });

  test("ship is sunk if hits > length", () => {
    ship2.hit();
    ship2.hit();

    expect(ship2.isSunk()).toBe(true);
  });

  test("ship is not sunk if hits < length", () => {
    ship2.hit();

    expect(ship2.isSunk()).toBe(false);
  });
});
