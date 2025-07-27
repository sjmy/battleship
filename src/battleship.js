import "./styles.css";
// import Gameboard from "./Gameboard.js";
// import Ship from "./Ship.js";
import Player from "./Player.js";
import { renderPrimaryBoard, renderSecondaryBoard } from "./render.js";

let human = Player();
let opponent = Player();

human.gameboard.randomShipPlacement();
opponent.gameboard.randomShipPlacement();

human.gameboard.receiveAttack(0, 0);
opponent.gameboard.receiveAttack(0, 5);
human.gameboard.receiveAttack(5, 5);
opponent.gameboard.receiveAttack(9, 9);
// console.table(human.gameboard.getMissedAttacks());
// console.table(human.gameboard.getPrimaryBoard()[5][5].getHitsArray());
renderPrimaryBoard(human);
renderSecondaryBoard(human, opponent);
