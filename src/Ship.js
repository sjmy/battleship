export default function Ship(shipLength) {
  let length = getLength();
  let hits = 0;
  // Keep track of hits
  let hitsArray = [];
  let sunk = false;
  let horizontal = true;
  // Set in placeShip() in Gameboard.js. Used with horizontal and length for styling
  let startPosition;
  let shipCoordinates = [];
  let legalChoices = new Map();
  let shipName;

  function getLength() {
    return shipLength;
  }

  function getHits() {
    return hits;
  }

  function getHitsArray() {
    return hitsArray;
  }

  function getHorizontal() {
    return horizontal;
  }

  function setHorizontal(boolean) {
    horizontal = boolean;
  }

  function changeOrientation() {
    horizontal = !horizontal;
  }

  function getStartPosition() {
    return startPosition;
  }

  function setStartPosition(x, y) {
    startPosition = [x, y];
  }

  function getShipCoordinates() {
    return shipCoordinates;
  }

  function setShipCoordinates(x, y, isHorizontal) {
    shipCoordinates.push([x, y]);

    if (isHorizontal) {
      for (let i = 1; i < getLength(); i++) {
        shipCoordinates.push([x, y + i]);
      }
    } else {
      for (let i = 1; i < getLength(); i++) {
        shipCoordinates.push([x + i, y]);
      }
    }

    setLegalChoices();
  }

  function getShipName() {
    return shipName;
  }

  function setShipName(name) {
    shipName = name;
  }

  function getLegalChoices() {
    return legalChoices;
  }

  function setLegalChoices() {
    for (let i = 0; i < getLength(); i++) {
      let x = shipCoordinates[i][0];
      let y = shipCoordinates[i][1];
      let key = JSON.stringify([x, y]);

      // If first square of the ship
      if (i === 0) {
        if (horizontal) {
          // Horizontal
          if (x === 0 && y === 0) {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y + 1],
            ]);
          } else if (x === 9 && y === 0) {
            legalChoices.set(key, [
              [x - 1, y],
              [x, y + 1],
            ]);
          } else if (x === 0) {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y - 1],
              [x, y + 1],
            ]);
          } else if (x === 9) {
            legalChoices.set(key, [
              [x - 1, y],
              [x, y - 1],
              [x, y + 1],
            ]);
          } else if (y === 0) {
            legalChoices.set(key, [
              [x - 1, y],
              [x + 1, y],
              [x, y + 1],
            ]);
          } else {
            legalChoices.set(key, [
              [x - 1, y],
              [x + 1, y],
              [x, y - 1],
              [x, y + 1],
            ]);
          }
        } else {
          // Vertical
          if (x === 0 && y === 0) {
            legalChoices.set(key, [
              [x, y + 1],
              [x + 1, y],
            ]);
          } else if (x === 0 && y === 9) {
            legalChoices.set(key, [
              [x, y - 1],
              [x + 1, y],
            ]);
          } else if (y === 0) {
            legalChoices.set(key, [
              [x, y + 1],
              [x - 1, y],
              [x + 1, y],
            ]);
          } else if (y === 9) {
            legalChoices.set(key, [
              [x, y - 1],
              [x - 1, y],
              [x + 1, y],
            ]);
          } else if (x === 0) {
            legalChoices.set(key, [
              [x, y + 1],
              [x, y - 1],
              [x + 1, y],
            ]);
          } else {
            legalChoices.set(key, [
              [x - 1, y],
              [x, y + 1],
              [x, y - 1],
              [x + 1, y],
            ]);
          }
        }

        // If last square of the ship
      } else if (i === getLength() - 1) {
        if (horizontal) {
          // Horizontal
          if (x === 9 && y === 9) {
            legalChoices.set(key, [
              [x - 1, y],
              [x, y - 1],
            ]);
          } else if (x === 0 && y === 9) {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y - 1],
            ]);
          } else if (x === 0) {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y + 1],
              [x, y - 1],
            ]);
          } else if (y === 9) {
            legalChoices.set(key, [
              [x + 1, y],
              [x - 1, y],
              [x, y - 1],
            ]);
          } else if (x === 9) {
            legalChoices.set(key, [
              [x, y + 1],
              [x - 1, y],
              [x, y - 1],
            ]);
          } else {
            legalChoices.set(key, [
              [x - 1, y],
              [x + 1, y],
              [x, y + 1],
              [x, y - 1],
            ]);
          }
        } else {
          // Vertical
          if (x === 9 && y === 9) {
            legalChoices.set(key, [
              [x, y - 1],
              [x - 1, y],
            ]);
          } else if (x === 9 && y === 0) {
            legalChoices.set(key, [
              [x, y + 1],
              [x - 1, y],
            ]);
          } else if (y === 0) {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y + 1],
              [x - 1, y],
            ]);
          } else if (y === 9) {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y - 1],
              [x - 1, y],
            ]);
          } else if (x === 9) {
            legalChoices.set(key, [
              [x, y + 1],
              [x, y - 1],
              [x - 1, y],
            ]);
          } else {
            legalChoices.set(key, [
              [x + 1, y],
              [x, y + 1],
              [x, y - 1],
              [x - 1, y],
            ]);
          }
        }

        // Inner ship squares
      } else if (horizontal) {
        // Horizontal
        if (x === 0) {
          legalChoices.set(key, [
            [x + 1, y],
            [x, y + 1],
            [x, y - 1],
          ]);
        } else if (x === 9) {
          legalChoices.set(key, [
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
          ]);
        } else {
          legalChoices.set(key, [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
          ]);
        }
      } else {
        // Vertical
        if (y === 0) {
          legalChoices.set(key, [
            [x, y + 1],
            [x + 1, y],
            [x - 1, y],
          ]);
        } else if (y === 9) {
          legalChoices.set(key, [
            [x, y - 1],
            [x + 1, y],
            [x - 1, y],
          ]);
        } else {
          legalChoices.set(key, [
            [x, y + 1],
            [x, y - 1],
            [x + 1, y],
            [x - 1, y],
          ]);
        }
      }
      // console.log(legalChoices.get(key));
    }
    // console.table(legalChoices);
  }

  // Increases the number of ‘hits’ on the ship, adds hit to hitsArray
  function hit(position) {
    hits += 1;
    hitsArray.push(position);
  }

  // Calculates whether a ship is considered sunk based on its length and the number of hits it has received
  function isSunk() {
    if (hits >= length) {
      sunk = true;
    }
    return sunk;
  }

  return {
    getLength,
    getHits,
    getHitsArray,
    getHorizontal,
    setHorizontal,
    changeOrientation,
    getStartPosition,
    setStartPosition,
    getShipCoordinates,
    setShipCoordinates,
    getLegalChoices,
    getShipName,
    setShipName,
    hit,
    isSunk,
  };
}
