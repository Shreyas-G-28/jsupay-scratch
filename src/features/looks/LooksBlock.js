import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  sayHello,
  sayHelloFor4Sec,
  thinkHmm,
  thinkHmmFor4Sec,
} from "../looks/looksSlice";
import { addToHistory } from "../events/eventsSlice";

const LooksBlock = ({ type, label }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "LOOKS",
    item: { type, category: "looks" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    switch (type) {
      case "sayHello":
        dispatch(sayHello());
        dispatch(addToHistory({ type: "Say Hello" }));

        break;
      case "sayHelloFor4Sec":
        dispatch(sayHelloFor4Sec());
        dispatch(addToHistory({ type: "Say Hello for 4 sec" }));

        break;
      case "thinkHmm":
        dispatch(thinkHmm());
        dispatch(addToHistory({ type: "Think Hmm..." }));

        break;
      case "thinkHmmFor4Sec":
        dispatch(thinkHmmFor4Sec());
        dispatch(addToHistory({ type: "THink Hmm for 4 sec" }));

        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={drag}
      className={`p-2 m-2 bg-purple-200 rounded cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default LooksBlock;
