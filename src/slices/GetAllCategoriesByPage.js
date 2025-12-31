import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../Helpers/const/const";


// ------------------------
// Fetch Public Machines
// ------------------------
export const fetchCategories = createAsyncThunk(
    "categpries/fetchCategories",
    async (page, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/categories?page=${page}`);

            console.log("Fetched categories by page:", response.data);
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch categories"
            );
        }
    }
);


// ------------------------
// Slice
// ------------------------
const categoriesSlice = createSlice({
    name: "categoriesByPage",
    initialState: {
        categories: [],
        totalCategories: 1,
        totalPages: 1,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;

                // API RESPONSE STRUCTURE
                state.categories = action.payload.data || [];
                state.totalCategories = action.payload.meta.total || 1;
                state.totalPages = action.payload.meta.last_page;
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const getAllCategoriesByPage = categoriesSlice.reducer;
