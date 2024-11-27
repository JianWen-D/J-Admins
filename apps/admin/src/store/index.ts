import { configureStore } from "@reduxjs/toolkit";
import CommonReducer from "./reducers/common";

const store = configureStore({
  reducer: {
    CommonReducer,
  },
});

export default store;
