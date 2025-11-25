import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";
import ToolboxContext from "../../store/toolbox-context";

const Board = () => {
  const canvasRef = useRef();

  const {
    elements,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    toolActionType,
  } = useContext(BoardContext);

  const { toolboxState } = useContext(ToolboxContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      roughCanvas.draw(element.roughEle);
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  const handleMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState);
  };

  const handleMouseMove = (event) => {
    if (toolActionType !== TOOL_ACTION_TYPES.DRAWING) return;
    boardMouseMoveHandler(event);
  };

  const handleMouseUp = (event) => {
    if (toolActionType !== TOOL_ACTION_TYPES.DRAWING) return;
    boardMouseUpHandler(event);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Board;
