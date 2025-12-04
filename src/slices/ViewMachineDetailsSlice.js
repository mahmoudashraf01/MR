import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from '../Helpers/const/const';

// =====================================================
// 1) Thunk Function — Get Machine Details by ID
// =====================================================
export const getMachineDetailsThunk = createAsyncThunk(
    "machineDetails/getMachineDetails",
    async (id, { rejectWithValue }) => {
        try {

            const response = await axios.get(`${baseURL}/machines/public/${id}`, {
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
        data: null,          // بيانات الماشين
        loading: false,      // حالة اللودينج
        error: null,         // أي خطأ
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
