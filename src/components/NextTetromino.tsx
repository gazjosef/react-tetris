import React from "react";
import styled from "styled-components";
import { upNextTetrominoes, colors } from "../utils/tetromino";

interface NextTetrominoProps {
  nextIndex: number;
}

const MiniGrid = styled.div`
  width: 80px; /* 4 cells x 20px */
  height: 80px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid #fff;
  margin-top: 1rem;
`;

const Cell = styled.div<{ active: boolean; colour: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ active, colour }) => (active ? colour : "#222")};
  border: 1px solid #333;
`;

const NextTetromino: React.FC<NextTetrominoProps> = ({ nextIndex }) => {
  const shape = upNextTetrominoes[nextIndex];
  const miniGrid = Array.from({ length: 16 }, (_, i) => {
    const active = shape.includes(i);
    return (
      <Cell key={i} active={active} colour={colors[nextIndex % colors.length]}>
        {/* Empty cell */}
      </Cell>
    );
  });

  return (
    <div>
      <h4>Next:</h4>
      <MiniGrid>{miniGrid}</MiniGrid>
    </div>
  );
};

export default NextTetromino;
