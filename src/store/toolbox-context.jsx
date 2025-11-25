import { createContext } from "react";

const ToolboxContext = createContext({
  toolboxState: {},
  changeStrokeHandler: () => {},
});

export default ToolboxContext;
