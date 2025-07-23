// import "./styles.css";
import Gameboard from "./Gameboard.js";

let human = Gameboard();

human.placeShip(5, 5)

console.table(human.primaryBoard[5][5])
