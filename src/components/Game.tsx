import { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import { tetrominoes, TetrominoType, GRID_WIDTH } from "../utils/tetrominoes";

const GRID_HEIGHT = 20;

const createEmptyGrid = () => Array(GRID_WIDTH * GRID_HEIGHT).fill(0);

const Game = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentTetromino] = useState<TetrominoType>("T");
  const [position, setPosition] = useState(4); // Start position in the grid

  // Function to check collision
  const checkCollision = useCallback(
    (newPosition: number) => {
      return tetrominoes[currentTetromino].some((offset) => {
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
    },
    [grid, currentTetromino]
  );

  // Memoised function to draw tetromino on grid
  const drawTetromino = useCallback(() => {
    const newGrid = createEmptyGrid();
    tetrominoes[currentTetromino].forEach((offset) => {
      newGrid[position + offset] = 1; // Mark tetromino on the grid
    });
    setGrid(newGrid);
  }, [currentTetromino, position]); // Only changes when these dependencies change

  // Move tetromino left, right, or down
  const moveTetromino = useCallback(
    (direction: "left" | "right" | "down") => {
      setPosition((prev) => {
        const newPos =
          direction === "left"
            ? prev - 1
            : direction === "right"
            ? prev + 1
            : prev + GRID_WIDTH; // Move down
        console.log("Attempting to move to position:", newPos);
        return checkCollision(newPos) ? prev : newPos;
      });
    },
    [checkCollision]
  );

  // Handle keyboard input
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log("Key pressed:", event.key);
      if (event.key === "ArrowLeft") moveTetromino("left");
      if (event.key === "ArrowRight") moveTetromino("right");
      if (event.key === "ArrowDown") moveTetromino("down");
    },
    [moveTetromino]
  );

  // Attach and remove event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Draw tetromino when game starts
  useEffect(() => {
    drawTetromino();
  }, [drawTetromino]);

  return (
    <div>
      <h1>Tetris</h1>
      <Grid grid={grid} />
    </div>
  );
};

export default Game;
