// Game.tsx
import React, { useState, useEffect } from "react";
import Grid, { GRID_WIDTH, GRID_HEIGHT } from "./Grid";
import { GridCenter } from "../ui/Utils";
import { getRandomTetromino, Tetromino } from "../utils/tetrominoes";
import { createEmptyGrid, mergeTetromino } from "../utils/gameUtils";

const Game: React.FC = () => {
  // Create the grid using our helper
  const [grid] = useState<(string | null)[][]>(createEmptyGrid());
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(
    getRandomTetromino()
  );
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor(GRID_WIDTH / 2) - 1,
    y: 0,
  });

  // Move the tetromino down automatically every second.
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPos) => {
        const nextPos = { ...prevPos, y: prevPos.y + 1 };
        // Check if the tetromino reached the bottom.
        if (nextPos.y + currentTetromino.shape.length > GRID_HEIGHT) {
          // Spawn a new tetromino at the top.
          setCurrentTetromino(getRandomTetromino());
          return { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 };
        }
        return nextPos;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTetromino]);

  // Merge the falling tetromino onto the grid.
  const mergedGrid = mergeTetromino(grid, currentTetromino, position);
  // Flatten the 2D grid for our Grid component.
  const flatGrid = mergedGrid.flat();

  return (
    <GridCenter>
      <Grid grid={flatGrid} />
    </GridCenter>
  );
};

export default Game;
