import { renderPrimaryBoard } from "./render.js";

function primaryRandomShips(player) {
  const randomButton = document.querySelector(".randomButtonPrimary");

  randomButton.addEventListener("click", () => {
    player.gameboard.randomShipPlacement();
    renderPrimaryBoard(player);
  });
}

export { primaryRandomShips };
