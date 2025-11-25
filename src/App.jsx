import Board from "./components/Board/Board";
import Toolbar from "./components/Toolbar/Toolbar";
import BoardProvider from "./store/BoardProvider";

const App = () => {
  return (
    <BoardProvider>
      <Toolbar />
      <Board />
    </BoardProvider>
  );
};

export default App;
