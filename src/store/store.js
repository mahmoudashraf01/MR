import { configureStore } from "@reduxjs/toolkit";
import { registerCompnayReducer } from "../slices/RegisterCompanySlice";
import { getAllMachinesReducer } from "../slices/landingSlice";
import { machineBookingDetailsReducer } from "../slices/ViewMachineDetailsSlice";
import { registerRenterReducer } from "../slices/RegisterRenterSlice";

export const store = configureStore({
  reducer: {
    registerCompany: registerCompnayReducer,
    registerRenter: registerRenterReducer,
    machines: getAllMachinesReducer,
    machineBokkingDetails: machineBookingDetailsReducer,
  },
});
