import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  moveForward,
  rotateClockwise,
  rotateAntiClockwise,
  goToRandomPosition,
} from "../motion/motionSlice";
import {
  sayHello,
  sayHelloFor4Sec,
  thinkHmm,
  thinkHmmFor4Sec,
} from "../looks/looksSlice";
import { ifCondition, repeat, forever } from "../control/controlSlice";

const initialState = {
  events: [],
  history: [],
};

export const executeEventActions = createAsyncThunk(
  "events/executeEventActions",
  async (eventId, { dispatch, getState }) => {
    const state = getState();
    const event = state.events.events.find((event) => event.id === eventId);

    if (event) {
      for (const action of event.actions) {
        switch (action.type) {
          case "moveForward":
            dispatch(moveForward(20));
            dispatch(
              addToHistory({ type: "moveForward", payload: action.payload })
            );
            break;
          case "rotateClockwise":
            dispatch(rotateClockwise(45));
            dispatch(
              addToHistory({ type: "rotateClockwise", payload: action.payload })
            );
            break;
          case "rotateAntiClockwise":
            dispatch(rotateAntiClockwise(-45));
            dispatch(
              addToHistory({
                type: "rotateAntiClockwise",
                payload: action.payload,
              })
            );
            break;
          case "goToRandomPosition":
            dispatch(goToRandomPosition());
            dispatch(addToHistory({ type: "goToRandomPosition" }));
            break;
          case "sayHello":
            dispatch(sayHello());
            dispatch(addToHistory({ type: "sayHello" }));
            break;
          case "sayHelloFor4Sec":
            dispatch(sayHelloFor4Sec());
            dispatch(addToHistory({ type: "sayHelloFor4Sec" }));
            break;
          case "thinkHmm":
            dispatch(thinkHmm());
            dispatch(addToHistory({ type: "thinkHmm" }));
            break;
          case "thinkHmmFor4Sec":
            dispatch(thinkHmmFor4Sec());
            dispatch(addToHistory({ type: "thinkHmmFor4Sec" }));
            break;
          case "ifCondition":
            dispatch(ifCondition(action.payload));
            dispatch(
              addToHistory({ type: "ifCondition", payload: action.payload })
            );
            break;
          case "repeat":
            dispatch(repeat(action.payload));
            dispatch(addToHistory({ type: "repeat", payload: action.payload }));
            break;
          case "forever":
            dispatch(forever(action.payload));
            dispatch(
              addToHistory({ type: "forever", payload: action.payload })
            );
            break;
          default:
            break;
        }
      }
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push({
        id: action.payload.id,
        name: action.payload.name,
        actions: action.payload.actions || [],
      });
    },
    addActionToEvent: (state, action) => {
      const event = state.events.find(
        (event) => event.id === action.payload.eventId
      );
      if (event) {
        event.actions.push(action.payload.action);
      }
    },
    clearAllEvents: (state) => {
      state.events = [];
    },
    addToHistory: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  addEvent,
  addActionToEvent,
  clearAllEvents,
  addToHistory,
  clearHistory,
} = eventsSlice.actions;
export default eventsSlice.reducer;
