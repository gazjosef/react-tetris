import { useEffect } from "react";
import { checkCollision } from "../utils/gameUtils";
import { Tetromino } from "../game/tetrominoes";

interface GameControls {
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  drop: () => void;
  grid: (string | null)[][];
  tetromino: Tetromino;
  position: { x: number; y: number };
}

const useGameControls = ({
  moveLeft,
  moveRight,
  rotate,
  drop,
  grid,
  tetromino,
  position,
}: GameControls): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          if (
            !checkCollision(grid, tetromino, {
              x: position.x - 1,
              y: position.y,
            })
          ) {
            moveLeft();
          }
          break;
        case "ArrowRight":
          if (
            !checkCollision(grid, tetromino, {
              x: position.x + 1,
              y: position.y,
            })
          ) {
            moveRight();
          }
          break;
        case "ArrowUp":
          rotate();
          break;
        case "ArrowDown":
          if (
            !checkCollision(grid, tetromino, {
              x: position.x,
              y: position.y + 1,
            })
          ) {
            drop();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveLeft, moveRight, rotate, drop, grid, tetromino, position]);
};

export default useGameControls;
