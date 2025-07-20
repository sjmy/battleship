// be able to place ships at specific coordinates by calling the ship factory or class
// keep track of missed attacks so they can display them properly
// be able to report whether or not all of their ships have been sunk

export default function Gameboard() {
  // takes a pair of coordinates, determines whether or not the attack hit a ship
  // then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  function receiveAttack() {}

  return { receiveAttack };
}
