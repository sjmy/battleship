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
  const gameboards = document.querySelector(".gameboards");
  const primaryBoardContainer = document.querySelector(".primary-board");
  const primaryBoard = player.gameboard.getPrimaryBoard();
  const missedAttacks = player.gameboard.getMissedAttacks();

  primaryBoardContainer.textContent = "";
  gameboards.appendChild(primaryBoardContainer);

  for (let r = 0; r < player.gameboard.getRows(); r++) {
    for (let c = 0; c < player.gameboard.getCols(); c++) {
      const square = document.createElement("button");

      square.classList.add("square");
      square.dataset.row = `${r}`;
      square.dataset.col = `${c}`;

      if (checkForMiss(missedAttacks, r, c)) {
        square.classList.add("miss");
        primaryBoardContainer.appendChild(square);
        continue;
      }

      if (primaryBoard[r][c] !== null) {
        const hitsArray = primaryBoard[r][c].getHitsArray();

        if (checkForHit(hitsArray, r, c)) {
          square.classList.add("hit");
        }

        square.classList.add("ship");
      }

      primaryBoardContainer.appendChild(square);
    }
  }
}

export { renderPrimaryBoard };
