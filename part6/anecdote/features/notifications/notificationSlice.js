import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const anecdote = action.payload;
      return (state = `You voted '${anecdote}' `);
    },
  },
});

export const { showNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
