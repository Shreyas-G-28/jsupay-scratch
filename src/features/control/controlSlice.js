import { createSlice } from "@reduxjs/toolkit";
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
import { useDispatch } from "react-redux";

const dispatchAction = (action) => {
  const dispatch = useDispatch;
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

const controlSlice = createSlice({
  name: "control",
  initialState: {
    conditions: [], 
  },
  reducers: {
    ifCondition: (state, action) => {
      const { condition, actions } = action.payload;
      if (condition) {
        actions.forEach((action) => {
          dispatchAction(action);
        });
      }
    },
    repeat: (state, action) => {
      const { times, actions } = action.payload;
      for (let i = 0; i < times; i++) {
        actions.forEach((action) => {
          dispatchAction(action);
        });
      }
    },
    forever: (state, action) => {
      const { actions } = action.payload;
      const intervalId = setInterval(() => {
        actions.forEach((action) => {
          dispatchAction(action);
        });
      }, 1000);

      state.conditions.push({ type: "forever", intervalId });
    },
    clearConditions: (state) => {
      state.conditions.forEach((condition) => {
        if (condition.type === "forever") {
          clearInterval(condition.intervalId);
        }
      });
      state.conditions = [];
    },
  },
});

export const { ifCondition, repeat, forever, clearConditions } =
  controlSlice.actions;
export default controlSlice.reducer;
