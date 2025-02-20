import styled from "styled-components";

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const CELL_WIDTH = 30;
export const CELL_HEIGHT = 30;

// interface Cell {
//   taken: boolean;
//   colour: string | null;
// }

// interface GridProps {
//   grid: Cell[];
// }

export const GridContainer = styled.div`
  background: black;

  display: grid;
  grid-template-columns: repeat(${GRID_WIDTH}, 30px);
  grid-template-rows: repeat(${GRID_HEIGHT}, 30px);
  gap: 1px;
`;

export const Cell = styled.div`
  width: ${CELL_WIDTH}px;
  height: ${CELL_HEIGHT}px;
  background: white;
  border: 1px solid gray;
`;
