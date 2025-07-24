import Ship from "../src/Ship.js";

// const ship3 = Ship(3);
// const ship4 = Ship(4);
// const ship5 = Ship(5);

describe("ship functionality tests", () => {
  let ship2 = Ship(2);
  let ship3 = Ship(3);

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
    ship3.hit();
    ship3.hit();

    expect(ship3.getHits()).toBe(2);
    expect(ship3.isSunk()).toBe(false);
  });

  test("ship is created horizontal", () => {
    expect(ship2.getHorizontal()).toBe(true);
  });

  test("change ship orientation", () => {
    ship2.changeOrientation();

    expect(ship2.getHorizontal()).toBe(false);
  });
});
