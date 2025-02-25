// Grid.tsx
import React from "react";
import styled from "styled-components";

// Define grid dimensions here.
export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

const StyledGrid = styled.div`
  background: #222;
  padding: 5px;
  border: 2px solid grey;

  display: grid;
  grid-template-columns: repeat(${GRID_WIDTH}, 30px);
  grid-template-rows: repeat(${GRID_HEIGHT}, 30px);
  gap: 1px;
`;

interface CellProps {
  $cellValue: string | null;
}

const Cell = styled.div<CellProps>`
  width: 30px;
  height: 30px;
  background: ${({ $cellValue }) => ($cellValue ? $cellValue : "#111")};
  border: 1px solid #333;
  box-shadow: inset 6px -6px 3px 0 rgba(0, 0, 0, 0.35);
`;

interface GridProps {
  grid: (string | null)[];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <StyledGrid>
      {grid.map((cellValue, index) => (
        <Cell key={index} $cellValue={cellValue} />
      ))}
    </StyledGrid>
  );
};

export default Grid;
