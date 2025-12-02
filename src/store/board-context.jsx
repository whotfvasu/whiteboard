import { createContext } from "react";

const BoardContext = createContext({
  isUserLoggedIn: false,
  activeTool: "",
  toolActionType: "",
  elements: [],
  history: [[]],
  index: 0,
  canvasId: "",
  setElements: () => { },
  setCanvasId: () => { },
  setHistory: () => { },
  setUserLoginStatus: () => {},
  boardMouseDownHandler: () => {},
  changeToolHandler: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
  textAreaBlurHandler: () => {},
  undo: () => {},
  redo: () => {},
});

export default BoardContext;
