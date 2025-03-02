import React from "react";
import Cell from "../Cell";
import { StyledGrid } from "./Grid.styles";

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
