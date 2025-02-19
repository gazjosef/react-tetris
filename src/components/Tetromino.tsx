import { BOARD_WIDTH } from "../hooks/useGameLogic";

const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: "cyan" },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "purple",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "orange",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "blue",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
};

export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES) as Array<keyof typeof TETROMINOES>;
  const shapeKey = keys[Math.floor(Math.random() * keys.length)];

  return {
    ...TETROMINOES[shapeKey],
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }, // Centered at the top
  };
};
