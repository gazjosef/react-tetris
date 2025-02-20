import {
  GridContainer,
  Cell,
  GRID_WIDTH,
  GRID_HEIGHT,
  // CELL_WIDTH,
  // CELL_HEIGHT,
} from "../ui/Grid";

interface Cell {
  taken: boolean;
  colour: string | null;
}

// interface GridProps {
//   grid: Cell[];
// }

const Grid = () => {
  return (
    <GridContainer>
      {Array.from({ length: GRID_WIDTH * GRID_HEIGHT }).map((_, index) => (
        <Cell key={index} />
      ))}
    </GridContainer>
  );
};

export default Grid;
