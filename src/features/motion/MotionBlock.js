import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  moveForward,
  rotateClockwise,
  rotateAntiClockwise,
  goToRandomPosition,
} from "./motionSlice";
import { addToHistory } from "../events/eventsSlice";

const MotionBlock = ({ type, label }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "MOTION",
    item: { type, category: "motion" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    switch (type) {
      case "moveForward":
        dispatch(moveForward(10));
        dispatch(addToHistory({ type: "Move 10 steps forward" }));
        break;
      case "rotateClockwise":
        dispatch(rotateClockwise(15));
        dispatch(addToHistory({ type: "Rotate Clockwise" }));
        break;
      case "rotateAntiClockwise":
        dispatch(rotateAntiClockwise(15));
        dispatch(addToHistory({ type: "Rotate Anti-clockwise" }));
        break;
      case "goToRandomPosition":
        dispatch(goToRandomPosition());
        dispatch(addToHistory({ type: "Go to Random Position" }));
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={drag}
      className={`p-2 m-2 bg-blue-200 rounded cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default MotionBlock;
