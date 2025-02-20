import React from "react";
import styled from "styled-components";

interface Cell {
  taken: boolean;
  colour: string | null;
}

interface GridProps {
  grid: Cell[];
}

const GridContainer = styled.div`
  width: 200px; /* 10 cells * 20px each */
  height: 400px; /* 20 rows * 20px */
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  border: 2px solid #fff;
`;

const CellDiv = styled.div<{ colour: string | null }>`
  width: 100%;
  height: 100%;
  background-color: ${({ colour }) => colour || "#222"};
  border: 1px solid #333;
`;

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <GridContainer>
      {grid.map((cell, index) => (
        <CellDiv key={index} colour={cell.colour} />
      ))}
    </GridContainer>
  );
};

export default Grid;
