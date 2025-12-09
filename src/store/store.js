import { configureStore } from "@reduxjs/toolkit";
import { registerCompnayReducer } from "../slices/RegisterCompanySlice";
import { getAllMachinesReducer } from "../slices/landingSlice";
import { machineBookingDetailsReducer } from "../slices/ViewMachineDetailsSlice";
import { registerRenterReducer } from "../slices/RegisterRenterSlice";
import { loginReducer } from "../slices/LoginSlice";
import { saveTokenReducer } from "../slices/SaveTokenSlice";

export const store = configureStore({
  reducer: {
    registerCompany: registerCompnayReducer,
    registerRenter: registerRenterReducer,
    login: loginReducer,
    saveToken: saveTokenReducer,
    machines: getAllMachinesReducer,
    machineBokkingDetails: machineBookingDetailsReducer,
  },
});
