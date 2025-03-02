// gameUtils.ts
import { GRID_WIDTH, GRID_HEIGHT } from "../components/Grid/Grid.styles";
import { Tetromino } from "./tetrominoes";

export const createEmptyGrid = (): (string | null)[][] =>
  Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

export const mergeTetromino = (
  grid: (string | null)[][],
  tetromino: Tetromino,
  position: { x: number; y: number }
): (string | null)[][] => {
  // 🔥 Deep copy grid to avoid mutations
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

export const clearFullRows = (grid: (string | null)[][]) => {
  let newGrid = grid.filter((row) => row.some((cell) => cell === null)); // Keep non-full rows
  const rowsCleared = GRID_HEIGHT - newGrid.length;

  if (rowsCleared === 0) return { newGrid: grid, rowsCleared: 0 };

  console.log(`✅ Clearing ${rowsCleared} full rows`);

  // Add empty rows at the top
  newGrid = [
    ...Array(rowsCleared).fill(Array(GRID_WIDTH).fill(null)),
    ...newGrid,
  ];

  return { newGrid, rowsCleared };
};
