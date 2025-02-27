// gameUtils.ts
import { GRID_WIDTH, GRID_HEIGHT } from "../components/Grid";
import { Tetromino } from "../game/tetrominoes";

export const createEmptyGrid = (): (string | null)[][] =>
  Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

export const mergeTetromino = (
  grid: (string | null)[][],
  tetromino: Tetromino,
  position: { x: number; y: number }
): (string | null)[][] => {
  const mergedGrid = grid.map((row) => row.slice());

  tetromino.shape.forEach((row, y) =>
    row.forEach((value, x) => {
      if (value) {
        const gridX = position.x + x;
        const gridY = position.y + y;
        if (
          gridY >= 0 &&
          gridY < GRID_HEIGHT &&
          gridX >= 0 &&
          gridX < GRID_WIDTH
        ) {
          mergedGrid[gridY][gridX] = tetromino.colour;
        }
      }
    })
  );
  return mergedGrid;
};

export const checkCollision = (
  grid: (string | null)[][],
  tetromino: Tetromino,
  position: { x: number; y: number }
): boolean => {
  return tetromino.shape.some((row, y) =>
    row.some((value, x) => {
      if (value) {
        const newX = position.x + x;
        const newY = position.y + y;
        // Check out-of-bounds
        if (newX < 0 || newX >= GRID_WIDTH || newY >= GRID_HEIGHT) {
          return true;
        }
        // Check if the space is already occupied
        if (newY >= 0 && grid[newY][newX] !== null) {
          return true;
        }
      }
      return false;
    })
  );
};

export const rotateTetromino = (shape: number[][]): number[][] => {
  return shape[0].map((_, i) => shape.map((row) => row[i]).reverse());
};

export const clearFullRows = (
  grid: (string | null)[][]
): (string | null)[][] => {
  const newGrid = grid.filter((row) => row.some((cell) => cell === null));
  const rowsCleared = GRID_HEIGHT - newGrid.length;

  console.log(rowsCleared);

  // Add empty rows at the top
  while (newGrid.length < GRID_HEIGHT) {
    newGrid.unshift(Array(GRID_WIDTH).fill(null));
  }

  return newGrid;
};
