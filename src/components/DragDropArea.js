import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addEvent,
  addActionToEvent,
  addToHistory,
  clearAllEvents,
  clearHistory,
} from "../features/events/eventsSlice";
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

const DragDropArea = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [actions, setActions] = React.useState([]);

  const [{ isOver }, drop] = useDrop({
    accept: ["EVENT", "MOTION", "LOOKS", "CONTROL"],
    drop: (item) => {
      if (item.category === "event") {
        // Add the event to the list of events
        dispatch(addEvent({ id: Date.now(), name: item.type }));
      } else if (
        item.category === "motion" ||
        item.category === "looks" ||
        item.category === "control"
      ) {
        const lastEvent = events[events.length - 1];
        if (lastEvent) {
          // Add the action to the most recent event
          dispatch(addActionToEvent({ eventId: lastEvent.id, action: item }));
        } else {
          // Add actions directly
          setActions((prevActions) => [...prevActions, item]);
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  //Handling Motions and looks drag and drop
  const executeAction = (action) => {
    switch (action.type) {
      case "moveForward":
        dispatch(moveForward(20));
        break;
      case "rotateClockwise":
        dispatch(rotateClockwise(45));
        break;
      case "rotateAntiClockwise":
        dispatch(rotateAntiClockwise(-45));
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
    dispatch(addToHistory(action));
  };

  //Handling Run button
  const handleRunClick = () => {
    actions.forEach((action) => {
      executeAction(action);
    });
  };

  // Removing all the actions and history
  const handleRemoveAllClick = () => {
    dispatch(clearAllEvents());
    dispatch(clearHistory());
    setActions([]);
  };

  return (
    <div
      ref={drop}
      className={`relative w-500 h-full bg-gray-100 p-4 rounded ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <div className="mb-20">
        <h3 className="text-lg font-semibold">Drag and drop here:</h3>
        {events.map((event) => (
          <div key={event.id} className="mb-2">
            <h3>Events :</h3>
            <h4 className="mt-4 p-2 bg-green-500 text-white rounded">
              {event.name}
            </h4>
            <ul>
              {event.actions.map((action, index) => (
                <li
                  key={index}
                  className="mt-4 p-2 bg-red-500 text-white rounded ml-4"
                >
                  {action.type}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {actions.length > 0 && (
          <div>
            <h3>Direct Actions:</h3>
            {actions.map((action, index) => (
              <div
                key={index}
                className="mt-4 p-2 bg-blue-200 text-black rounded ml-4 mb-2"
              >
                <h4>{action.type}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleRunClick}
        className="absolute bottom-4 left-1/4 transform -translate-x-1/2 p-2 bg-green-500 text-white rounded"
      >
        Run
      </button>
      <button
        onClick={handleRemoveAllClick}
        className="absolute bottom-4 left-3/4 transform -translate-x-1/2 p-2 bg-red-500 text-white p-2 rounded"
      >
        Clear
      </button>
    </div>
  );
};

export default DragDropArea;
