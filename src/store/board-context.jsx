import { createContext } from "react";

const BoardContext = createContext({
  activeTool: "",
  toolActionType: "",
  elements: [],
  history: [[]],
  index: 0,
  boardMouseDownHandler: () => {},
  changeToolHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  textAreaBlurHandler: () => {},
  undo: () => {},
  redo: () => {},
});

export default BoardContext;
