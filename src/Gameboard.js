import Ship from "./Ship.js";

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

  // Removes all ship's coordinates from currentShipHitArray. Called when a ship is sunk.
  function updateCurrentShipHitArray(ship) {
    currentShipHitArray = get2DArrayDifference(
      currentShipHitArray,
      ship.getShipCoordinates(),
    );
  }

  function initializeGameboard() {
    buildBoards();
    ships = [];
    buildShips();
    missedAttacksAgainst = [];
    currentShipHitArray = [];
  }

  // Populate primaryBoard and secondaryBoard with null values
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

        ship.setStartPosition(x, y);
        ship.setShipCoordinates(x, y, ship.getHorizontal());

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

        ship.setStartPosition(x, y);
        ship.setShipCoordinates(x, y, ship.getHorizontal());

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

  // Returns random coordinates after delay
  function cpuTurn(missedAttacks, humanShips, humanPrimaryBoard) {
    let [x, y] = getRandomCoordinates();
    let totalHits = [];

    // Populate totalHits with hits from every human ship
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
          () =>
            resolve(
              cpuSmartAttack(missedAttacks, totalHits, humanPrimaryBoard),
            ),
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

  // Returns [x, y]
  // We know there is a ship with hits that hasn't been sunk (currentShipHitArray is not empty)
  // For each square in currentShipHitArray, choose from legalChoices
  //  - this will ensure the ship gets sunk. Sunk ship's coordinates are removed from currentShipHitArray
  // If the legalChoices for a square are exhausted, try an adjacent ship square
  //  - if no adjacent ship squares, try any unhit ship square
  function cpuSmartAttack(missedAttacks, totalHits, humanPrimaryBoard) {
    for (let i = 0; i < currentShipHitArray.length; i++) {
      let hitX = currentShipHitArray[i][0];
      let hitY = currentShipHitArray[i][1];
      let currentShip = humanPrimaryBoard[hitX][hitY];
      let legalChoices = currentShip.getLegalChoices();
      let values = legalChoices.get(JSON.stringify([hitX, hitY]));

      // If the ship has multiple hits, make a more logical choice than the next available legal choice
      // Will find all the unhit ship squares and squares adjacent to each end of the boat, then randomly choose
      if (currentShip.getHits() > 1) {
        let shipCoordinates = currentShip.getShipCoordinates();
        let hitsArray = currentShip.getHitsArray();

        // Add all ship coordinates that haven't been hit to choices array
        let choices = get2DArrayDifference(shipCoordinates, hitsArray);

        // Add squares outside of ship ends to choices array based on orientation
        // Horizontal
        if (currentShip.getHorizontal()) {
          let firstSquareX = shipCoordinates[0][0];
          let firstSquareY = shipCoordinates[0][1];
          let lastSquareX = shipCoordinates[shipCoordinates.length - 1][0];
          let lastSquareY = shipCoordinates[shipCoordinates.length - 1][1];

          if (firstSquareY !== 0 && lastSquareY !== 9) {
            choices.push([firstSquareX, firstSquareY - 1]);
            choices.push([lastSquareX, lastSquareY + 1]);
          } else if (firstSquareY === 0) {
            choices.push([lastSquareX, lastSquareY + 1]);
          } else if (lastSquareY === 9) {
            choices.push([firstSquareX, firstSquareY - 1]);
          }

          // Vertical
        } else {
          let firstSquareX = shipCoordinates[0][0];
          let firstSquareY = shipCoordinates[0][1];
          let lastSquareX = shipCoordinates[shipCoordinates.length - 1][0];
          let lastSquareY = shipCoordinates[shipCoordinates.length - 1][1];

          if (firstSquareX !== 0 && lastSquareX !== 9) {
            choices.push([firstSquareX - 1, firstSquareY]);
            choices.push([lastSquareX + 1, lastSquareY]);
          } else if (firstSquareX === 0) {
            choices.push([lastSquareX + 1, lastSquareY]);
          } else if (lastSquareX === 9) {
            choices.push([firstSquareX - 1, firstSquareY]);
          }
        }

        // Randomly choose from the choices array
        let randomInt = getRandomInt(choices.length - 1);
        let x = choices[randomInt][0];
        let y = choices[randomInt][1];

        // Check to see if that coordinate has already been chosen. If so, randomly choose again
        while (
          checkForMiss(missedAttacks, x, y) ||
          checkForHit(totalHits, x, y)
        ) {
          randomInt = getRandomInt(choices.length - 1);
          x = choices[randomInt][0];
          y = choices[randomInt][1];
        }

        return [x, y];
      }

      if (values.length === 0) {
        continue;
      }

      return values[getRandomInt(values.length - 1)];
    }
  }

  // For each CPU turn, search through the each ship's legalChoices and remove the coordinate if it matches
  // This ensures the square won't be chosen during cpuSmartAttack
  function updateLegalChoices(x, y) {
    const square = JSON.stringify([x, y]);

    for (let i = 0; i < ships.length; i++) {
      let legalChoices = ships[i].getLegalChoices();
      let keys = legalChoices.keys();
      let values = legalChoices.values();
      let key = keys.next();

      for (let array of values) {
        let newValues = [];
        for (let j = 0; j < array.length; j++) {
          if (square !== JSON.stringify(array[j])) {
            newValues.push(array[j]);
          }
        }
        legalChoices.set(key.value, newValues);
        key = keys.next();
      }
    }
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

  // Return items unique to arr1
  function get2DArrayDifference(arr1, arr2) {
    const diff1 = arr1.filter(
      (row1) =>
        !arr2.some((row2) => JSON.stringify(row1) === JSON.stringify(row2)),
    );
    return diff1;
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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
    updateCurrentShipHitArray,
    placeShip,
    receiveAttack,
    allShipsSunk,
    cpuTurn,
    initializeGameboard,
    randomShipPlacement,
    updateLegalChoices,
  };
}
