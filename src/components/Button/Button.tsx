import { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 8rem;
`;
interface PauseButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const PauseButton = ({ children, onClick }: PauseButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default PauseButton;
