function renderPrimaryBoard(player) {
  const primaryBoardContainer = document.querySelector(
    ".primaryBoardContainer",
  );

  for (let r = 0; r < player.gameboard.getRows(); r++) {
    for (let c = 0; c < player.gameboard.getCols(); c++) {
      const square = document.createElement("button");
      square.setAttribute("class", "square");
      square.dataset.rowcol = `${r}${c}`;
      // button.textContent = board.getBoard()[r][c].getValue();
      primaryBoardContainer.appendChild(square);

      // if (button.textContent == "E") {
      //     button.style.fontSize = 0;
      // };
    }
  }
}

export { renderPrimaryBoard };
