import React from "react";
import { useDrag } from "react-dnd";

const ControlBlock = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CONTROL",
    item: { type, category: "control" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 m-2 bg-green-200 rounded cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {label}
    </div>
  );
};

export default ControlBlock;
