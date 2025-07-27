import "./styles.css";
// import Gameboard from "./Gameboard.js";
// import Ship from "./Ship.js";
import Player from "./Player.js";
import { renderPrimaryBoard } from "./render.js";

let human = Player();

human.gameboard.randomShipPlacement();
human.gameboard.receiveAttack(0, 0);
human.gameboard.receiveAttack(5, 5);
// console.table(human.gameboard.getMissedAttacks());
// console.table(human.gameboard.getPrimaryBoard()[5][5].getHitsArray());
renderPrimaryBoard(human);
