export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export type TetrominoType = "T" | "O" | "I" | "L" | "J" | "S" | "Z";

export const tetrominoes: Record<TetrominoType, number[]> = {
  T: [0, 1, 2, GRID_WIDTH + 1], // Example T-shape offsets
  O: [0, 1, GRID_WIDTH, GRID_WIDTH + 1], // Square
  I: [0, 1, 2, 3], // Straight line (horizontal)
  L: [0, 1, 2, GRID_WIDTH], // L-shape
  J: [0, 1, 2, GRID_WIDTH + 2], // Mirrored L
  S: [1, 2, GRID_WIDTH, GRID_WIDTH + 1], // S-shape
  Z: [0, 1, GRID_WIDTH + 1, GRID_WIDTH + 2], // Z-shape
};

// Create an empty grid
export const createEmptyGrid = () => Array(GRID_WIDTH * GRID_HEIGHT).fill(0);

// Check for collision
export const checkCollision = (
  grid: number[],
  tetromino: TetrominoType,
  newPosition: number
) => {
  return tetrominoes[tetromino].some((offset) => {
    const index = newPosition + offset;
    const row = Math.floor(index / GRID_WIDTH);
    const col = index % GRID_WIDTH;

    return (
      col < 0 || // Left boundary
      col >= GRID_WIDTH || // Right boundary
      row >= GRID_HEIGHT || // Bottom boundary
      grid[index] !== 0 // Collision with another block
    );
  });
};

// Draw Tetromino on the grid
export const drawTetromino = (
  grid: number[],
  tetromino: TetrominoType,
  position: number
) => {
  const newGrid = [...grid];
  tetrominoes[tetromino].forEach((offset) => {
    newGrid[position + offset] = 1; // Mark tetromino on the grid
  });
  return newGrid;
};
