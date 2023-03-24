import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "../features/anecdotes/anecdotesSlice";

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
  },
});
