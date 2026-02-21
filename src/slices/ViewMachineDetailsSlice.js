import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { publicEndpoints } from "../store/api/endPoints";

// =====================================================
// 1) Thunk Function — Get Machine Details by ID
// =====================================================
export const getMachineDetailsThunk = createAsyncThunk(
    "machineDetails/getMachineDetails",
    async (id, { rejectWithValue }) => {
        try {
            const machineDetailsEndpoint = publicEndpoints.get("machineDetailsEndpoint");

            const response = await axios.get(`${machineDetailsEndpoint}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch machine details"
            );
        }
    }
);

// =====================================================
// 2) Slice
// =====================================================
const machineDetailsSlice = createSlice({
    name: "machineDetails",

    initialState: {
        data: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(getMachineDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.data = null;
            })

            // Fulfilled
            .addCase(getMachineDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })

            // Rejected
            .addCase(getMachineDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const machineBookingDetailsReducer = machineDetailsSlice.reducer;
