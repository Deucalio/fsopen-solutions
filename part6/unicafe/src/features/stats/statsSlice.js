import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    feedback: (state, action) => {
      const key = action.payload;
      if (!key) {
        return (state = initialState);
      }
      state[key] += 1;
    },
  },
});

export const { feedback } = statsSlice.actions;

export default statsSlice.reducer;
