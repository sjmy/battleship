import "./styles.css";
// import Gameboard from "./Gameboard.js";
// import Ship from "./Ship.js";
import Player from "./Player.js";
import { renderPrimaryBoard, renderSecondaryBoard } from "./render.js";
import {
  randomShipsListener,
  secondaryBoardListener,
  startGameListener,
} from "./listeners.js";

async function preGame(human, opponent) {
  human.gameboard.randomShipPlacement();
  opponent.gameboard.randomShipPlacement();

  renderPrimaryBoard(human);
  renderSecondaryBoard(human, opponent);
  randomShipsListener(human);

  await startGameListener();

  return true;
}

async function game() {
  const randomShipsButton = document.querySelector(".randomShipsButton");
  const startGameButton = document.querySelector(".startGameButton");
  let human = Player();
  let opponent = Player();

  await preGame(human, opponent);

  randomShipsButton.disabled = "true";
  startGameButton.disabled = "true";

  while (
    !human.gameboard.allShipsSunk() ||
    !opponent.gameboard.allShipsSunk()
  ) {
    // await secondaryBoardListener(human, opponent);
    // remove the secondary board listener
    // render the boards
    // change the opacity to visualize the current turn?
    // await opponent turn
    // add the secondary board listener
    // render the boards
    // change the opacity to visualize the current turn?
  }

  // postGame()
}

function postGame() {}

game();

// human.gameboard.receiveAttack(0, 0);
// opponent.gameboard.receiveAttack(0, 5);
// human.gameboard.receiveAttack(5, 5);
// opponent.gameboard.receiveAttack(9, 9);
// console.table(human.gameboard.getMissedAttacks());
// console.table(human.gameboard.getPrimaryBoard()[5][5].getHitsArray());
