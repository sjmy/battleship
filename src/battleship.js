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
    !human.gameboard.allShipsSunk() ||
    !opponent.gameboard.allShipsSunk()
  ) {
    // Await human turn
    let [x, y] = await secondaryBoardListener();

    // Log attack
    opponent.gameboard.receiveAttack(x, y);

    // Render the boards
    renderSecondaryBoard(human, opponent);

    // change the opacity to visualize the current turn?

    // Await opponent turn
    [x, y] = await opponent.gameboard.cpuTurn();

    // Log attack
    human.gameboard.receiveAttack(x, y);

    // Render the boards
    renderPrimaryBoard(human);

    // change the opacity to visualize the current turn?
  }

  postGame();
}

function postGame() {
  console.log("game over");
}

game();
