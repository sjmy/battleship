import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

describe("Gameboard functionality tests", () => {
  let human = Gameboard();
  let humanPrimaryBoard = human.getPrimaryBoard();
  let carrier = Ship(5);
  let battleship = Ship(4);
  let destroyer = Ship(3);
  let submarine = Ship(3);
  let patrolBoat = Ship(2);

  test("board positions all equal null after creation", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(humanPrimaryBoard[i][j]).toBe(null);
      }
    }
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
  })

  test("attack is a miss", () => {
    human.receiveAttack(4, 5);
    human.receiveAttack(4, 6);
    human.receiveAttack(5, 8);
    human.receiveAttack(0, 9);

    expect(human.getMissedAttacks().length).toBe(3)
  })
});
