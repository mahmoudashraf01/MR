import { configureStore } from "@reduxjs/toolkit";
import { registerCompnayReducer } from "../slices/RegisterCompanySlice";
import { getAllMachinesReducer } from "../slices/landingSlice";
import { machineBookingDetailsReducer } from "../slices/ViewMachineDetailsSlice";
import { registerRenterReducer } from "../slices/RegisterRenterSlice";
import { loginReducer } from "../slices/Auth/LoginSlice";
import { saveTokenReducer } from "../slices/SaveTokenSlice";
import { getPublicMachinesByPage } from "../slices/GetAllmachinesByPage";
import { CreateBookingReducer } from "../slices/Bookings/CreateBookings";
import { getAllCategoriesByPage } from "../slices/Categories/GetAllCategoriesByPage";
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
import { listUsersReducer } from "../slices/UsersManagment/ListUsers";
import { deleteUserReducer } from "../slices/UsersManagment/DeleteUsers";
import { updateUserReducer } from "../slices/UsersManagment/UpdateUser";
import { getPrivateMachinesReducer } from "../slices/Machines/GetPrivateMachines";
import { createMachineReducer } from "../slices/Machines/CreateMachine";
import { updateMachineReducer } from "../slices/Machines/UpdateMachine";
import { deleteMachineReducer } from "../slices/Machines/DeleteMachine";
import { profileReducer } from "../slices/Auth/Profile";
import { updateProfileReducer } from "../slices/Auth/UpdateProfile";



export const store = configureStore({
  reducer: {
    registerCompany: registerCompnayReducer,
    registerRenter: registerRenterReducer,
    login: loginReducer,
    saveToken: saveTokenReducer,
    profile: profileReducer,
    updateProfile: updateProfileReducer,
    machines: getAllMachinesReducer,
    machinesByPage: getPublicMachinesByPage,
    privateMachines: getPrivateMachinesReducer,
    createMachine: createMachineReducer,
    deleteMachine: deleteMachineReducer,
    updateMachine: updateMachineReducer,
    categoriesByPage: getAllCategoriesByPage,
    machineBokkingDetails: machineBookingDetailsReducer,
    createBooking: CreateBookingReducer,
    distance: distanceReducer,
    createCategory: CreateCategoryReducer,
    createSubCategory: createSubCategoryReducer,
    deleteCategory: deleteCategoryReducer,
    deleteSubCategory: deleteSubCategoryReducer,
    updateCategory: updateCategoryReducer,
    listUsers: listUsersReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    getAllBookings: getAllBookingsReducer,
    changeBookingStatus: changeBookingStatusReducer,
    changePassword: changePasswordReducer,
    statistics: statisticsReducer,
  },
});
