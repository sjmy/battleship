import Ship from "./Ship.js";

// be able to place ships at specific coordinates by calling the ship factory or class
// keep track of missed attacks so they can display them properly
// be able to report whether or not all of their ships have been sunk

export default function Gameboard() {
  const rows = 10;
  const cols = 10;

  let primaryBoard = [];
  let secondaryBoard = [];
  let missedAttacks = [];
  let ships = [];

  function getPrimaryBoard() {
    return primaryBoard;
  }

  function getSecondaryBoard() {
    return SecondaryBoard;
  }

  function getMissedAttacks() {
    return missedAttacks;
  }

  function getShips() {
    return ships;
  }

  // Populate pimaryBoard and secondaryBoard with null values
  function buildBoards() {
    for (let i = 0; i < rows; i++) {
      primaryBoard[i] = [];
      secondaryBoard[i] = [];

      for (let j = 0; j < cols; j++) {
        primaryBoard[i][j] = null;
        secondaryBoard[i][j] = null;
      }
    }
  }

  // Create ships and push to ships array
  function buildShips() {
    let carrier = Ship(5);
    let battleship = Ship(4);
    let destroyer = Ship(3);
    let submarine = Ship(3);
    let patrolBoat = Ship(2);

    ships.push(carrier);
    ships.push(battleship);
    ships.push(destroyer);
    ships.push(submarine);
    ships.push(patrolBoat);
  }

  // Place a given ship at the given coordinates based on orientation
  function placeShip(ship, x, y) {
    if (ship.getHorizontal()) {
      if (y + ship.getLength() <= cols) {
        for (let i = 0; i < ship.getLength(); i++) {
          primaryBoard[x][y + i] = ship;
        }
        return true;
      }
    } else {
      if (x + ship.getLength() <= rows) {
        for (let i = 0; i < ship.getLength(); i++) {
          primaryBoard[x + i][y] = ship;
        }
        return true;
      }
    }
    return false;
  }

  // takes a pair of coordinates, determines whether or not the attack hit a ship
  // then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  function receiveAttack(x, y) {
    if (primaryBoard[x][y] !== null) {
      primaryBoard[x][y].hit();
    } else {
      missedAttacks.push([x, y]);
    }
  }

  function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
  }

  // Returns true if all ships on the primary board are sunk, false if not
  function allShipsSunk() {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) {
        return false;
      }
      return true;
    }
  }

  buildBoards();
  buildShips();

  return {
    getPrimaryBoard,
    getSecondaryBoard,
    getMissedAttacks,
    getShips,
    placeShip,
    receiveAttack,
    allShipsSunk,
    generateRandomCoordinates,
  };
}
