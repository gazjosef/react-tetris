// import AppContainer from "./ui/AppContainer";
import Grid from "./components/Grid";
import GlobalStyles from "./styles/GlobalStyles";

interface Cell {
  taken: boolean;
  colour: string | null;
}

const initialGrid: Cell[] = [
  { taken: false, colour: null },
  { taken: false, colour: null },
  // ...add as many cells as you need
];

function App() {
  return (
    <>
      <GlobalStyles />
      <h1>Vite + React + TS</h1>
      <Grid grid={initialGrid} />
    </>
  );
}

export default App;
