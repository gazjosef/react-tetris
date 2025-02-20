import React from "react";
import styled from "styled-components";

// import { GridContainer, Cell, GRID_WIDTH, GRID_HEIGHT } from "../ui/Grid";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_WIDTH}, 30px);
  grid-template-rows: repeat(${GRID_HEIGHT}, 30px);
  gap: 1px;
  background: #222;
  padding: 5px;
`;

const Cell = styled.div<{ isActive: boolean }>`
  width: 30px;
  height: 30px;
  background: ${({ isActive }) => (isActive ? "#FFD700" : "#111")};
  border: 1px solid #333;
`;

interface GridProps {
  grid: number[];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <StyledGrid>
      {grid.map((cell, index) => (
        <Cell key={index} isActive={cell === 1} />
      ))}
    </StyledGrid>
  );
};

export default Grid;
