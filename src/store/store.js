import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { getAllMachinesReducer } from "../slices/landingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    machines : getAllMachinesReducer,
  },
});
