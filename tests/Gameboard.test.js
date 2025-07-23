import Gameboard from "../src/Gameboard.js";

describe("Gameboard functionality tests", () => {
  let human = Gameboard();

  test("board positions all equal null after creation", () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(human.primaryBoard[i][j]).toBe(null);
      }
    }
  });
});
