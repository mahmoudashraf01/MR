import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../Helpers/const/const";


// ------------------------
// Fetch Public Machines
// ------------------------
export const fetchPublicMachines = createAsyncThunk(
    "machines/fetchPublicMachines",
    async (arg, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            // Get existing search params from state if available, or default to empty
            const storedParams = state.machinesByPage?.searchParams || {};

            let page = 1;
            let params = {};

            // If arg is a number/string, it's just a page change; preserve existing filters
            if (typeof arg === 'number' || typeof arg === 'string') {
                page = arg;
                params = { ...storedParams };
            }
            // If arg is an object, it's a new search/filter; update params
            else if (typeof arg === 'object' && arg !== null) {
                // If page is provided in object, use it, otherwise default to 1
                page = arg.page || 1;
                // Exclude page from params to be stored
                const { page: _, ...rest } = arg;
                params = { ...rest };
            }

            // Construct query parameters
            const queryParams = new URLSearchParams();
            queryParams.append('page', page);

            if (params.search) queryParams.append('search', params.search);
            if (params.category_id) queryParams.append('category_id', params.category_id);
            if (params.location_city) queryParams.append('location_city', params.location_city);
            if (params.sort) queryParams.append('sort', params.sort);
            if (params.min_rate !== undefined) queryParams.append('min_rate', params.min_rate);
            if (params.max_rate !== undefined) queryParams.append('max_rate', params.max_rate);
            if (params.company_id) queryParams.append('company_id', params.company_id);

            const response = await axios.get(`${baseURL}/machines/public?${queryParams.toString()}`);

            console.log("Fetched machines by page:", response.data);

            // Return data along with the params used, so we can update state
            return {
                ...response.data,
                params: params
            };

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
        categories: [],
        companies: [],
        totalMachines: 1,
        totalPages: 1,
        loading: false,
        error: null,
        searchParams: {}, // Store current search filters
    },

    reducers: {
        clearSearchParams: (state) => {
            state.searchParams = {};
        }
    },

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
                state.totalMachines = action.payload.meta.total || 1;
                state.totalPages = Math.ceil(action.payload.meta.total / 10) || 1;

                // Update search params in state
                if (action.payload.params) {
                    state.searchParams = action.payload.params;
                }

                // Extract all categories from all machines
                state.categories = action.payload.data?.flatMap(machine => machine.category || []) || [];
                console.log('MachineCategories', state.categories)
                // Extract all companies from all machines
                state.companies = action.payload.data?.flatMap(machine => machine.company || []) || [];
                console.log('MachineCategories', state.companies)
            })

            .addCase(fetchPublicMachines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const { clearSearchParams } = machinesSlice.actions;
export const getPublicMachinesByPage = machinesSlice.reducer;
