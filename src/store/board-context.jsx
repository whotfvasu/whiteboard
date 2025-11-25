import { createContext } from "react";

const BoardContext = createContext({
  activeTool: "",
  toolActionType: "",
  elements: [],
  boardMouseDownHandler: () => {},
  changeToolHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
});

export default BoardContext;
