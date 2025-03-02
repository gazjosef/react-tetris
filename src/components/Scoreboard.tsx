import React from "react";
import styled from "styled-components";
import { FlexColumn } from "../styles/Layout";

const ScoreBoardWrapper = styled.div`
  background: #333;
  border-radius: 1rem;
  width: 150px;
  padding: 2rem 0;

  color: white;
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
