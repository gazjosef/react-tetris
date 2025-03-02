import { useState, useEffect, useCallback } from "react";
// Components
import Grid, { GRID_WIDTH } from "../components/Grid";
import ScoreBoard from "../components/Scoreboard";
import NextTetromino from "../components/Preview";
// Hooks
import useGameControls from "../hooks/useGameControls";
// Styles
import { CenteredGrid, Flex, FlexColumn } from "../styles/Layout";
// Game
import { getRandomTetromino, Tetromino } from "./tetrominoes";
import {
  createEmptyGrid,
  mergeTetromino,
  clearFullRows,
  checkCollision,
} from "./gameUtils";
import PauseButton from "../components/Button";

const LEVEL_SPEED = 1000;
const POINTS_PER_LEVEL = 100;

const Game = () => {
  const [grid, setGrid] = useState<(string | null)[][]>(createEmptyGrid());
  const [currentTetromino, setCurrentTetromino] = useState<Tetromino>(
    getRandomTetromino()
  );
  const [nextTetromino, setNextTetromino] = useState<Tetromino>(
    getRandomTetromino()
  );
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor(GRID_WIDTH / 2) - 1,
    y: 0,
  });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [paused, setPaused] = useState(false);

  const togglePause = () => setPaused((prev) => !prev);

  const moveLeft = () => {
    if (paused) return;
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
    if (paused) return;
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
    if (paused) return;
    setPosition((prevPos) => {
      const nextPos = { ...prevPos, y: prevPos.y + 1 };

      if (checkCollision(grid, currentTetromino, nextPos)) {
        setGrid((prevGrid) => {
          // Merge Tetromino first
          const mergedGrid = mergeTetromino(
            prevGrid,
            currentTetromino,
            prevPos
          );

          // Clear full rows & update score
          const { newGrid: updatedGrid, rowsCleared } =
            clearFullRows(mergedGrid);

          if (rowsCleared > 0) {
            setScore((prevScore) => prevScore + rowsCleared * 10); // 10 points per row
            console.log(`✅ Cleared ${rowsCleared} rows! New Score: ${score}`);
          }

          return updatedGrid; // Ensure the old Tetromino is removed
        });

        // Move nextTetromino into play and generate a new one
        setCurrentTetromino(nextTetromino);
        setNextTetromino(getRandomTetromino());
        setPosition({ x: Math.floor(GRID_WIDTH / 2) - 1, y: 0 });

        return prevPos; // Prevent further movement
      }

      return nextPos;
    });
  }, [grid, currentTetromino, score, nextTetromino, paused]);

  const rotate = () => {
    if (paused) return;
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
    if (paused) return;
    const interval = setInterval(drop, LEVEL_SPEED / level);
    return () => clearInterval(interval);
  }, [drop, level, paused]);

  useGameControls({
    moveLeft,
    moveRight,
    drop,
    rotate,
    grid,
    tetromino: currentTetromino,
    position,
    // paused,
  });

  const mergedGrid = mergeTetromino(grid, currentTetromino, position);
  const flatGrid = mergedGrid.flat();

  return (
    <CenteredGrid fullScreen>
      <Flex>
        <FlexColumn alignItems="center" justifyContent="flex-start" gap="1rem">
          <NextTetromino tetromino={nextTetromino} />
          <ScoreBoard score={score} level={level} />
          <PauseButton onClick={togglePause}>
            {paused ? "Resume" : "Pause"}
          </PauseButton>
        </FlexColumn>

        <Grid grid={flatGrid} />
      </Flex>
      {paused && <div className="pause-overlay">Game Paused</div>}
    </CenteredGrid>
  );
};

export default Game;
