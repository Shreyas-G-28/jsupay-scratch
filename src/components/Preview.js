import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { executeEventActions } from "../features/events/eventsSlice";
import CatSprite from "./CatSprite";
import redFlag from "./icons/red-flag.png";

const Preview = () => {
  const dispatch = useDispatch();
  const { position, rotation } = useSelector((state) => state.motion);
  const { message } = useSelector((state) => state.looks);
  const events = useSelector((state) => state.events.events);
  const history = useSelector((state) => state.events.history);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        const spacebarEvent = events.find(
          (event) => event.name === "spacebarPressed"
        );
        if (spacebarEvent) {
          dispatch(executeEventActions(spacebarEvent.id));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [events, dispatch]);

  // Handling Flag Click
  const handleFlagClick = () => {
    const flagEvent = events.find((event) => event.name === "flagClicked");
    console.log(flagEvent, "flagEvent");

    if (flagEvent) {
      dispatch(executeEventActions(flagEvent.id));
    }
  };
  const spriteRef = useRef(null);

  useEffect(() => {
    const handleSpriteClick = () => {
      const spriteClickEvent = events.find(
        (event) => event.name === "spriteClicked"
      );
      if (spriteClickEvent) {
        dispatch(executeEventActions(spriteClickEvent.id));
      }
    };

    const spriteElement = spriteRef.current;

    if (spriteElement) {
      spriteElement.addEventListener("click", handleSpriteClick);
    }

    return () => {
      if (spriteElement) {
        spriteElement.removeEventListener("click", handleSpriteClick);
      }
    };
  }, [events, dispatch]);

  // Handling the sprite click
  const handleSpriteClick = () => {
    events.forEach((event) => {
      if (event.name === "spriteClicked") {
        dispatch(executeEventActions(event.id));
      }
    });
  };

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center">
      <div
        className="absolute  w-50 h-10 flex items-center justify-center cursor-pointer"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        }}
        onClick={handleSpriteClick}
      >
        <CatSprite />
      </div>
      <div className="absolute bottom-4 text-lg font-semibold">{message}</div>
      <div
        className="absolute w-20 h-20 top-0 right-0 p-4 flex space-x-4"
        onClick={handleFlagClick}
      >
        <img
          src={redFlag}
          alt="redFlag"
          className="bg-white-500 text-white p-2 rounded cursor-pointer"
        ></img>
      </div>
      <div className="absolute top-0 left-0 p-4 w-fullborder-t border-gray-200 overflow-y-auto ">
        <h4 className="text-lg font-semibold">Action History</h4>
        <ul>
          {history.map((item, index) => (
            <li key={index} className="text-gray-800">{`${item.type} ${
              item.payload ? `(${item.payload})` : ""
            }`}</li>
          ))}
        </ul>
      </div>{" "}
    </div>
  );
};

export default Preview;
