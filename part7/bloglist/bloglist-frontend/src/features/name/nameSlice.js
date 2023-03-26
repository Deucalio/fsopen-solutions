import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    activeUser: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { activeUser } = nameSlice.actions;

export default nameSlice.reducer;
