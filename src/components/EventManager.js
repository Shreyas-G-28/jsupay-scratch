import React from "react";
import { useDispatch } from "react-redux";
import { addEvent, addControlBlock } from "../features/events/eventsSlice";

const EventManager = () => {
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    const newEvent = {
      id: "flagClicked",
      name: "Flag Clicked",
    };
    dispatch(addEvent(newEvent));
  };

  const handleAddActionToEvent = () => {
    const action = {
      eventId: "flagClicked",
      action: { type: "moveForward", value: 10 },
    };
    dispatch(addControlBlock(action));
  };

  return (
    <div>
      <button onClick={handleAddEvent}>Add Flag Clicked Event</button>
      <button onClick={handleAddActionToEvent}>
        Add Move Forward to Flag Clicked Event
      </button>
    </div>
  );
};

export default EventManager;
