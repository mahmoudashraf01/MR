import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../Helpers/const/const";


// ------------------------
// Fetch Public Machines
// ------------------------
export const fetchPublicMachines = createAsyncThunk(
    "machines/fetchPublicMachines",
    async (page, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/machines/public?page=${page}`);

            return response.data;
            // الـ API بيرجع:
            // { machines: [...], total_pages: X, current_page: Y }
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch machines"
            );
        }
    }
);


// ------------------------
// Slice
// ------------------------
const machinesSlice = createSlice({
    name: "machines",
    initialState: {
        machines: [],
        totalPages: 1,
        currentPage: 1,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicMachines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchPublicMachines.fulfilled, (state, action) => {
                state.loading = false;

                // API RESPONSE STRUCTURE
                state.machines = action.payload.machines || [];
                state.totalPages = action.payload.total_pages || 1;
                state.currentPage = action.payload.current_page || 1;
            })

            .addCase(fetchPublicMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default machinesSlice.reducer;
