import React from "react";
import styled from "styled-components";

interface SidebarProps {
  score: number;
  level: number;
  toggleStartPause: () => void;
}

const SidebarContainer = styled.aside`
  margin-left: 1rem;
  colour: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Score = styled.h3`
  margin: 0.5rem 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #444;
  colour: #fff;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
`;

const Sidebar: React.FC<SidebarProps> = ({
  score,
  level,
  toggleStartPause,
}) => {
  return (
    <SidebarContainer>
      <Score>Score: {score}</Score>
      <Score>Level: {level}</Score>
      <Button onClick={toggleStartPause}>Start / Pause</Button>
    </SidebarContainer>
  );
};

export default Sidebar;
