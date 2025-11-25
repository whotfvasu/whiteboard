import React, { useReducer } from "react";
import BoardContext from "./board-context";
import { BOARD_ACTIONS, TOOL_ACTION_TYPES, TOOL_ITEMS } from "../constants";
import { createRoughElement } from "../utils/Elements";

const boardReducer = (state, action) => {
  switch (action.type) {
    case BOARD_ACTIONS.SET_ACTIVE_TOOL: {
      return {
        ...state,
        activeTool: action.payload.tool,
      };
    }

    case BOARD_ACTIONS.DRAW_DOWN: {
      const { clientX, clientY } = action.payload;
      const newElement = createRoughElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        { type: state.activeTool }
      );
      const prevElements = state.elements;
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.DRAWING,
        elements: [...prevElements, newElement],
      };
    }

    case BOARD_ACTIONS.DRAW_MOVE: {
      const { clientX: moveX, clientY: moveY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const { x1, y1 } = newElements[index];
      const newElement = createRoughElement(index, x1, y1, moveX, moveY, {
        type: state.activeTool,
      });
      newElements[index] = newElement;
      return {
        ...state,
        elements: newElements,
      };
    }

    case BOARD_ACTIONS.DRAW_UP: {
      return {
        ...state,
        toolActionType: TOOL_ACTION_TYPES.NONE,
      };
    }

    default:
      return state;
  }
};

const initialBoardState = {
  activeTool: TOOL_ITEMS.LINE,
  toolActionType: TOOL_ACTION_TYPES.NONE,
  elements: [],
};

const BoardProvider = ({ children }) => {
  const [boardState, dispatchBoardAction] = useReducer(
    boardReducer,
    initialBoardState
  );

  const changeToolHandler = (tool) => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.SET_ACTIVE_TOOL,
      payload: { tool },
    });
  };

  const boardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_DOWN,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_MOVE,
      payload: {
        clientX,
        clientY,
      },
    });
  };

  const boardMouseUpHandler = () => {
    dispatchBoardAction({
      type: BOARD_ACTIONS.DRAW_UP,
    });
  };

  const boardContextValue = {
    activeTool: boardState.activeTool,
    elements: boardState.elements,
    toolActionType: boardState.toolActionType,
    changeToolHandler,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
  };

  return (
    <BoardContext.Provider value={boardContextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
