export const GRID_WIDTH = 10;

export const tetrominoes = {
  L: [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2], // "L" shape
  T: [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2], // "T" shape
  O: [0, 1, GRID_WIDTH, GRID_WIDTH + 1], // "O" (Square)
  Z: [0, 1, GRID_WIDTH + 1, GRID_WIDTH + 2], // "Z" shape
  I: [0, GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 3], // "I" shape
};

export type TetrominoType = keyof typeof tetrominoes;
