import { renderPrimaryBoard, renderSecondaryBoard } from "./render.js";

function randomShipsListener(player) {
  const randomButton = document.querySelector(".randomShipsButton");

  randomButton.addEventListener("click", () => {
    player.gameboard.randomShipPlacement();
    renderPrimaryBoard(player);
  });
}

function secondaryBoardListener() {
  const secondaryBoard = document.querySelector(".secondary-board");

  return new Promise((resolve) => {
    secondaryBoard.addEventListener(
      "click",
      (e) => {
        resolve([Number(e.target.dataset.row), Number(e.target.dataset.col)]);
      },
      { once: true },
    );
  });
}

// function removeSecondaryBoardListener() {
//   const secondaryBoard = document.querySelector(".secondary-board");

//   secondaryBoard.removeEventListener("click", resolveAttackPromise);
// }

// function resolveAttackPromise(e) {
//   return new Promise((resolve) => {
//     resolve([e.target.dataset.row, e.target.dataset.col]);
//   });
// }

function startGameListener() {
  const startButton = document.querySelector(".startGameButton");

  return new Promise((resolve) => {
    startButton.addEventListener("click", () => {
      resolve();
    });
  });
}

export { randomShipsListener, secondaryBoardListener, startGameListener };
