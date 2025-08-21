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
  const letterLabels = "ABCDEFGHIJ";
  const numberLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Resets the board
  primaryBoardContainer.textContent = "";

  // For each square, create a button
  for (let r = 0; r <= player.gameboard.getRows(); r++) {
    for (let c = 0; c <= player.gameboard.getCols(); c++) {
      if (r === 0 && c === 0) {
        const label = document.createElement("div");
        primaryBoardContainer.appendChild(label);
        continue;
      }

      if (r === 0) {
        const label = document.createElement("div");
        label.textContent = letterLabels[c - 1];
        label.classList.add("grid-label-col");
        primaryBoardContainer.appendChild(label);
        continue;
      }

      if (c === 0) {
        const label = document.createElement("div");
        label.textContent = numberLabels[r - 1];
        label.classList.add("grid-label-row");
        primaryBoardContainer.appendChild(label);
        continue;
      }

      const square = document.createElement("button");

      // Add class, row/col data attribute to element
      square.classList.add("primarySquare");
      square.dataset.row = `${r - 1}`;
      square.dataset.col = `${c - 1}`;

      // Check if it's a missed attack
      if (checkForMiss(missedAttacks, r - 1, c - 1)) {
        square.classList.add("miss");
        primaryBoardContainer.appendChild(square);
        continue;
      }

      // If the square is not empty and not a miss, it's a ship
      if (primaryBoard[r - 1][c - 1] !== null) {
        const ship = primaryBoard[r - 1][c - 1];
        const startPosition = ship.getStartPosition();
        const shipLength = ship.getLength();
        const hitsArray = ship.getHitsArray();

        if (ship.getHorizontal()) {
          if (r - 1 === startPosition[0] && c - 1 === startPosition[1]) {
            square.classList.add("shipStartH");
          } else if (c - 1 === startPosition[1] + shipLength - 1) {
            square.classList.add("shipEndH");
          } else {
            square.classList.add("shipMidH");
          }
        } else if (r - 1 === startPosition[0] && c - 1 === startPosition[1]) {
          square.classList.add("shipStartV");
        } else if (r - 1 === startPosition[0] + shipLength - 1) {
          square.classList.add("shipEndV");
        } else {
          square.classList.add("shipMidV");
        }

        // Check it it's a hit
        if (checkForHit(hitsArray, r - 1, c - 1)) {
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
  const letterLabels = "ABCDEFGHIJ";
  const numberLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Resets the board
  secondaryBoardContainer.textContent = "";

  // For each square, create a button
  for (let r = 0; r <= player.gameboard.getRows(); r++) {
    for (let c = 0; c <= player.gameboard.getCols(); c++) {
      if (r === 0 && c === 0) {
        const label = document.createElement("div");
        secondaryBoardContainer.appendChild(label);
        continue;
      }

      if (r === 0) {
        const label = document.createElement("div");
        label.textContent = letterLabels[c - 1];
        label.classList.add("grid-label-col");
        secondaryBoardContainer.appendChild(label);
        continue;
      }

      if (c === 0) {
        const label = document.createElement("div");
        label.textContent = numberLabels[r - 1];
        label.classList.add("grid-label-row");
        secondaryBoardContainer.appendChild(label);
        continue;
      }

      const square = document.createElement("button");

      // Add class, row/col data attribute to element
      square.classList.add("secondarySquare");
      square.dataset.row = `${r - 1}`;
      square.dataset.col = `${c - 1}`;

      // Check if it's a missed attack
      if (checkForMiss(missedAttacks, r - 1, c - 1)) {
        square.classList.add("miss");
        square.disabled = "true";
        secondaryBoardContainer.appendChild(square);
        continue;
      }

      // If the square is not empty and not a miss, it's a ship
      if (oppPrimaryBoard[r - 1][c - 1] !== null) {
        const hitsArray = oppPrimaryBoard[r - 1][c - 1].getHitsArray();

        // Check it it's a hit
        if (checkForHit(hitsArray, r - 1, c - 1)) {
          square.classList.add("hit");
          square.disabled = "true";
        }
      }

      secondaryBoardContainer.appendChild(square);
    }
  }
}

function gameOver(win) {
  const primaryBoard = document.querySelector(".primary-board");
  const secondaryBoard = document.querySelector(".secondary-board");
  const gameOverDiv = document.querySelector(".gameOver");
  const gameOverText = document.querySelector(".gameOverText");
  const playAgain = document.querySelector(".playAgain");

  primaryBoard.classList.remove("fade");
  secondaryBoard.classList.remove("fade");
  gameOverDiv.style.display = "flex";

  if (win) {
    gameOverDiv.classList.remove("loss");
    gameOverDiv.classList.add("win");
    gameOverText.textContent = "You win!";
  } else {
    gameOverDiv.classList.remove("win");
    gameOverDiv.classList.add("loss");
    gameOverText.textContent = "CPU wins!";
  }

  playAgain.display = "block";
}

function reset() {
  const primaryBoard = document.querySelector(".primary-board");
  const secondaryBoard = document.querySelector(".secondary-board");
  const randomShipsButton = document.querySelector(".randomShipsButton");
  const startGameButton = document.querySelector(".startGameButton");
  const gameOverDiv = document.querySelector(".gameOver");

  primaryBoard.classList.remove("fade");
  secondaryBoard.classList.remove("fade");
  randomShipsButton.style.display = "inline-block";
  startGameButton.style.display = "inline-block";
  gameOverDiv.style.display = "none";
}

function disableButtons() {
  const randomShipsButton = document.querySelector(".randomShipsButton");
  const startGameButton = document.querySelector(".startGameButton");

  randomShipsButton.style.display = "none";
  startGameButton.style.display = "none";
}

function msgClear() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "";
}

function msgPlaceShips() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "Place your ships.";
}

function msgAttack() {
  const infoDiv = document.querySelector(".info");
  infoDiv.textContent = "Attack the CPU grid!";
}

function removeSunkShipClass() {
  const infoDiv = document.querySelector(".info");
  infoDiv.classList.remove("sunk-ship");
}

function msgCPUShipSunk(ship) {
  const infoDiv = document.querySelector(".info");
  infoDiv.classList.add("sunk-ship");
  infoDiv.textContent = `You sunk CPU's ${ship.getShipName()}!`;
  setTimeout(removeSunkShipClass, 5000);
}

function msgHumanShipSunk(ship) {
  const infoDiv = document.querySelector(".info");
  infoDiv.classList.add("sunk-ship");
  infoDiv.textContent = `CPU sunk your ${ship.getShipName()}!`;
  setTimeout(removeSunkShipClass, 5000);
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
  msgAttack,
  msgCPUShipSunk,
  msgHumanShipSunk,
  msgCPUTurn,
  msgHumanTurn,
};
