// import "./styles.css";
import Gameboard from "./Gameboard.js";

let human = Gameboard();
let humanPrimaryBoard = human.getPrimaryBoard();
let ships = human.getShips();
let carrier = ships[0];
let battleship = ships[1];
let destroyer = ships[2];
let submarine = ships[3];
let patrolBoat = ships[4];

// ships.forEach((ship) => {
//   ship.changeOrientation();
// });

human.placeShip(carrier, 0, 2);
human.placeShip(battleship, 5, 5);
human.placeShip(destroyer, 6, 7);
submarine.changeOrientation();
human.placeShip(submarine, 7, 5);
human.placeShip(patrolBoat, 6, 0);

console.table(human.getPrimaryBoard());
