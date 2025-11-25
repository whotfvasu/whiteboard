import { useContext } from "react";
import { COLORS } from "../../constants";
import classes from "./Toolbox.module.css";
import cx from "classnames";
import ToolboxContext from "../../store/toolbox-context";
import BoardContext from "../../store/board-context";

const Toolbox = () => {
  const { activeTool } = useContext(BoardContext);
  const { toolboxState, changeStrokeHandler } = useContext(ToolboxContext);
  const strokeColor = toolboxState[activeTool]?.stroke;
  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolboxLabel}>Stroke</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((c) => {
            return (
              <div
                key={c}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: strokeColor === COLORS[c],
                })}
                    style={{ backgroundColor: COLORS[c] }}
                    onClick = {()=> changeStrokeHandler(activeTool, COLORS[c])}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
