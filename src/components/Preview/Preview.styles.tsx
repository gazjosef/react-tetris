import styled from "styled-components";

export const PreviewTitle = styled.h3`
  font-size: 2rem;
  color: white;
`;

export const PreviewWrapper = styled.div`
  transform: scale(0.7);
  display: flex;
  justify-content: center;
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  justify-content: center;
  background: #222;
  border-radius: 5px;
`;
