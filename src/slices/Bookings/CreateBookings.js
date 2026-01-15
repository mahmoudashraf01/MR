
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

// ======================
// Base URL
// ======================
const BASE_URL = `${baseURL}/bookings`;
// ======================
// Thunk: Create Booking
// ======================
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.saveToken?.token;

      if (!token) {
        return rejectWithValue("User not authenticated");
      }

      console.log("Creating booking with data:", bookingData);
      console.log("Using token:", token);
      const response = await axios.post(
        BASE_URL,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create booking"
      );
    }
  }
);

// ======================
// Slice
// ======================
const createBookingSlice = createSlice({
  name: "createBooking",
  initialState: {
    data: null,
    isLoading: false,
    isSuccess: false,
    error: null,
  },
  reducers: {
    resetCreateBookingState: (state) => {
      state.data = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------- Pending ----------
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      // ---------- Fulfilled ----------
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      // ---------- Rejected ----------
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// ======================
// Exports
// ======================
export const { resetCreateBookingState } = createBookingSlice.actions;
export const CreateBookingReducer =  createBookingSlice.reducer;
