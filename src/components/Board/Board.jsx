import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import BoardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import ToolboxContext from "../../store/toolbox-context";
import classes from "./Board.module.css";
import { useParams } from "react-router-dom";
import { createElement, getSvgPathFromStroke } from "../../utils/Elements";
import getStroke from "perfect-freehand";

const Board = () => {
  const { canvasId } = useParams();
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const {
    elements,
    toolActionType,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
    setCanvasId,
    setElements,
    setHistory,
  } = useContext(BoardContext);

  const { toolboxState } = useContext(ToolboxContext);

  const token = localStorage.getItem("whiteboard_user_token");

  useEffect(() => {
    setElements([]);
    setHistory([[]]);
  }, [canvasId]);

  useEffect(() => {
    const fetchCanvasData = async () => {
      if (canvasId && token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/canvas/${canvasId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await response.json();
          console.log("Canvas data loaded:", data);
          setCanvasId(canvasId);

          const recreatedElements = (data.elements || []).map((element) => {
            if (element.type === TOOL_ITEMS.BRUSH) {
              const path = new Path2D(
                getSvgPathFromStroke(
                  getStroke(element.points, { size: element.size || 2 })
                )
              );
              return { ...element, path };
            } else if (element.type === TOOL_ITEMS.TEXT) {
              return element;
            } else {
              return createElement(
                element.id,
                element.x1,
                element.y1,
                element.x2,
                element.y2,
                {
                  type: element.type,
                  stroke: element.stroke,
                  fill: element.fill,
                  size: element.size,
                }
              );
            }
          });

          setElements(recreatedElements);
          setHistory(recreatedElements);
        } catch (error) {
          console.error("Error loading canvas:", error);
        }
      }
    };

    fetchCanvasData();
  }, [canvasId, token]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }, []);

  useEffect(() => {
    if (!canvasId || !token) return;
    const saveCanvas = async () => {
      try {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/canvas/update/${canvasId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ elements }),
          }
        );
      } catch (error) {
        console.error("Error saving canvas:", error);
      }
    };

    const timeoutId = setTimeout(saveCanvas, 1000);
    return () => clearTimeout(timeoutId);
  }, [elements, canvasId, token]);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        undo();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        event.preventDefault();
        redo();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.CIRCLE:
        case TOOL_ITEMS.ARROW:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSH:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        case TOOL_ITEMS.TEXT:
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
        default:
          throw new Error("Unknown element type: " + element.type);
      }
    });
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  useEffect(() => {
    const textarea = textAreaRef.current;
    if (toolActionType === TOOL_ACTION_TYPES.WRITING) {
      setTimeout(() => {
        textarea.focus();
      }, 0);
    }
  }, [toolActionType]);

  const handleMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState);
  };

  const handleMouseMove = (event) => {
    boardMouseMoveHandler(event);
  };

  const handleMouseUp = (event) => {
    boardMouseUpHandler(event);
  };

  return (
    <div>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
          type="text"
          ref={textAreaRef}
          className={classes.textElementBox}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1].size}px`,
            color: elements[elements.length - 1].stroke,
          }}
          onBlur={(event) => textAreaBlurHandler(event.target.value)}
        ></textarea>
      )}
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Board;
