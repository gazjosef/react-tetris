export type Tetromino = number[][];

export const width = 10;

export const colors = ["orange", "red", "purple", "green", "blue"];

// L Tetromino
export const lTetromino: Tetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

// Z Tetromino
export const zTetromino: Tetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

// T Tetromino
export const tTetromino: Tetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

// O Tetromino (Square)
export const oTetromino: Tetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

// I Tetromino
export const iTetromino: Tetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

export const tetrominoes: Tetromino[] = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

export const upNextTetrominoes: Tetromino = [
  [1, 4 + 1, 4 * 2 + 1, 2], // L shape simplified for mini grid
  [0, 4, 4 + 1, 4 * 2 + 1], // Z
  [1, 4, 4 + 1, 4 + 2], // T
  [0, 1, 4, 4 + 1], // O
  [1, 4 + 1, 4 * 2 + 1, 4 * 3 + 1], // I
];
