import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: { x: 0, y: 0 },
  rotation: 0,
  history: [], 
};

const motionSlice = createSlice({
  name: "motion",
  initialState,
  reducers: {
    moveForward: (state, action) => {
      state.position.x += action.payload;
      state.history.push({ type: "moveForward" });
    },
    rotateClockwise: (state, action) => {
      state.rotation += action.payload;
      state.history.push({ type: "rotateClockwise" });
    },
    rotateAntiClockwise: (state, action) => {
      state.rotation -= action.payload;
      state.history.push({
        type: "rotateAntiClockwise",
      });
    },
    goToRandomPosition: (state) => {
      state.position.x = Math.random() * 100; 
      state.position.y = Math.random() * 100;
      state.history.push({ type: "goToRandomPosition" });
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
