import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./exerciseSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: { exercise: exerciseReducer, user: userReducer },
});
