import { configureStore } from "@reduxjs/toolkit";
import { registerCompnayReducer } from "../slices/RegisterCompanySlice";
import { getAllMachinesReducer } from "../slices/landingSlice";
import { machineBookingDetailsReducer } from "../slices/ViewMachineDetailsSlice";

export const store = configureStore({
  reducer: {
    registerCompany: registerCompnayReducer,
    machines: getAllMachinesReducer,
    machineBokkingDetails: machineBookingDetailsReducer,
  },
});
