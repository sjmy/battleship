export default function Ship(shipLength) {
  let length = getLength();
  let hits = 0;
  // Keep track of hits
  let hitsArray = [];
  let sunk = false;
  let horizontal = true;

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
    changeOrientation,
    setHorizontal,
    hit,
    isSunk,
  };
}
