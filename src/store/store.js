import { configureStore } from "@reduxjs/toolkit";
import { registerCompnayReducer } from "../slices/RegisterCompanySlice";
import { getAllMachinesReducer } from "../slices/landingSlice";
import { machineBookingDetailsReducer } from "../slices/ViewMachineDetailsSlice";
import { registerRenterReducer } from "../slices/RegisterRenterSlice";
import { loginReducer } from "../slices/LoginSlice";
import { saveTokenReducer } from "../slices/SaveTokenSlice";
import { getPublicMachinesByPage } from "../slices/GetAllmachinesByPage";
import { CreateBookingReducer } from "../slices/Bookings/CreateBookings";
import { getAllCategoriesByPage } from "../slices/GetAllCategoriesByPage";
import { CreateCategoryReducer } from "../slices/Categories/CreateCategory";
import { deleteCategoryReducer } from "../slices/Categories/DeleteCategory";

export const store = configureStore({
  reducer: {
    registerCompany: registerCompnayReducer,
    registerRenter: registerRenterReducer,
    login: loginReducer,
    saveToken: saveTokenReducer,
    machines: getAllMachinesReducer,
    machinesByPage: getPublicMachinesByPage,
    categoriesByPage: getAllCategoriesByPage,
    machineBokkingDetails: machineBookingDetailsReducer,
    createBooking: CreateBookingReducer,
    createCategory: CreateCategoryReducer,
    deleteCategory: deleteCategoryReducer,
  },
});
