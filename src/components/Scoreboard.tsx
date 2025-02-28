import React from "react";
import styled from "styled-components";

const ScoreBoardWrapper = styled.div`
  background: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 150px;
  text-align: center;
  font-family: Arial, sans-serif;
`;

interface ScoreBoardProps {
  score: number;
  level: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level }) => {
  return (
    <ScoreBoardWrapper>
      <h2>Score</h2>
      <p>{score}</p>
      <h2>Level</h2>
      <p>{level}</p>
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;
