import { createSlice } from "@reduxjs/toolkit";

const CommonReducer = createSlice({
  name: "common",
  initialState: {
    name: "111",
  },
  reducers: {
    handleChange(state, { payload }) {
      state.name = payload;
    },
  },
});

export default CommonReducer.reducer;

export const { handleChange } = CommonReducer.actions;
