import { useState, useEffect, useCallback } from "react";
import Grid from "./Grid";
import { tetrominoes, TetrominoType, GRID_WIDTH } from "../utils/tetrominoes";

const GRID_HEIGHT = 20;

const createEmptyGrid = () => Array(GRID_WIDTH * GRID_HEIGHT).fill(0);

const Game = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [currentTetromino] = useState<TetrominoType>("T");
  const [position] = useState(4); // Start position in the grid

  // Memoised function to draw tetromino on grid
  const drawTetromino = useCallback(() => {
    const newGrid = createEmptyGrid();
    tetrominoes[currentTetromino].forEach((offset) => {
      newGrid[position + offset] = 1; // Mark tetromino on the grid
    });
    setGrid(newGrid);
  }, [currentTetromino, position]); // Only changes when these dependencies change

  // Draw tetromino when game starts
  useEffect(() => {
    drawTetromino();
  }, [drawTetromino]); // Now it's safe to include drawTetromino

  return (
    <div>
      <h1>Tetris</h1>
      <Grid grid={grid} />
    </div>
  );
};

export default Game;
