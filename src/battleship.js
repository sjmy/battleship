import "./styles.css";
// import Gameboard from "./Gameboard.js";
// import Ship from "./Ship.js";
import Player from "./Player.js";
import { renderPrimaryBoard } from "./render.js";

let human = Player();

renderPrimaryBoard(human);
