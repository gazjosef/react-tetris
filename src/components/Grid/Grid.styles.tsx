import styled from "styled-components";

// Define grid dimensions here.
export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const StyledGrid = styled.div`
  background: #222;
  padding: 5px;
  border: 2px solid grey;

  display: grid;
  grid-template-columns: repeat(${GRID_WIDTH}, 30px);
  grid-template-rows: repeat(${GRID_HEIGHT}, 30px);
  gap: 1px;
`;
