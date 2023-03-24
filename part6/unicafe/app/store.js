import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "../src/features/stats/statsSlice";

export const store = configureStore({
  reducer: {
    stats: statsReducer,
  },
});
