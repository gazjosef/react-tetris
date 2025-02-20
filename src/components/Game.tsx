import React, { useEffect } from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Sidebar from "./Sidebar";
import NextTetromino from "./NextTetromino";
import { useTetris } from "../hooks/useTetris";

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: centre;
`;

const Game: React.FC = () => {
  const {
    grid,
    score,
    level,
    nextIndex,
    moveLeft,
    toggleStartPause,
    // Additional functions like moveRight, rotate can be added here
  } = useTetris();

  // Keyboard controls for desktop
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") moveLeft();
      // Add arrow right, down, and rotation controls here
    };
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [moveLeft]);

  return (
    <GameContainer>
      <Grid grid={grid} />
      <Sidebar
        score={score}
        level={level}
        toggleStartPause={toggleStartPause}
      />
      <NextTetromino nextIndex={nextIndex} />
    </GameContainer>
  );
};

export default Game;
