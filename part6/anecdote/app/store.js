import { configureStore } from "@reduxjs/toolkit";
import anecdotesReducer from "../features/anecdotes/anecdotesSlice";
import notificationReducer from "../features/notifications/notificationSlice";

export const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
  },
});
