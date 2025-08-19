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

  test("getLength: ship length 2", () => {
    expect(ship2.getLength()).toBe(2);
  });

  test("hit, isSunk: ship is sunk if hits > length", () => {
    ship2.hit();
    ship2.hit();

    expect(ship2.isSunk()).toBe(true);
  });

  test("hit, isSunk: ship is not sunk if hits < length", () => {
    ship3.hit();
    ship3.hit();

    expect(ship3.getHits()).toBe(2);
    expect(ship3.isSunk()).toBe(false);
  });

  test("horizontal: ship is created horizontal", () => {
    expect(ship2.getHorizontal()).toBe(true);
  });

  test("changeOrientation: change ship orientation", () => {
    ship2.changeOrientation();

    expect(ship2.getHorizontal()).toBe(false);
  });

  test("setHorizontal: orientation set based on parameter", () => {
    ship2.setHorizontal(false);
    expect(ship2.getHorizontal()).toBe(false);

    ship2.setHorizontal(true);
    expect(ship2.getHorizontal()).toBe(true);
  });

  test("get/setStartPosition: returns [x, y] when called with x, y parameters", () => {
    ship2.setStartPosition(4, 8);

    const startPosition = ship2.getStartPosition();

    expect(startPosition[0]).toBe(4);
    expect(startPosition[1]).toBe(8);
  });

  test("getHorizontal() returns true for horizontal", () => {
    ship2.setShipCoordinates(4, 8, true);
    expect(ship2.getHorizontal()).toBe(true);
  });

  test("getHorizontal() returns false for vertical", () => {
    ship2.setShipCoordinates(4, 8, false);
    expect(ship2.getHorizontal()).toBe(false);
  });

  test("get/setShipCoordinates horizontal: length of array and array values are correct", () => {
    ship2.setShipCoordinates(4, 8, true);

    const shipCoordinates = ship2.getShipCoordinates();

    expect(shipCoordinates.length).toBe(2);
    expect(shipCoordinates[0][0]).toBe(4);
    expect(shipCoordinates[0][1]).toBe(8);
    expect(shipCoordinates[1][0]).toBe(4);
    expect(shipCoordinates[1][1]).toBe(9);
  });

  test("get/setShipCoordinates vertical: length of array and array values are correct", () => {
    ship2.setShipCoordinates(4, 8, false);

    const shipCoordinates = ship2.getShipCoordinates();

    expect(shipCoordinates.length).toBe(2);
    expect(shipCoordinates[0][0]).toBe(4);
    expect(shipCoordinates[0][1]).toBe(8);
    expect(shipCoordinates[1][0]).toBe(5);
    expect(shipCoordinates[1][1]).toBe(8);
  });

  test("setLegalChoices horizontal: each ship square returns adjacent non-ship squares", () => {
    ship2.setShipCoordinates(4, 8, true);

    const legalChoices = ship2.getLegalChoices();

    expect(legalChoices.get(JSON.stringify([4, 8]))).toEqual([
      [3, 8],
      [5, 8],
      [4, 7],
    ]);
  });

  test("setLegalChoices vertical: each ship square returns adjacent non-ship squares", () => {
    ship2.setShipCoordinates(4, 8, false);

    const legalChoices = ship2.getLegalChoices();

    expect(legalChoices.get(JSON.stringify([4, 8]))).toEqual([
      [3, 8],
      [4, 9],
      [4, 7],
    ]);
  });

  test("get/setShipName: sets and returns the string", () => {
    ship2.setShipName("Helicopter");

    expect(ship2.getShipName()).toBe("Helicopter");
  });
});
