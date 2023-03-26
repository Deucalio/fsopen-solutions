import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      return (state = "new blog added");
    },
    hideNotification: (state,action) => {
        return state = ""
    }
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
