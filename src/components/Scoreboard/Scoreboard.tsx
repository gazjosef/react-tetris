import React from "react";
import { FlexColumn } from "../../styles/Layout";
import { ScoreBoardWrapper } from "./Scoreboard.styles";

interface ScoreBoardProps {
  score: number;
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level }) => {
  return (
    <ScoreBoardWrapper>
      <FlexColumn justifyContent="space-around" gap=".5rem">
        <h2>Score</h2>
        <p>{score}</p>
        <h2>Level</h2>
        <p>{level}</p>
      </FlexColumn>
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;
