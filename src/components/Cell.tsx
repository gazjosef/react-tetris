import styled from "styled-components";

interface CellProps {
  $cellValue: string | null;
  width?: string;
  height?: string;
}

const Cell = styled.div<CellProps>`
  width: ${({ width }) => width || "30px"};
  height: ${({ height }) => height || "30px"};
  background: ${({ $cellValue }) => ($cellValue ? $cellValue : "#111")};
  border: 1px solid #333;
  box-shadow: inset 6px -6px 3px 0 rgba(0, 0, 0, 0.35);
`;

export default Cell;
