import styled from "styled-components";
import { Tetromino } from "../game/tetrominoes";
import Cell from "../components/Cell";

type Props = {
  tetromino: Tetromino;
};

const PreviewTitle = styled.h3`
  font-size: 2rem;
  color: white;
`;

const PreviewWrapper = styled.div`
  transform: scale(0.7); /* Adjust to fit within the sidebar */
  display: flex;
  justify-content: center;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  justify-content: center;
  background: #222;
  /* padding: 5px; */
  border-radius: 5px;
`;

const GRID_SIZE = 6;

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
    <>
      <PreviewTitle>Next</PreviewTitle>
      <PreviewWrapper>
        <PreviewGrid>
          {previewGrid.map((row, y) =>
            row.map((cell, x) => (
              <Cell key={`${x}-${y}`} $cellValue={cell || null} />
            ))
          )}
        </PreviewGrid>
      </PreviewWrapper>
    </>
  );
};

export default NextTetromino;
