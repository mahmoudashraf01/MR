import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// =====================================================
// 1) Thunk Function — Get Machine Details by ID
// =====================================================
export const getMachineDetailsThunk = createAsyncThunk(
    "machineDetails/getMachineDetails",
    async (id, { rejectWithValue }) => {
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const TOKEN = import.meta.env.VITE_AUTH_TOKEN_KEY;

            const response = await axios.get(`${BASE_URL}/machines/public/${id}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });

            return response.data.data; // داتا الماشين
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

export default machineDetailsSlice.reducer;
