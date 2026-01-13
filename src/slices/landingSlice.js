import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from '../Helpers/const/const';

export const getAllMachinesThunk = createAsyncThunk(
    "machines/getAllMachines",
    async (params = {}, thunkAPI) => {
        try {
            // const baseURL = import.meta.env.VITE_BASE_URL;

            const { search, category_id, location_city, from_date, to_date } = params;

            const response = await axios.get(`${baseURL}/machines/public`, {
                params: {
                    search,
                    category_id,
                    location_city,
                    from_date,
                    to_date
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let machines = response.data.data || [];

            // Only slice if no search params are provided (default landing page behavior)
            const isSearch = search || category_id || location_city || from_date || to_date;
            
            if (!isSearch) {
                machines = machines
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
                    .slice(0, 6);
            }

            return machines;
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
