import React from "react";
import { GridContainer, Cell } from "../ui/Grid";

interface Cell {
  taken: boolean;
  colour: string | null;
}

interface GridProps {
  grid: Cell[];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <GridContainer>
      {grid.map((_cell, index) => (
        <Cell key={index} />
      ))}
    </GridContainer>
  );
};

export default Grid;
