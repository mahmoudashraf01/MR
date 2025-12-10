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

            console.log("Fetched machines by page:", response.data);
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
    name: "machinesByPage",
    initialState: {
        machines: [],
        totalPages: 1,
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
                state.machines = action.payload.data || [];
                state.totalPages = action.payload.meta.total  || 1;
            })

            .addCase(fetchPublicMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const getPublicMachinesByPage =  machinesSlice.reducer;
