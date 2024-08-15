import { configureStore } from "@reduxjs/toolkit";
import controlReducer from "../features/control/controlSlice";
import motionReducer from "../features/motion/motionSlice";
import looksReducer from "../features/looks/looksSlice";
import eventsReducer from "../features/events/eventsSlice";

const store = configureStore({
  reducer: {
    control: controlReducer,
    motion: motionReducer,
    looks: looksReducer,
    events: eventsReducer,
  },
});

export  default store;
