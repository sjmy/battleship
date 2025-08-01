import "./styles.css";
import Player from "./Player.js";
import {
  renderPrimaryBoard,
  renderSecondaryBoard,
  reset,
  disableButtons,
  gameOver,
} from "./render.js";
import {
  randomShipsListener,
  secondaryBoardListener,
  startGameListener,
  playAgainListener,
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
  let human = Player();
  let cpu = Player();
  let win = false;

  reset();

  await preGame(human, cpu);

  disableButtons();

  // Game loop until a player's ships are sunk
  while (!human.gameboard.allShipsSunk() && !cpu.gameboard.allShipsSunk()) {
    // Await human turn
    let [x, y] = await secondaryBoardListener();

    // Log attack. If it's a hit, check if it's sunk
    if (cpu.gameboard.receiveAttack(x, y)) {
      let ship = cpu.gameboard.getPrimaryBoard()[x][y];
      if (ship.isSunk()) {
        console.log(`You sunk CPU's ${ship.getShipName()}!`);
      }
    }

    // Render the boards
    renderSecondaryBoard(human, cpu);

    // Check for allShipsSunk so CPU doesn't get an extra turn if it's over
    if (cpu.gameboard.allShipsSunk()) {
      win = true;
      break;
    }

    // Await CPU turn
    // cpuTurn requires knowledge of previous hits and misses
    [x, y] = await cpu.gameboard.cpuTurn(
      human.gameboard.getMissedAttacksAgainst(),
      human.gameboard.getShips(),
    );

    // Log attack. If it's a hit, check if it's sunk
    if (human.gameboard.receiveAttack(x, y)) {
      let ship = human.gameboard.getPrimaryBoard()[x][y];
      if (ship.isSunk()) {
        console.log(`CPU sunk your ${ship.getShipName()}!`);
      }
    }

    // Render the boards
    renderPrimaryBoard(human);
  }

  postGame(win);
}

async function postGame(win) {
  gameOver(win);

  await playAgainListener();

  game();
}

game();
