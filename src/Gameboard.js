import Ship from "./Ship.js";

// be able to place ships at specific coordinates by calling the ship factory or class
// keep track of missed attacks so they can display them properly
// be able to report whether or not all of their ships have been sunk

export default function Gameboard() {
  const rows = 10;
  const cols = 10;

  let primaryBoard = [];
  let secondaryBoard = [];
  let missedAttacksAgainst = [];
  let ships = [];
  // Log hits that have not sunk a ship. Used for smarter CPU attacks.
  let currentShipHitArray = [];

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

  function getMissedAttacksAgainst() {
    return missedAttacksAgainst;
  }

  function getShips() {
    return ships;
  }

  function getCurrentShipHitArray() {
    return currentShipHitArray;
  }

  function resetCurrentShipHitArray() {
    currentShipHitArray = [];
  }

  function initializeGameboard() {
    buildBoards();
    ships = [];
    buildShips();
    missedAttacksAgainst = [];
    currentShipHitArray = [];
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

    carrier.setShipName("Carrier");
    battleship.setShipName("Battleship");
    destroyer.setShipName("Destroyer");
    submarine.setShipName("Submarine");
    patrolBoat.setShipName("Patrol Boat");

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
        ship.setStartPosition(x, y);
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
        ship.setStartPosition(x, y);
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

  // Returns random coordinates after delay
  // TODO: if hit try adjacent squares until ship is sunk
  function cpuTurn(missedAttacks, humanShips) {
    let [x, y] = getRandomCoordinates();
    let totalHits = [];

    for (let i = 0; i < humanShips.length; i++) {
      const hitsArray = humanShips[i].getHitsArray();
      for (let j = 0; j < hitsArray.length; j++) {
        totalHits.push(hitsArray[j]);
      }
    }

    // If there is a ship that has hits but is not sunk, attack adjacent squares
    if (currentShipHitArray.length !== 0) {
      return new Promise((resolve) => {
        setTimeout(
          () => resolve(cpuSmartAttack(missedAttacks, humanShips, totalHits)),
          getRandomDelay(),
        );
      });
    }

    // Check if the square has been chosen before
    while (checkForMiss(missedAttacks, x, y) || checkForHit(totalHits, x, y)) {
      [x, y] = getRandomCoordinates();
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve([x, y]), getRandomDelay());
    });
  }

  // Use currentShipHitArray to find the next logical square. Returns [x, y]
  // If there is only one hit, choose x + 1 or x - 1 and y
  // If there is more than one hit, check if x coords are +1 or -1
  //  If true, choose the next x in sequence and y
  //  If false, choose x and the next y in sequence
  function cpuSmartAttack(missedAttacks, humanShips, totalHits) {
    let x = currentShipHitArray[0][0];
    let y = currentShipHitArray[0][1];

    if (currentShipHitArray.length === 1) {
      [x, y] = getCloseCoordinates(x, y);

      while (
        checkForMiss(missedAttacks, x, y) ||
        checkForHit(totalHits, x, y)
      ) {
        [x, y] = getCloseCoordinates(x, y);
      }
    } else {
      let xHits = [];
      let yHits = [];

      for (let i = 1; i < currentShipHitArray.length; i++) {
        xHits.push(currentShipHitArray[i][0]);
        yHits.push(currentShipHitArray[i][1]);
      }

      xHits.sort();
      yHits.sort();

      if (xHits[xHits.length - 1] - xHits[0] === xHits.length - 1) {
        // x coords are in sequence, choose another x

        // If the first hit is row 0, choose the last row hit + 1
        if (xHits[0] === 0) {
          x = xHits[xHits.length - 1] + 1;
          // If the last hit is row 9, choose the first row hit - 1
        } else if (xHits[xHits.length - 1] === 9) {
          x = xHits[0] - 1;
        } else if (
          checkForMiss(missedAttacks, x + 1, y) ||
          checkForHit(totalHits, x + 1, y)
        ) {
          x -= 1;
        }
        // y coords must be in sequence, choose another y

        // If the first hit is col 0, choose the last col hit + 1
      } else if (yHits[0] === 0) {
        y = yHits[yHits.length - 1] + 1;
        // If the last hit is col 9, choose the first col hit - 1
      } else if (yHits[yHits.length - 1] === 9) {
        y = yHits[0] - 1;
      } else if (
        checkForMiss(missedAttacks, y + 1, y) ||
        checkForHit(totalHits, y + 1, y)
      ) {
        y -= 1;
      }
    }

    return [x, y];
  }

  // Takes a pair of coordinates, determines whether or not the attack hit a ship
  // Then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  // Return true if it's a hit, false if it's a miss
  function receiveAttack(x, y) {
    if (primaryBoard[x][y] !== null) {
      const currentShip = primaryBoard[x][y];
      currentShip.hit([x, y]);
      return true;
    } else {
      missedAttacksAgainst.push([x, y]);
      return false;
    }
  }

  // Returns true if all ships on the primary board are sunk, false if not
  function allShipsSunk() {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) {
        return false;
      }
    }
    return true;
  }

  // Helper functions below
  function getRandomBoolean() {
    return Math.random() >= 0.5;
  }

  function getRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x, y];
  }

  // Returns number between 500 and 2000, used for delay in cpuTurn
  function getRandomDelay() {
    return Math.ceil(Math.random() * 3000) / 2;
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

  // Checks for matching position in given array using given coordinates
  function checkForHit(hitsArray, row, col) {
    for (let i = 0; i < hitsArray.length; i++) {
      if (comparePositions(hitsArray[i], [row, col])) {
        return true;
      }
    }
    return false;
  }

  // Checks for matching position in given array using given coordinates
  function checkForMiss(missedAttacksAgainst, row, col) {
    for (let i = 0; i < missedAttacksAgainst.length; i++) {
      if (comparePositions(missedAttacksAgainst[i], [row, col])) {
        return true;
      }
    }
    return false;
  }

  function getCloseCoordinates(x, y) {
    let origX = x;
    let origY = y;

    if (getRandomBoolean()) {
      if (getRandomBoolean()) {
        x += 1;
      } else {
        x -= 1;
      }
    } else {
      if (getRandomBoolean()) {
        y += 1;
      } else {
        y -= 1;
      }
    }

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      getCloseCoordinates(origX, origY);
    }

    return [x, y];
  }

  initializeGameboard();

  return {
    getRows,
    getCols,
    getPrimaryBoard,
    getSecondaryBoard,
    getMissedAttacksAgainst,
    getShips,
    getCurrentShipHitArray,
    resetCurrentShipHitArray,
    placeShip,
    receiveAttack,
    allShipsSunk,
    cpuTurn,
    initializeGameboard,
    randomShipPlacement,
  };
}
