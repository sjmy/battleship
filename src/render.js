// Checks if arrays are the same
function comparePositions(current, end) {
  const currentPos = current;
  const endPos = end;

  return (
    currentPos.length === endPos.length &&
    currentPos.every((num, index) => num === endPos[index])
  );
}

function checkForHit(hitsArray, row, col) {
  for (let i = 0; i < hitsArray.length; i++) {
    if (comparePositions(hitsArray[i], [row, col])) {
      return true;
    }
  }
  return false;
}

function checkForMiss(missedAttacks, row, col) {
  for (let i = 0; i < missedAttacks.length; i++) {
    if (comparePositions(missedAttacks[i], [row, col])) {
      return true;
    }
  }
  return false;
}

function renderPrimaryBoard(player) {
  const primaryBoardContainer = document.querySelector(".primary-board");
  const primaryBoard = player.gameboard.getPrimaryBoard();
  const missedAttacks = player.gameboard.getMissedAttacksAgainst();

  // Resets the board
  primaryBoardContainer.textContent = "";

  // For each square, create a button
  for (let r = 0; r < player.gameboard.getRows(); r++) {
    for (let c = 0; c < player.gameboard.getCols(); c++) {
      const square = document.createElement("button");

      // Add class, row/col data attribute to element
      square.classList.add("primarySquare");
      square.dataset.row = `${r}`;
      square.dataset.col = `${c}`;

      // Check if it's a missed attack
      if (checkForMiss(missedAttacks, r, c)) {
        square.classList.add("miss");
        primaryBoardContainer.appendChild(square);
        continue;
      }

      // If the square is not empty and not a miss, it's a ship
      if (primaryBoard[r][c] !== null) {
        const ship = primaryBoard[r][c];
        const startPosition = ship.getStartPosition();
        const shipLength = ship.getLength();
        const hitsArray = ship.getHitsArray();

        if (ship.getHorizontal()) {
          if (r === startPosition[0] && c === startPosition[1]) {
            square.classList.add("shipStartH");
          } else if (c === startPosition[1] + shipLength - 1) {
            square.classList.add("shipEndH");
          } else {
            square.classList.add("shipMidH");
          }
        } else if (r === startPosition[0] && c === startPosition[1]) {
          square.classList.add("shipStartV");
        } else if (r === startPosition[0] + shipLength - 1) {
          square.classList.add("shipEndV");
        } else {
          square.classList.add("shipMidV");
        }

        // Check it it's a hit
        if (checkForHit(hitsArray, r, c)) {
          square.classList.add("hit");
        }

        square.classList.add("ship");
      }

      primaryBoardContainer.appendChild(square);
    }
  }
}

function renderSecondaryBoard(player, opponent) {
  const secondaryBoardContainer = document.querySelector(".secondary-board");
  const oppPrimaryBoard = opponent.gameboard.getPrimaryBoard();
  const missedAttacks = opponent.gameboard.getMissedAttacksAgainst();

  // Resets the board
  secondaryBoardContainer.textContent = "";

  // For each square, create a button
  for (let r = 0; r < player.gameboard.getRows(); r++) {
    for (let c = 0; c < player.gameboard.getCols(); c++) {
      const square = document.createElement("button");

      // Add class, row/col data attribute to element
      square.classList.add("secondarySquare");
      square.dataset.row = `${r}`;
      square.dataset.col = `${c}`;

      // Check if it's a missed attack
      if (checkForMiss(missedAttacks, r, c)) {
        square.classList.add("miss");
        square.disabled = "true";
        secondaryBoardContainer.appendChild(square);
        continue;
      }

      // If the square is not empty and not a miss, it's a ship
      if (oppPrimaryBoard[r][c] !== null) {
        const hitsArray = oppPrimaryBoard[r][c].getHitsArray();

        // Check it it's a hit
        if (checkForHit(hitsArray, r, c)) {
          square.classList.add("hit");
        }
      }

      secondaryBoardContainer.appendChild(square);
    }
  }
}

function gameOver(win) {
  const gameboardsDiv = document.querySelector(".gameboards");
  const gameOverDiv = document.querySelector(".gameOver");
  const gameOverText = document.querySelector(".gameOverText");
  const playAgain = document.querySelector(".playAgain");

  gameboardsDiv.classList.add("fade");
  gameOverDiv.style.display = "flex";

  if (win) {
    console.log("You win!");
    gameOverDiv.classList.add("win");
    gameOverText.textContent = "You win!";
  } else {
    console.log("CPU wins!");
    gameOverDiv.classList.add("loss");
    gameOverText.textContent = "CPU wins!";
  }

  playAgain.display = "block";
}

function reset() {
  const gameboardsDiv = document.querySelector(".gameboards");
  const randomShipsButton = document.querySelector(".randomShipsButton");
  const startGameButton = document.querySelector(".startGameButton");
  const gameOverDiv = document.querySelector(".gameOver");

  gameboardsDiv.classList.remove("fade");
  randomShipsButton.removeAttribute("disabled");
  startGameButton.removeAttribute("disabled");
  gameOverDiv.style.display = "none";
}

function disableButtons() {
  const randomShipsButton = document.querySelector(".randomShipsButton");
  const startGameButton = document.querySelector(".startGameButton");

  randomShipsButton.disabled = "true";
  startGameButton.disabled = "true";
}

function msgClear() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "Attack!";
}

function msgPlaceShips() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "Place your ships.";
}

function msgCPUShipSunk(ship) {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = `You sunk CPU's ${ship.getShipName()}!`;
}

function msgHumanShipSunk(ship) {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = `CPU sunk your ${ship.getShipName()}!`;
}

function msgCPUTurn() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "CPU turn.";
}

function msgHumanTurn() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "Your turn.";
}

export {
  renderPrimaryBoard,
  renderSecondaryBoard,
  reset,
  disableButtons,
  gameOver,
  msgClear,
  msgPlaceShips,
  msgCPUShipSunk,
  msgHumanShipSunk,
  msgCPUTurn,
  msgHumanTurn,
};
