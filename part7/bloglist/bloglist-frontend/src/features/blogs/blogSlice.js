import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    allBlogs: (state, action) => {
      return (state = [...action.payload]);
    },
  },
});

export const { allBlogs, increaseLike } = blogSlice.actions;

export default blogSlice.reducer;
