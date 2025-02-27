import { useState, useEffect } from "react";
import Grid, {
  GRID_WIDTH,
  // GRID_HEIGHT
} from "../components/Grid";
import useGameControls from "../hooks/useGameControls";
import { CenteredGrid } from "../styles/Layout";
import { getRandomTetromino, Tetromino } from "./tetrominoes";
import {
  createEmptyGrid,
  mergeTetromino,
  clearFullRows,
  checkCollision,
} from "../utils/gameUtils";

const Game = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid());
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(
    getRandomTetromino()
  );
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor(GRID_WIDTH / 2) - 1,
    y: 0,
  });

  const moveLeft = () => {
    if (
      !checkCollision(grid, currentTetromino, {
        x: position.x - 1,
        y: position.y,
      })
    ) {
      setPosition((prev) => ({ ...prev, x: prev.x - 1 }));
    }
  };

  const moveRight = () => {
    if (
      !checkCollision(grid, currentTetromino, {
        x: position.x + 1,
        y: position.y,
      })
    ) {
      setPosition((prev) => ({ ...prev, x: prev.x + 1 }));
    }
  };

  const drop = () => {
    if (
      !checkCollision(grid, currentTetromino, {
        x: position.x,
        y: position.y + 1,
      })
    ) {
      setPosition((prev) => ({ ...prev, y: prev.y + 1 }));
    } else {
      // Merge tetromino into the grid
      setGrid((prevGrid) =>
        clearFullRows(mergeTetromino(prevGrid, currentTetromino, position))
      );
      // Spawn new piece
      setCurrentTetromino(getRandomTetromino());
      setPosition({ x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 });
    }
  };

  const rotate = () => {
    const rotatedShape = currentTetromino.shape[0].map((_, i) =>
      currentTetromino.shape.map((row) => row[i]).reverse()
    );
    const rotatedTetromino = { ...currentTetromino, shape: rotatedShape };
    if (!checkCollision(grid, rotatedTetromino, position)) {
      setCurrentTetromino(rotatedTetromino);
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

        if (checkCollision(grid, currentTetromino, nextPos)) {
          // Merge tetromino into grid and spawn new one
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
  }, [grid, currentTetromino]);

  const mergedGrid = mergeTetromino(grid, currentTetromino, position);
  const flatGrid = mergedGrid.flat();

  return (
    <CenteredGrid fullScreen>
      <Grid grid={flatGrid} />
    </CenteredGrid>
  );
};

export default Game;
