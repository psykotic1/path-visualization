import React, { useContext } from "react";
import "./Node.css";
import { BiSolidBomb, BiMap } from "react-icons/bi";
import { FaWeightHanging } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { Context } from "../Contex/Context.jsx";

export default function Node(props) {
  const [
    Algorithm,
    setAlgorithm,
    Visualize,
    setVisualize,
    clear,
    setClear,
    cursor,
    setCursor,
  ] = useContext(Context);
  const {
    isStart,
    isFinish,
    isWall,
    row,
    col,
    isWeight,
    weight,
    onMouseClick,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    setPre_Finish_col,
    setPre_Finish_row,
    setPre_Start_col,
    setPre_Start_row,
  } = props;

  let Icon = null;
  const extraClassName = isStart
    ? (Icon = BiMap) && "node-Start"
    : isFinish
    ? (Icon = GoGoal) && "node-Finish"
    : isWall
    ? "node-Wall"
    : isWeight
    ? (Icon = FaWeightHanging)
    : "";

  return (
    <div
      className={`node ${extraClassName}`}
      id={`node-${row}-${col}`}
      onClick={
        cursor === "weightCursor"
          ? () => onMouseClick(row, col)
          : cursor === "Cursor" && isStart
          ? () => {
              setCursor("startCursor");
              setPre_Start_row(row);
              setPre_Start_col(col);

            }
          : cursor === "Cursor" && isFinish
          ? () => {
              setCursor("endCursor");
              setPre_Finish_row(row);
              setPre_Finish_col(col);
            }
          : cursor === "startCursor" || cursor === "endCursor"
          ? () => {onMouseClick(row, col);setCursor("Cursor");}
          : undefined
      }
      onMouseDown={
        cursor === "Cursor" ? () => onMouseDown(row, col) : undefined
      }
      onMouseEnter={
        cursor === "Cursor" ? () => onMouseEnter(row, col) : undefined
      }
      onMouseUp={cursor === "Cursor" ? () => onMouseUp() : undefined}
    >
      {Icon && <Icon className={`nodeIcon`} />}
      {weight > 1 && isWeight && <h3 className="weight">{weight}</h3>}
    </div>
  );
}
