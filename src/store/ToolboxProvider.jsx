import { useReducer } from "react";
import ToolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS } from "../constants";

const toolboxReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STROKE":
      const newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.stroke;
      return newState;
    default:
      return state;
  }
};

const initialToolboxState = {
  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
};

const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );

  const changeStrokeHandler = (tool, stroke) => {
    dispatchToolboxAction({ type: "CHANGE_STROKE", payload: { tool, stroke } });
  };

  const toolboxContextValue = {
    toolboxState,
    changeStrokeHandler,
  };

  return (
    <ToolboxContext.Provider value={toolboxContextValue}>
      {children}
    </ToolboxContext.Provider>
  );
};

export default ToolboxProvider;
