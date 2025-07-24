import Player from "../src/Player.js";

describe("Player functionality tests", () => {
  let player = Player();

  beforeEach(() => {
    player = Player();
  });

  test("gameboard: player object has gameboard property", () => {
    expect(player).toHaveProperty("gameboard");
    expect(player.gameboard).toHaveProperty("getPrimaryBoard");
  });
});
