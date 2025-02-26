import React, { useState, useEffect } from "react";
import Grid, { GRID_WIDTH, GRID_HEIGHT } from "../components/Grid";
import { getRandomTetromino, Tetromino } from "../utils/tetrominoes";
import {
  createEmptyGrid,
  mergeTetromino,
  clearFullRows,
} from "../utils/gameUtils";
import useGameControls from "../hooks/useGameControls";
import { CenteredGrid } from "../styles/Layout";

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
  const rotate = () =>
    setCurrentTetromino((prev) => ({
      ...prev,
      shape: prev.shape[0].map((_, i) =>
        prev.shape.map((row) => row[i]).reverse()
      ),
    }));

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
