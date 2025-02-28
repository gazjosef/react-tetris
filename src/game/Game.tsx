import { useState, useEffect, useCallback } from "react";
import Grid, { GRID_WIDTH } from "../components/Grid";
import useGameControls from "../hooks/useGameControls";
import ScoreBoard from "../components/Scoreboard";
import { CenteredGrid, Flex } from "../styles/Layout";
import { getRandomTetromino, Tetromino } from "./tetrominoes";
import {
  createEmptyGrid,
  mergeTetromino,
  clearFullRows,
  checkCollision,
} from "../utils/gameUtils";

const LEVEL_SPEED = 1000;
const POINTS_PER_ROW = 10;
const POINTS_PER_LEVEL = 100;

const Game = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid());
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(
    getRandomTetromino()
  );
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor(GRID_WIDTH / 2) - 1,
    y: 0,
  });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

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

  const drop = useCallback(() => {
    setPosition((prevPos) => {
      const nextPos = { ...prevPos, y: prevPos.y + 1 };
      if (checkCollision(grid, currentTetromino, nextPos)) {
        setGrid((prevGrid) => {
          const newGrid = mergeTetromino(prevGrid, currentTetromino, prevPos);
          const { newGrid: updatedGrid, rowsCleared } = clearFullRows(newGrid);
          setScore((prev) => prev + rowsCleared * POINTS_PER_ROW);
          return updatedGrid;
        });
        setCurrentTetromino(getRandomTetromino());
        return { x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 };
      }
      return nextPos;
    });
  }, [grid, currentTetromino]);

  const rotate = () => {
    const rotatedShape = currentTetromino.shape[0].map((_, i) =>
      currentTetromino.shape.map((row) => row[i]).reverse()
    );
    const rotatedTetromino = { ...currentTetromino, shape: rotatedShape };
    if (!checkCollision(grid, rotatedTetromino, position)) {
      setCurrentTetromino(rotatedTetromino);
    }
  };

  useEffect(() => {
    setLevel(Math.floor(score / POINTS_PER_LEVEL) + 1);
  }, [score]);

  useEffect(() => {
    const interval = setInterval(drop, LEVEL_SPEED / level);
    return () => clearInterval(interval);
  }, [drop, level]);

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
          setGrid((prevGrid) => {
            const { newGrid } = clearFullRows(
              mergeTetromino(prevGrid, currentTetromino, prevPos)
            );
            return newGrid;
          });
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
      <Flex>
        <ScoreBoard score={score} level={level} />

        <Grid grid={flatGrid} />
      </Flex>
    </CenteredGrid>
  );
};

export default Game;
