import { useReducer } from "react";
import ToolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from "../constants";

const toolboxReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STROKE": {
      const newState = { ...state };
      newState[action.payload.tool].stroke = action.payload.stroke;
      return newState;
    }
    case "CHANGE_FILL": {
      const newState = { ...state };
      newState[action.payload.tool].fill = action.payload.fill;
      return newState;
    }
    case "CHANGE_SIZE": {
      const newState = { ...state };
      newState[action.payload.tool].size = action.payload.size;
      return newState;
    }
    default:
      return state;
  }
};

const initialToolboxState = {
  [TOOL_ITEMS.BRUSH]: {
    stroke: COLORS.BLACK,
  },
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
  [TOOL_ITEMS.TEXT]: {
    stroke: COLORS.BLACK,
    size: 32,
  },
};

const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );

  const changeStroke = (tool, stroke) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_STROKE,
      payload: { tool, stroke },
    });
  };

  const changeFill = (tool, fill) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_FILL,
      payload: { tool, fill },
    });
  };

  const changeSize = (tool, size) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_SIZE,
      payload: { tool, size },
    });
  };

  const toolboxContextValue = {
    toolboxState,
    changeStroke,
    changeFill,
    changeSize,
  };

  return (
    <ToolboxContext.Provider value={toolboxContextValue}>
      {children}
    </ToolboxContext.Provider>
  );
};

export default ToolboxProvider;
