import { useContext } from "react";
import {
  COLORS,
  FILL_TOOL_TYPES,
  SIZE_TOOL_TYPES,
  STROKE_TOOL_TYPES,
  TOOL_ITEMS,
} from "../../constants";
import classes from "./Toolbox.module.css";
import cx from "classnames";
import ToolboxContext from "../../store/toolbox-context";
import BoardContext from "../../store/board-context";

const Toolbox = () => {
  const { activeTool } = useContext(BoardContext);
  const { toolboxState, changeStroke, changeFill, changeSize } =
    useContext(ToolboxContext);
  const strokeColor = toolboxState[activeTool]?.stroke;
  const fillColor = toolboxState[activeTool]?.fill;
  const size = toolboxState[activeTool]?.size;
  return (
    <>
      {activeTool !== TOOL_ITEMS.ERASER && (
        <div className={classes.container}>
          {STROKE_TOOL_TYPES.includes(activeTool) && (
            <div className={classes.selectOptionContainer}>
              <div className={classes.toolboxLabel}>Stroke Color</div>
              <div className={classes.colorsContainer}>
                <div>
                  <input
                    className={classes.colorPicker}
                    type="color"
                    value={strokeColor}
                    onChange={(e) => changeStroke(activeTool, e.target.value)}
                  ></input>
                </div>
                {Object.keys(COLORS).map((c) => {
                  return (
                    <div
                      key={c}
                      className={cx(classes.colorBox, {
                        [classes.activeColorBox]: strokeColor === COLORS[c],
                      })}
                      style={{ backgroundColor: COLORS[c] }}
                      onClick={() => changeStroke(activeTool, COLORS[c])}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}

          {FILL_TOOL_TYPES.includes(activeTool) && (
            <div className={classes.selectOptionContainer}>
              <div className={classes.toolboxLabel}>Fill Color</div>
              <div className={classes.colorsContainer}>
                {fillColor === null ? (
                  <div
                    className={cx(classes.colorPicker, classes.noFillColorBox)}
                    onClick={() => changeFill(activeTool, COLORS.BLACK)}
                  ></div>
                ) : (
                  <div>
                    <input
                      className={classes.colorPicker}
                      type="color"
                      value={strokeColor}
                      onChange={(e) => changeFill(activeTool, e.target.value)}
                    ></input>
                  </div>
                )}
                <div
                  className={cx(classes.colorBox, classes.noFillColorBox, {
                    [classes.activeColorBox]: fillColor === null,
                  })}
                  onClick={() => changeFill(activeTool, null)}
                ></div>
                {Object.keys(COLORS).map((c) => {
                  return (
                    <div
                      key={c}
                      className={cx(classes.colorBox, {
                        [classes.activeColorBox]: fillColor === COLORS[c],
                      })}
                      style={{ backgroundColor: COLORS[c] }}
                      onClick={() => changeFill(activeTool, COLORS[c])}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}

          {SIZE_TOOL_TYPES.includes(activeTool) && (
            <div className={classes.selectOptionContainer}>
              <div className={classes.toolboxLabel}>
                {activeTool === TOOL_ITEMS.TEXT ? "Font Size" : "Brush Size"}
              </div>
              <input
                type="range"
                min={activeTool === TOOL_ITEMS.TEXT ? 12 : 1}
                max={activeTool === TOOL_ITEMS.TEXT ? 64 : 10}
                step={1}
                value={size}
                onChange={(e) =>
                  changeSize(activeTool, parseInt(e.target.value))
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Toolbox;
