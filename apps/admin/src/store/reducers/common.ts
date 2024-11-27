import { createSlice } from "@reduxjs/toolkit";

const CommonReducer = createSlice({
  name: "common",
  initialState: {
    loading: false,
  },
  reducers: {
    handleLoadingChange(state, { payload }) {
      state.loading = payload;
    },
  },
});

export default CommonReducer.reducer;

export const { handleLoadingChange } = CommonReducer.actions;
