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
        const hitsArray = primaryBoard[r][c].getHitsArray();

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

export { renderPrimaryBoard, renderSecondaryBoard };
