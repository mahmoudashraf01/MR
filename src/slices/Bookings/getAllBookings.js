import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

// ------------------------
// Fetch All Bookings
// ------------------------
export const fetchAllBookings = createAsyncThunk(
    "bookings/fetchAllBookings",
    async (arg, { rejectWithValue, getState }) => {
        try {
            const token = getState().saveToken.token;
            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            let page = 1;
            let params = {};

            if (typeof arg === "number" || typeof arg === "string") {
                page = Number(arg) || 1;
            } else if (typeof arg === "object" && arg !== null) {
                page = arg.page || 1;
                const { page: _, ...rest } = arg;
                params = rest;
            }

            const queryParams = new URLSearchParams();
            queryParams.append("page", page);

            if (params.search) queryParams.append("search", params.search);
            if (params.status) queryParams.append("status", params.status);
            if (params.city) queryParams.append("city", params.city);
            if (params.booking_date) queryParams.append("booking_date", params.booking_date);

            const response = await axios.get(`${baseURL}/bookings?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Fetched bookings:", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch bookings"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const getAllBookingsSlice = createSlice({
    name: "getAllBookings",
    initialState: {
        bookings: [],
        totalPages: 1,
        totalBookings: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload.data || [];
                state.totalBookings = action.payload.meta?.total || 0;
                // Assuming pagination meta structure is similar to machines API
                // If not, we might need to adjust. Usually meta.total and per_page (10)
                state.totalPages = Math.ceil((action.payload.meta?.total || 0) / 10) || 1;
            })
            .addCase(fetchAllBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const getAllBookingsReducer = getAllBookingsSlice.reducer;
