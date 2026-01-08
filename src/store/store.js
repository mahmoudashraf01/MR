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
import { getAllBookingsReducer } from "../slices/Bookings/getAllBookings";
import { changePasswordReducer } from "../slices/Auth/ChangePassword";
import { distanceReducer } from "../slices/Bookings/CalcDistance";
import { statisticsReducer } from "../slices/Dashboard/Statistics";
import changeBookingStatusReducer from "../slices/Bookings/ChangeBookingStatus";
import { createSubCategoryReducer } from "../slices/SubCategories/CreateSubCategory";
import { deleteSubCategoryReducer } from "../slices/SubCategories/deleteSubcategory";
import { updateCategoryReducer } from "../slices/Categories/UpdateCateogry";



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
    distance: distanceReducer,
    createCategory: CreateCategoryReducer,
    createSubCategory: createSubCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    deleteSubCategory: deleteSubCategoryReducer,
    updateCategory: updateCategoryReducer,
    getAllBookings: getAllBookingsReducer,
    changeBookingStatus: changeBookingStatusReducer,
    changePassword: changePasswordReducer,
    statistics: statisticsReducer,
  },
});
