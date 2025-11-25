import Board from "./components/Board/Board";
import Toolbar from "./components/Toolbar/Toolbar";
import Toolbox from "./components/Toolbox/Toolbox";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";

const App = () => {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar />
        <Board />
        <Toolbox />
      </ToolboxProvider>
    </BoardProvider>
  );
};

export default App;
