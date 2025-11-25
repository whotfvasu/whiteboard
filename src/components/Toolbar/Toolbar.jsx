import React, { useContext, useState } from "react";
import classes from "./Toolbar.module.css";
import cx from "classnames";
import { FaSlash, FaRegCircle, FaArrowRight } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import Lottie from "lottie-react";
import animation from "../../assets/animation.json";
import BoardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../constants";

const Toolbar = () => {
  const { activeTool, changeToolHandler } = useContext(BoardContext);

  return (
    <div className={`${classes.container} absolute`}>
      <div className=" mx-2 relative -bottom-[14px] w-14">
        <Lottie animationData={animation} />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.LINE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.LINE)}
      >
        <FaSlash />
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
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeTool === TOOL_ITEMS.ARROW,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ARROW)}
      >
        <FaArrowRightLong />
      </div>
    </div>
  );
};

export default Toolbar;
