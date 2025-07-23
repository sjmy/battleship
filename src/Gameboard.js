// be able to place ships at specific coordinates by calling the ship factory or class
// keep track of missed attacks so they can display them properly
// be able to report whether or not all of their ships have been sunk

export default function Gameboard() {
  let primaryBoard = [];
  let secondaryBoard = [];

  function buildBoards() {
    for (let i = 0; i < 10; i++) {
      primaryBoard[i] = [];
      secondaryBoard[i] = [];
      
      for (let j = 0; j < 10; j++) {
        primaryBoard[i][j] = null;
        secondaryBoard[i][j] = null;
      }
    }
  }

  // takes a pair of coordinates, determines whether or not the attack hit a ship
  // then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot
  function receiveAttack() {}

  buildBoards();

  return { primaryBoard, secondaryBoard, receiveAttack };
}
