import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

// ------------------------
// Update Booking Status
// ------------------------
export const updateBookingStatus = createAsyncThunk(
    "bookings/updateBookingStatus",
    async ({ bookingId, status }, { rejectWithValue, getState }) => {
        try {
            const token = getState().saveToken.token;
            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const bookingsEndpoint = privateEndpoints.get("bookingsEndpoint");

            const response = await axios.request({
                method: 'PATCH',
                url: `${bookingsEndpoint}/${bookingId}/status`,
                data: { status },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return { bookingId, status, data: response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update booking status"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const changeBookingStatusSlice = createSlice({
    name: "changeBookingStatus",
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetStatusUpdateState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateBookingStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateBookingStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateBookingStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetStatusUpdateState } = changeBookingStatusSlice.actions;
export default changeBookingStatusSlice.reducer;
