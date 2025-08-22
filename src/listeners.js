import { renderPrimaryBoard } from "./render.js";

let mouseMoving = false;

document.addEventListener("mousemove", () => {
  mouseMoving = true;
  console.log("mouse moving");
});

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

function startGameListener() {
  const startButton = document.querySelector(".startGameButton");

  return new Promise((resolve) => {
    startButton.addEventListener("click", () => {
      startButton.style.display = "none";
      resolve();
    });
  });
}

function playAgainListener() {
  const playAgain = document.querySelector(".playAgain");

  return new Promise((resolve) => {
    playAgain.addEventListener("click", () => {
      resolve();
    });
  });
}

export {
  randomShipsListener,
  secondaryBoardListener,
  startGameListener,
  playAgainListener,
};
