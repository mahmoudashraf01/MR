import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMachinesThunk = createAsyncThunk(
    "machines/getAllMachines",
    async (_, thunkAPI) => {
        try {
            const baseURL = import.meta.env.VITE_BASE_URL;

            const response = await axios.get(`${baseURL}/public/machines`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // API response: response.data.data = array of machines
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch machines"
            );
        }
    }
);

const initialState = {
    machines: [],
    loading: false,
    error: null,
};

const machinesSlice = createSlice({
    name: "machines",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMachinesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMachinesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.machines = action.payload;
            })
            .addCase(getAllMachinesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export const getAllMachinesReducer = machinesSlice.reducer;
