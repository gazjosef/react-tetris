// import React from "react"
import { BoardContainer, Cell } from "../ui/Board";

const GameBoard = ({ board }: { board: string[][] }) => {
  return (
    <BoardContainer>
      {board.flat().map((cell, index) => (
        <Cell key={index} color={cell || "black"} />
      ))}
    </BoardContainer>
  );
};

export default GameBoard;
