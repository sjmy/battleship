export default function Ship(shipLength) {
  let length = getLength();
  let hits = 0;
  let sunk = false;

  function getLength() {
    return shipLength;
  }

  // Increases the number of ‘hits’ on the ship
  function hit() {
    hits += 1;
  }

  // Calculates whether a ship is considered sunk based on its length and the number of hits it has received
  function isSunk() {
    if (hits >= length) {
      sunk = true;
    }

    return sunk;
  }

  return { getLength, hit, isSunk };
}
