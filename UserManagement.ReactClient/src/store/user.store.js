import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
