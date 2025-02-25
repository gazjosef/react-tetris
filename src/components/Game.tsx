import {
  useState,
  // useEffect,
  // useCallback
} from "react";
import Grid from "./Grid";
import {
  // tetrominoes,
  // TetrominoType,
  GRID_WIDTH,
} from "../utils/tetrominoes";
import { GridCenter } from "../ui/Utils";

const GRID_HEIGHT = 20;

const createEmptyGrid = () => Array(GRID_WIDTH * GRID_HEIGHT).fill(0);

const Game = () => {
  const [grid] = useState(createEmptyGrid());

  return (
    <div>
      <GridCenter>
        <Grid grid={grid} />
      </GridCenter>
    </div>
  );
};

export default Game;
