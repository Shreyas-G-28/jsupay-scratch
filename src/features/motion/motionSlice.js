import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: { x: 0, y: 0 },
  rotation: 0,
  history: [],
  action: [],
};

const motionSlice = createSlice({
  name: "motion",
  initialState,
  reducers: {
    moveForward: (state, action) => {
      state.position.x += action.payload;
      state.history.push({ type: "Move 10 Steps Forward" });
    },
    rotateClockwise: (state, action) => {
      state.rotation += action.payload;
      state.history.push({ type: "Rotate Clockwise" });
    },
    rotateAntiClockwise: (state, action) => {
      state.rotation -= action.payload;
      state.history.push({
        type: "Rotate Anti-clockwise",
      });
    },
    goToRandomPosition: (state) => {
      state.position.x = Math.random() * 100;
      state.position.y = Math.random() * 100;
      state.history.push({ type: "Go To Random Position" });
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  moveForward,
  rotateClockwise,
  rotateAntiClockwise,
  goToRandomPosition,
  clearHistory,
} = motionSlice.actions;

export default motionSlice.reducer;
