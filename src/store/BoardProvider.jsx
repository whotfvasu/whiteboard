import React, { useState } from "react";
import BoardContext from "./board-context";
import { TOOL_ITEMS } from "../constants";

const BoardProvider = ({ children }) => {
  const [activeTool, setActiveTool] = useState(TOOL_ITEMS.LINE);
  const handleToolClick = (tool) => {
    setActiveTool(tool);
  };
  const boardContextValue = {
      activeTool,
      handleToolClick,
  };
  return (
    <BoardContext.Provider
      value={boardContextValue}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
