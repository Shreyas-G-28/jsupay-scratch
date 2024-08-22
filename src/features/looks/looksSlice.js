import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sayHelloFor4Sec = createAsyncThunk(
  "looks/sayHelloFor4Sec",
  async (_, { dispatch }) => {
    dispatch(sayHello());
    await new Promise((resolve) => setTimeout(resolve, 4000));
    dispatch(clearMessage());
  }
);

export const thinkHmmFor4Sec = createAsyncThunk(
  "looks/thinkHmmFor4Sec",
  async (_, { dispatch }) => {
    dispatch(thinkHmm());
    await new Promise((resolve) => setTimeout(resolve, 4000));
    dispatch(clearMessage());
  }
);

const initialState = {
  message: "",
  history: [],
};

const looksSlice = createSlice({
  name: "looks",
  initialState,
  reducers: {
    sayHello: (state) => {
      state.message = "Hello";
      state.history.push({ type: "Say Hello" });
    },
    thinkHmm: (state) => {
      state.message = "Hmm...";
      state.history.push({ type: "Think Hmm" });
    },
    clearMessage: (state) => {
      return initialState;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sayHelloFor4Sec.fulfilled, (state) => {
        state.message = "";
      })
      .addCase(thinkHmmFor4Sec.fulfilled, (state) => {
        state.message = "";
      });
  },
});

export const { sayHello, thinkHmm, clearMessage, clearHistory } =
  looksSlice.actions;

export default looksSlice.reducer;
