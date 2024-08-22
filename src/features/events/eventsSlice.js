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
              addToHistory({
                type: "Move 10 steps forward",
                payload: action.payload,
              })
            );
            break;
          case "rotateClockwise":
            dispatch(rotateClockwise(45));
            dispatch(
              addToHistory({
                type: "Rotate Clockwise",
                payload: action.payload,
              })
            );
            break;
          case "rotateAntiClockwise":
            dispatch(rotateAntiClockwise(-45));
            dispatch(
              addToHistory({
                type: "Rotate Anti-clockwise",
                payload: action.payload,
              })
            );
            break;
          case "goToRandomPosition":
            dispatch(goToRandomPosition());
            dispatch(addToHistory({ type: "Go To Random Position" }));
            break;
          case "sayHello":
            dispatch(sayHello());
            dispatch(addToHistory({ type: "Say Hello" }));
            break;
          case "sayHelloFor4Sec":
            dispatch(sayHelloFor4Sec());
            dispatch(addToHistory({ type: "Say Hello For 4Sec" }));
            break;
          case "thinkHmm":
            dispatch(thinkHmm());
            dispatch(addToHistory({ type: "Think Hmm" }));
            break;
          case "thinkHmmFor4Sec":
            dispatch(thinkHmmFor4Sec());
            dispatch(addToHistory({ type: "Think Hmm For 4Sec" }));
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
