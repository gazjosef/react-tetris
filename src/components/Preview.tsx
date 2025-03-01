import styled from "styled-components";
import { Tetromino } from "../game/tetrominoes";

type Props = {
  tetromino: Tetromino;
};

const NextTetromino: React.FC<Props> = ({ tetromino }) => {
  return (
    <Container>
      <h3>Next</h3>
      <PreviewGrid
        columns={tetromino.shape[0].length}
        rows={tetromino.shape.length}
      >
        {tetromino.shape.map((row, y) =>
          row.map((cell, x) => (
            <PreviewCell
              key={`${x}-${y}`}
              filled={cell !== 0}
              color={tetromino.colour}
            />
          ))
        )}
      </PreviewGrid>
    </Container>
  );
};

export default NextTetromino;

const Container = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const PreviewGrid = styled.div<{ columns: number; rows: number }>`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows}, 20px);
  grid-template-columns: repeat(${(props) => props.columns}, 20px);
  gap: 2px;
  justify-content: center;
`;

const PreviewCell = styled.div<{ filled: boolean; color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ filled, color }) => (filled ? color : "transparent")};
  border: ${({ filled }) =>
    filled ? "1px solid #000" : "1px solid transparent"};
`;
