import React, { useContext, useState } from "react";
import classes from "./Toolbar.module.css";
import cx from "classnames";
import {
  LuSlash,
  LuRectangleHorizontal,
  LuArrowRight,
  LuEraser,
  LuCircle,
  LuBrush,
  LuUndo2,
  LuRedo2,
} from "react-icons/lu";
import { RiText } from "react-icons/ri";
import Lottie from "lottie-react";
import animation from "../../assets/animation.json";
import BoardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../constants";

const Toolbar = () => {
  const { activeTool, changeToolHandler, undo, redo } = useContext(BoardContext);

  return (
    <div className={`${classes.container} absolute`}>
      <div className=" mx-4 relative -bottom-[14px] w-14">
        <Lottie animationData={animation} />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.BRUSH,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.BRUSH)}
      >
        <LuBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.LINE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.LINE)}
      >
        <LuSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.RECTANGLE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.RECTANGLE)}
      >
        <LuRectangleHorizontal />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.CIRCLE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.CIRCLE)}
      >
        <LuCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.ARROW,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ARROW)}
      >
        <LuArrowRight />
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.ERASER,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ERASER)}
      >
        <LuEraser />
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.TEXT,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.TEXT)}
      >
        <RiText />
      </div>

      <div className={classes.toolItem} onClick={undo}>
        <LuUndo2 />
      </div>

      <div className={classes.toolItem} onClick={redo}>
        <LuRedo2 />
      </div>
    </div>
  );
};

export default Toolbar;
