import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addEvent,
  addActionToEvent,
  clearAllEvents,
} from "../features/events/eventsSlice";
import { executeEventActions } from "../features/events/eventsSlice";
import {
  moveForward,
  rotateClockwise,
  rotateAntiClockwise,
  goToRandomPosition,
} from "../features/motion/motionSlice";
import {
  sayHello,
  sayHelloFor4Sec,
  thinkHmm,
  thinkHmmFor4Sec,
} from "../features/looks/looksSlice";
import {
  ifCondition,
  repeat,
  forever,
  clearConditions,
} from "../features/control/controlSlice";

const DragDropArea = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const conditions = useSelector((state) => state.control.conditions);

  const [{ isOver }, drop] = useDrop({
    accept: ["EVENT", "MOTION", "LOOKS", "CONTROL"],
    drop: (item) => {
      if (item.category === "event") {
        dispatch(addEvent({ id: Date.now(), name: item.type }));
      } else if (
        item.category === "motion" ||
        item.category === "looks" ||
        item.category === "control"
      ) {
        const lastEvent = events[events.length - 1];
        if (lastEvent) {
          dispatch(addActionToEvent({ eventId: lastEvent.id, action: item }));
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const executeAction = (action) => {
    switch (action.type) {
      case "moveForward":
        dispatch(moveForward(action.payload));
        break;
      case "rotateClockwise":
        dispatch(rotateClockwise(action.payload));
        break;
      case "rotateAntiClockwise":
        dispatch(rotateAntiClockwise(action.payload));
        break;
      case "goToRandomPosition":
        dispatch(goToRandomPosition());
        break;
      case "sayHello":
        dispatch(sayHello());
        break;
      case "sayHelloFor4Sec":
        dispatch(sayHelloFor4Sec());
        break;
      case "thinkHmm":
        dispatch(thinkHmm());
        break;
      case "thinkHmmFor4Sec":
        dispatch(thinkHmmFor4Sec());
        break;
      default:
        break;
    }
  };

  const executeControlActions = (control) => {
    switch (control.type) {
      case "ifCondition":
        if (control.condition) {
          control.actions.forEach((action) => executeAction(action));
        }
        break;
      case "repeat":
        for (let i = 0; i < control.times; i++) {
          control.actions.forEach((action) => executeAction(action));
        }
        break;
      case "forever":
        const intervalId = setInterval(() => {
          control.actions.forEach((action) => executeAction(action));
        }, 1000);
        dispatch(clearConditions());
        break;
      default:
        break;
    }
  };

  const handleSpacebarPress = () => {
    events.forEach((event) => {
      if (event.name === "spacebarPressed") {
        executeControlActions(event);
      }
    });
  };

  return (
    <div
      ref={drop}
      className={`w-500 h-full bg-gray-100 p-4 rounded ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      Drag and drop Events
      {events.map((event) => (
        <div key={event.id} className="mb-2">
          <h4>{event.name}</h4>
          <ul>
            {event.actions.map((action, index) => (
              <li key={index} className="ml-4">
                {action.type}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DragDropArea;
