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
            const response = await axios.get(`${baseURL}/categories`);

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
        subCategories: [],
        totalCategories: 1,
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
                console.log('categories', state.categories)

                // Extract all subcategories from all categories
                state.subCategories = action.payload.data?.flatMap(category => category.sub_categories || []) || [];
                console.log('subCategories', state.subCategories)
            })

            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const getAllCategoriesByPage = categoriesSlice.reducer;
