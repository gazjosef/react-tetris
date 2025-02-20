import styled from "styled-components";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const CELL_WIDTH = 30;
const CELL_HEIGHT = 30;

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
  width: ${CELL_WIDTH};
  height: ${CELL_HEIGHT};
  background: white;
  border: 1px solid gray;
`;
