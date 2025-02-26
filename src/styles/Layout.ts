import styled from "styled-components";

export const CenteredGrid = styled.div<{
  fullScreen?: boolean;
  height?: string;
  width?: string;
}>`
  display: grid;
  place-items: center;
  height: ${({ fullScreen, height }) =>
    fullScreen ? "100vh" : height || "auto"};
  width: ${({ fullScreen, width }) => (fullScreen ? "100vw" : width || "auto")};
`;
