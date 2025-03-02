import Cell from "../Cell";
import { Tetromino } from "../../game/tetrominoes";
import { PreviewGrid, PreviewTitle } from "./Preview.styles";
import { FlexColumn } from "../../styles/Layout";

type Props = {
  tetromino: Tetromino;
};

const GRID_SIZE = 6;
const CELL_SIZE = 20;

const NextTetromino: React.FC<Props> = ({ tetromino }) => {
  // Tetromino dimensions
  const tetroRows = tetromino.shape.length;
  const tetroCols = tetromino.shape[0].length;
  // Calculate centering offsets
  const offsetY = Math.floor((GRID_SIZE - tetroRows) / 2);
  const offsetX = Math.floor((GRID_SIZE - tetroCols) / 2);

  // Create an empty 6x6 grid
  const previewGrid = Array.from({ length: GRID_SIZE }, () =>
    Array(GRID_SIZE).fill(0)
  );

  // Insert Tetromino into the grid at the calculated position
  tetromino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        previewGrid[y + offsetY][x + offsetX] = tetromino.colour;
      }
    });
  });
  return (
    <FlexColumn alignItems="center" gap="1rem">
      <PreviewTitle>Next</PreviewTitle>
      <PreviewGrid>
        {previewGrid.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              height={`${CELL_SIZE}px`}
              width={`${CELL_SIZE}px`}
              key={`${x}-${y}`}
              $cellValue={cell || null}
            />
          ))
        )}
      </PreviewGrid>
    </FlexColumn>
  );
};

export default NextTetromino;
