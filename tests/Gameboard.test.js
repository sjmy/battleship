import Gameboard from "../src/Gameboard.js";

describe("Gameboard functionality tests", () => {
  const rows = 10;
  const cols = 10;

  let human = Gameboard();
  let humanPrimaryBoard = human.getPrimaryBoard();
  let ships = human.getShips();
  let carrier = ships[0];
  let battleship = ships[1];
  let destroyer = ships[2];
  let submarine = ships[3];
  let patrolBoat = ships[4];

  beforeEach(() => {
    initializeBoard();
    initializeShips();
  });

  function initializeBoard() {
    human = Gameboard();
    humanPrimaryBoard = human.getPrimaryBoard();
  }

  function initializeShips() {
    ships = human.getShips();
    carrier = ships[0];
    battleship = ships[1];
    destroyer = ships[2];
    submarine = ships[3];
    patrolBoat = ships[4];
  }

  function placeShipsHorizontally() {
    human.placeShip(carrier, 0, 2);
    human.placeShip(battleship, 5, 5);
    human.placeShip(destroyer, 6, 7);
    human.placeShip(submarine, 1, 5);
    human.placeShip(patrolBoat, 6, 0);
  }

  function placeShipsVertically() {
    ships.forEach((ship) => {
      ship.changeOrientation();
    });

    human.placeShip(carrier, 0, 2);
    human.placeShip(battleship, 5, 5);
    human.placeShip(destroyer, 6, 7);
    human.placeShip(submarine, 1, 5);
    human.placeShip(patrolBoat, 6, 0);
  }

  // Works with placeShipsHorizontally
  function fourHits() {
    human.receiveAttack(5, 5);
    human.receiveAttack(5, 6);
    human.receiveAttack(5, 8);
    human.receiveAttack(1, 6);
  }

  // Works with placeShipsHorizontally
  function fourMisses() {
    human.receiveAttack(4, 5);
    human.receiveAttack(4, 6);
    human.receiveAttack(0, 9);
    human.receiveAttack(3, 3);
  }

  function sinkHorizontalShips() {
    // Carrier
    human.receiveAttack(0, 2);
    human.receiveAttack(0, 3);
    human.receiveAttack(0, 4);
    human.receiveAttack(0, 5);
    human.receiveAttack(0, 6);

    // Battleship
    fourHits(); // also includes one Submarine hit
    human.receiveAttack(5, 7);

    // Destroyer
    human.receiveAttack(6, 7);
    human.receiveAttack(6, 8);
    human.receiveAttack(6, 9);

    // Submarine
    human.receiveAttack(1, 5);
    human.receiveAttack(1, 7);

    // Patrol Boat
    human.receiveAttack(6, 0);
    human.receiveAttack(6, 1);
  }

  // Checks if arrays are the same
  function comparePositions(current, end) {
    const currentPos = current;
    const endPos = end;

    return (
      currentPos.length === endPos.length &&
      currentPos.every((num, index) => num === endPos[index])
    );
  }

  test("buildBoards: board positions all equal null after creation", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(humanPrimaryBoard[i][j]).toBe(null);
      }
    }
  });

  test("getShips: ships array contains five ships", () => {
    expect(human.getShips().length).toBe(5);
  });

  test("placeShip: place ship horizontally starting at given coordinates", () => {
    placeShipsHorizontally();

    for (let i = 0; i < carrier.getLength(); i++) {
      expect(humanPrimaryBoard[0][2 + i].getLength()).toBe(5);
    }

    for (let i = 0; i < battleship.getLength(); i++) {
      expect(humanPrimaryBoard[5][5 + i].getLength()).toBe(4);
    }

    for (let i = 0; i < destroyer.getLength(); i++) {
      expect(humanPrimaryBoard[6][7 + i].getLength()).toBe(3);
    }

    for (let i = 0; i < submarine.getLength(); i++) {
      expect(humanPrimaryBoard[1][5 + i].getLength()).toBe(3);
    }

    for (let i = 0; i < patrolBoat.getLength(); i++) {
      expect(humanPrimaryBoard[6][0 + i].getLength()).toBe(2);
    }
  });

  test("placeShip: place ship vertically starting at given coordinates", () => {
    placeShipsVertically();

    for (let i = 0; i < carrier.getLength(); i++) {
      expect(humanPrimaryBoard[0 + i][2].getLength()).toBe(5);
    }

    for (let i = 0; i < battleship.getLength(); i++) {
      expect(humanPrimaryBoard[5 + i][5].getLength()).toBe(4);
    }

    for (let i = 0; i < destroyer.getLength(); i++) {
      expect(humanPrimaryBoard[6 + i][7].getLength()).toBe(3);
    }

    for (let i = 0; i < submarine.getLength(); i++) {
      expect(humanPrimaryBoard[1 + i][5].getLength()).toBe(3);
    }

    for (let i = 0; i < patrolBoat.getLength(); i++) {
      expect(humanPrimaryBoard[6 + i][0].getLength()).toBe(2);
    }
  });

  test("receiveAttack: attack is a hit", () => {
    placeShipsHorizontally();
    fourHits();

    expect(battleship.getHits()).toBe(3);
    expect(submarine.getHits()).toBe(1);
  });

  test("receiveAttack: attack is a miss", () => {
    placeShipsHorizontally();
    fourHits();
    fourMisses();

    expect(human.getMissedAttacksAgainst().length).toBe(4);
    expect(comparePositions(human.getMissedAttacksAgainst()[0], [4, 5])).toBe(
      true,
    );
  });

  test("allShipsSunk: all ships not sunk", () => {
    placeShipsHorizontally();
    fourHits();
    fourMisses();

    expect(human.allShipsSunk()).toBe(false);
  });

  test("allShipsSunk: all ships sunk", () => {
    placeShipsHorizontally();
    fourHits();
    expect(human.allShipsSunk()).toBe(false);

    sinkHorizontalShips();
    expect(human.allShipsSunk()).toBe(true);
  });

  // test("getRandomCoordinates: generate random numbers between 0 and 9 inclusive", () => {
  //   const [x, y] = human.getRandomCoordinates();

  //   expect(x).toBeGreaterThanOrEqual(0);
  //   expect(x).toBeLessThanOrEqual(9);
  //   expect(y).toBeGreaterThanOrEqual(0);
  //   expect(y).toBeLessThanOrEqual(9);
  // });

  // Attempt to place ships out of bounds
  // Assumes a negative coordinate will never be chosen so only tests right and bottom edges
  test("placeShip: ships placed out of bounds will return false", () => {
    // Horizontal
    expect(human.placeShip(carrier, 0, 6)).toBe(false);
    expect(human.placeShip(battleship, 5, 9)).toBe(false);

    // Vertical
    submarine.changeOrientation();
    patrolBoat.changeOrientation();
    expect(human.placeShip(submarine, 8, 5)).toBe(false);
    expect(human.placeShip(patrolBoat, 9, 0)).toBe(false);
  });

  test("placeShip: ships placed that collide with other ships return false", () => {
    // Horizontal
    human.placeShip(carrier, 0, 5);
    expect(human.placeShip(battleship, 0, 2)).toBe(false);

    // Vertical
    submarine.changeOrientation();
    patrolBoat.changeOrientation();
    human.placeShip(submarine, 7, 5);
    expect(human.placeShip(patrolBoat, 8, 5)).toBe(false);
  });

  test("initializeGameboard: boards, ships array, misses array are all reset", () => {
    placeShipsHorizontally();
    fourHits();
    fourMisses();
    human.initializeGameboard();

    // Check that all squares are null
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(humanPrimaryBoard[i][j]).toBe(null);
      }
    }

    // Check the ships array length is still 5 and the battleship hits are back to 0
    let shipsArray = human.getShips();
    expect(shipsArray.length).toBe(5);
    expect(shipsArray[1].getHits()).toBe(0);
  });

  test("randomShipPlacement: ships are randomly placed. total number of !null squares is correct.", () => {
    let count = 0;
    let shipSquares = 0;

    ships.forEach((ship) => {
      shipSquares += ship.getLength();
    });

    human.randomShipPlacement();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (humanPrimaryBoard[i][j] !== null) {
          count += 1;
        }
      }
    }

    expect(count).toEqual(shipSquares);
  });
});
