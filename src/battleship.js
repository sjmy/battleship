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

// Handles all functionality before the start game button is clicked
async function preGame(human, opponent) {
  human.gameboard.randomShipPlacement();
  opponent.gameboard.randomShipPlacement();

  renderPrimaryBoard(human);
  renderSecondaryBoard(human, opponent);
  randomShipsListener(human);

  await startGameListener();

  return true;
}

// Instantiates player and opponent, kicks off preGame
async function game() {
  const randomShipsButton = document.querySelector(".randomShipsButton");
  const startGameButton = document.querySelector(".startGameButton");

  let human = Player();
  let opponent = Player();

  await preGame(human, opponent);

  randomShipsButton.disabled = "true";
  startGameButton.disabled = "true";

  // Game loop until a player's ships are sunk
  while (
    !human.gameboard.allShipsSunk() &&
    !opponent.gameboard.allShipsSunk()
  ) {
    // Await human turn
    let [x, y] = await secondaryBoardListener();

    // Log attack
    opponent.gameboard.receiveAttack(x, y);

    // Render the boards
    renderSecondaryBoard(human, opponent);

    // Check for allShipsSunk so the opponent doesn't get an extra turn if it's over
    if (opponent.gameboard.allShipsSunk()) {
      break;
    }

    // Await opponent turn
    // cpuTurn requires knowledge of previous hits and misses
    [x, y] = await opponent.gameboard.cpuTurn(
      human.gameboard.getMissedAttacksAgainst(),
      human.gameboard.getShips(),
    );

    // Log attack
    human.gameboard.receiveAttack(x, y);

    // Render the boards
    renderPrimaryBoard(human);
  }

  postGame();
}

function postGame() {
  console.log("game over");
}

game();
