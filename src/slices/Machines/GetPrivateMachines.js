import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

// ------------------------
// Fetch Private Machines Thunk
// ------------------------
export const fetchPrivateMachines = createAsyncThunk(
    "machines/fetchPrivateMachines",
    async (page = 1, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const response = await axios.get(`${baseURL}/machines`, {
                params: { page },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Fetched private machines:", response.data);
            return response.data;

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
const privateMachinesSlice = createSlice({
    name: "privateMachines",
    initialState: {
        machines: [],
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrivateMachines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPrivateMachines.fulfilled, (state, action) => {
                state.loading = false;
                state.machines = action.payload.data || [];
                state.totalPages = action.payload.meta?.last_page || 1;
            })
            .addCase(fetchPrivateMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const getPrivateMachinesReducer = privateMachinesSlice.reducer;
