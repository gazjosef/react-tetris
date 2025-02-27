import React, { useState, useEffect } from "react";
import Grid, { GRID_WIDTH, GRID_HEIGHT } from "../components/Grid";
import useGameControls from "../hooks/useGameControls";
import { CenteredGrid } from "../styles/Layout";
import { getRandomTetromino, Tetromino } from "./tetrominoes";
import {
  createEmptyGrid,
  mergeTetromino,
  clearFullRows,
  checkCollision,
  rotateTetromino,
} from "../utils/gameUtils";

const Game: React.FC = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid());
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(
    getRandomTetromino()
  );
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor(GRID_WIDTH / 2) - 1,
    y: 0,
  });

  const moveLeft = () => setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
  const moveRight = () => setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
  const drop = () => setPosition((prev) => ({ ...prev, y: prev.y + 1 }));

  const rotate = () => {
    const rotatedShape = rotateTetromino(currentTetromino.shape);
    if (
      !checkCollision(
        grid,
        { ...currentTetromino, shape: rotatedShape },
        position
      )
    ) {
      setCurrentTetromino((prev) => ({ ...prev, shape: rotatedShape }));
    }
  };

  useGameControls({
    moveLeft,
    moveRight,
    drop,
    rotate,
    grid,
    tetromino: currentTetromino,
    position,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPos) => {
        const nextPos = { ...prevPos, y: prevPos.y + 1 };
        if (nextPos.y + currentTetromino.shape.length > GRID_HEIGHT) {
          setGrid((prevGrid) =>
            clearFullRows(mergeTetromino(prevGrid, currentTetromino, prevPos))
          );
          setCurrentTetromino(getRandomTetromino());
          return { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 };
        }
        return nextPos;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTetromino]);

  const mergedGrid = mergeTetromino(grid, currentTetromino, position);
  const flatGrid = mergedGrid.flat();

  return (
    <CenteredGrid>
      <Grid grid={flatGrid} />
    </CenteredGrid>
  );
};

export default Game;
