// tetrominoes.ts
export type TetrominoShape = number[][];

export interface Tetromino {
  shape: TetrominoShape;
  colour: string;
}

export const TETROMINOES: { [key: string]: Tetromino } = {
  I: {
    shape: [[1, 1, 1, 1]],
    colour: "#00f0f0",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    colour: "#f0f000",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    colour: "#a000f0",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    colour: "#00f000",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    colour: "#f00000",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    colour: "#0000f0",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    colour: "#f0a000",
  },
};

export const getRandomTetromino = (): Tetromino => {
  const keys = Object.keys(TETROMINOES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[randomKey];
};
