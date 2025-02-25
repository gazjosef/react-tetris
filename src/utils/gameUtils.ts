// gameUtils.ts
import { GRID_WIDTH, GRID_HEIGHT } from "../components/Grid";
import { Tetromino } from "./tetrominoes";

// Create an empty 2D grid filled with null (meaning no colour)
export const createEmptyGrid = (): (string | null)[][] =>
  Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

// Merge a tetromino into a grid, using the tetromino's colour for filled cells.
export const mergeTetromino = (
  grid: (string | null)[][],
  tetromino: Tetromino,
  position: { x: number; y: number }
): (string | null)[][] => {
  // Clone the grid
  const mergedGrid = grid.map((row) => [...row]);
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
