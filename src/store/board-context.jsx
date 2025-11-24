import { createContext } from "react";

const BoardContext = createContext({
  activeTool: "",
  elements: [],
});

export default BoardContext;
