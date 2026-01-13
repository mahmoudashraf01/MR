import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

export const fetchPrivateMachines = createAsyncThunk(
    "machines/fetchPrivateMachines",
    async (arg = 1, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            let page = 1;
            let params = {};

            if (typeof arg === "number" || typeof arg === "string") {
                page = arg;
            } else if (typeof arg === "object" && arg !== null) {
                page = arg.page || 1;
                const { page: _page, ...rest } = arg;
                params = { ...rest };
            }

            const queryParams = new URLSearchParams();
            queryParams.append("page", page);

            if (params.search) queryParams.append("search", params.search);
            if (params.category_id) queryParams.append("category_id", params.category_id);
            if (params.status) queryParams.append("status", params.status);
            if (params.location_city) queryParams.append("location_city", params.location_city);

            const response = await axios.get(`${baseURL}/machines?${queryParams.toString()}`, {
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
        privateCategories:[],
        totalPages: 1,
        searchParams: {},
        loading: false,
        error: null,
    },
    reducers: {
        clearPrivateMachinesFilters: (state) => {
            state.searchParams = {};
        },
    },
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
                // Extract all unique categories from all machines
                const allCategories = action.payload.data?.flatMap(machine => machine.category || []) || [];
                const uniqueCategoriesMap = new Map();
                
                allCategories.forEach(cat => {
                    if (cat && cat.id && !uniqueCategoriesMap.has(cat.id)) {
                        uniqueCategoriesMap.set(cat.id, cat);
                    }
                });
                
                state.privateCategories = Array.from(uniqueCategoriesMap.values());
                console.log("Private Machines Categories:", state.privateCategories);
                if (action.meta && action.meta.arg && typeof action.meta.arg === "object") {
                    const { page, ...rest } = action.meta.arg;
                    state.searchParams = { ...rest };
                }
            })
            .addCase(fetchPrivateMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPrivateMachinesFilters } = privateMachinesSlice.actions;
export const getPrivateMachinesReducer = privateMachinesSlice.reducer;
