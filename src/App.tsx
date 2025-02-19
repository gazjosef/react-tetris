// import "./App.css";
import GameBoard from "./components/GameBoard";
import AppContainer from "./ui/AppContainer";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const { board } = useGameLogic();

  return (
    <AppContainer>
      <h1>Vite + React</h1>
      <GameBoard board={board} />
    </AppContainer>
  );
}

export default App;
