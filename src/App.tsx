// import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  // Define the board state (e.g., 3x3 grid with default colors)
  const board = [
    ["red", "blue", "green"],
    ["yellow", "purple", "orange"],
    ["black", "white", "gray"],
  ];

  return (
    <>
      <h1>Vite + React</h1>
      <GameBoard board={board} />
    </>
  );
}

export default App;
