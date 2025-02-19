import { useState, useEffect } from "react";
import { randomTetromino } from "../components/Tetromino";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const useGameLogic = () => {
  const [board, setBoard] = useState(() =>
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(""))
  );

  console.log("setBoard", setBoard);

  const [tetromino, setTetromino] = useState(randomTetromino);

  useEffect(() => {
    const interval = setInterval(() => {
      moveDown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const moveDown = () => {
    // Check for collision
    setTetromino((prev) => ({
      ...prev,
      position: { ...prev.position, y: prev.position.y + 1 },
    }));
  };

  return { board, tetromino, moveDown };
};
