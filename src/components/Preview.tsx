import styled from "styled-components";
import { Tetromino } from "../game/tetrominoes";
import Cell from "../components/Cell"; // Reusing the existing Cell component

type Props = {
  tetromino: Tetromino;
};

const NextTetromino: React.FC<Props> = ({ tetromino }) => {
  return (
    <Container>
      <h3>Next</h3>
      <PreviewWrapper>
        <PreviewGrid
          columns={tetromino.shape[0].length}
          rows={tetromino.shape.length}
        >
          {tetromino.shape.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                key={`${x}-${y}`}
                $cellValue={cell ? tetromino.colour : null}
              />
            ))
          )}
        </PreviewGrid>
      </PreviewWrapper>
    </Container>
  );
};

export default NextTetromino;

// Styling
const Container = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const PreviewWrapper = styled.div`
  transform: scale(0.7); /* Adjust to fit within the sidebar */
  display: flex;
  justify-content: center;
`;

const PreviewGrid = styled.div<{ columns: number; rows: number }>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 30px);
  grid-template-columns: repeat(${(props) => props.columns}, 30px);
  gap: 2px;
  justify-content: center;
  background: #222;
  padding: 5px;
  border-radius: 5px;
`;
