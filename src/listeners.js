import { renderPrimaryBoard, renderSecondaryBoard } from "./render.js";

function randomShipsListener(player) {
  const randomButton = document.querySelector(".randomShipsButton");

  randomButton.addEventListener("click", () => {
    player.gameboard.randomShipPlacement();
    renderPrimaryBoard(player);
  });
}

function secondaryBoardListener(player, opponent) {
  const secondaryBoard = document.querySelector(".secondary-board");

  secondaryBoard.addEventListener("click", (e) => {
    return [e.target.dataset.row, e.target.dataset.col];
  });
}

function startGameListener() {
  const startButton = document.querySelector(".startGameButton");

  return new Promise((resolve) => {
    startButton.addEventListener("click", () => {
      resolve();
    });
  });
}

export { randomShipsListener, secondaryBoardListener, startGameListener };
