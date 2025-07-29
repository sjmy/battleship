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

  function getRows() {
    return rows;
  }

  function getCols() {
    return cols;
  }

  function getPrimaryBoard() {
    return primaryBoard;
  }

  function getSecondaryBoard() {
    return secondaryBoard;
  }

  function getMissedAttacks() {
    return missedAttacks;
  }

  function getShips() {
    return ships;
  }

  function initializeGameboard() {
    buildBoards();
    ships = [];
    buildShips();
    missedAttacks = [];
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
    // Horizontal placement
    if (ship.getHorizontal()) {
      // If the ship will fit
      if (y + ship.getLength() <= cols) {
        // Check for other ships, return false if one is found
        for (let i = 0; i < ship.getLength(); i++) {
          if (primaryBoard[x][y + i] !== null) {
            return false;
          }
        }
        // Passed the checks, place the ship
        for (let i = 0; i < ship.getLength(); i++) {
          primaryBoard[x][y + i] = ship;
        }
        return true;
      }

      // Vertical placement
    } else {
      // If the ship will fit
      if (x + ship.getLength() <= rows) {
        // Check for other ships, return false if one is found
        for (let i = 0; i < ship.getLength(); i++) {
          if (primaryBoard[x + i][y] !== null) {
            return false;
          }
        }
        // Passed the checks, place the ship
        for (let i = 0; i < ship.getLength(); i++) {
          primaryBoard[x + i][y] = ship;
        }
        return true;
      }
    }
    return false;
  }

  // Place all ships in random positions
  function randomShipPlacement() {
    initializeGameboard();

    ships.forEach((ship) => {
      let x,
        y = getRandomCoordinates();
      ship.setHorizontal(getRandomBoolean());

      // Keeps trying to place ship with random coordinates and orientation until successful
      while (!placeShip(ship, x, y)) {
        [x, y] = getRandomCoordinates();
        ship.changeOrientation();
      }
    });
  }

  function getRandomBoolean() {
    return Math.random() >= 0.5;
  }

  function getRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
  }

  // Returns random coordinates after delay
  // TODO: random delay, check for previous misses/hits, if hit try adjacent squares until ship is sunk
  function cpuTurn() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getRandomCoordinates()), 2000);
    });
  }

  // takes a pair of coordinates, determines whether or not the attack hit a ship
  // then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  function receiveAttack(x, y) {
    if (primaryBoard[x][y] !== null) {
      primaryBoard[x][y].hit([x, y]);
    } else {
      missedAttacks.push([x, y]);
    }
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

  initializeGameboard();

  return {
    getRows,
    getCols,
    getPrimaryBoard,
    getSecondaryBoard,
    getMissedAttacks,
    getShips,
    placeShip,
    receiveAttack,
    allShipsSunk,
    cpuTurn,
    initializeGameboard,
    randomShipPlacement,
  };
}
