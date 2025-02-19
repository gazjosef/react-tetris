import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(20, 30px);
  gap: 1px;
  background-color: black;
  padding: 10px;
`;

export const Cell = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
