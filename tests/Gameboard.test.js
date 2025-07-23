import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

describe("Gameboard functionality tests", () => {
  let human = Gameboard();
  let humanPrimaryBoard = human.getPrimaryBoard();
  let ships = human.getShips();
  let carrier = ships[0];
  let battleship = ships[1];
  let destroyer = ships[2];
  let submarine = ships[3];
  let patrolBoat = ships[4];

  test("board positions all equal null after creation", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(humanPrimaryBoard[i][j]).toBe(null);
      }
    }
  });

  test("getShips contains five ships", () => {
    expect(human.getShips().length).toBe(5);
  });

  test("primaryBoard: place ship horizontally starting at given coordinates", () => {
    human.placeShip(carrier, 0, 2);
    human.placeShip(battleship, 5, 5);
    human.placeShip(destroyer, 8, 7);
    human.placeShip(submarine, 1, 5);
    human.placeShip(patrolBoat, 6, 0);

    for (let i = 0; i < carrier.getLength(); i++) {
      expect(humanPrimaryBoard[0][2 + i].getLength()).toBe(5);
    }

    for (let i = 0; i < battleship.getLength(); i++) {
      expect(humanPrimaryBoard[5][5 + i].getLength()).toBe(4);
    }

    for (let i = 0; i < destroyer.getLength(); i++) {
      expect(humanPrimaryBoard[8][7 + i].getLength()).toBe(3);
    }

    for (let i = 0; i < submarine.getLength(); i++) {
      expect(humanPrimaryBoard[1][5 + i].getLength()).toBe(3);
    }

    for (let i = 0; i < patrolBoat.getLength(); i++) {
      expect(humanPrimaryBoard[6][0 + i].getLength()).toBe(2);
    }
  });

  test("attack is a hit", () => {
    human.receiveAttack(5, 5);
    human.receiveAttack(5, 6);
    human.receiveAttack(5, 8);
    human.receiveAttack(1, 6);

    expect(battleship.getHits()).toBe(3);
    expect(submarine.getHits()).toBe(1);
  });

  test("attack is a miss", () => {
    human.receiveAttack(4, 5);
    human.receiveAttack(4, 6);
    human.receiveAttack(5, 8);
    human.receiveAttack(0, 9);

    expect(human.getMissedAttacks().length).toBe(3);
  });

  test("all ships not sunk", () => {
    expect(human.allShipsSunk()).toBe(false);
  });

  test("all ships sunk", () => {
    for (let i = 0; i < ships.length; i++) {
      let current = ships[i];

      while (!current.isSunk()) {
        current.hit();
      }
    }

    expect(human.allShipsSunk()).toBe(true);
  });
});
