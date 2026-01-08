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


export const fetchCategoryById = createAsyncThunk(
    "categories/fetchCategoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/categories/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch category"
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
        selectedCategory: null,
        totalCategories: 1,
        loading: false,
        error: null,
    },

    reducers: {
        clearSelectedCategory(state) {
            state.selectedCategory = null;
        }
    },

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
            })

            // Fetch Category By ID cases
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload.data;
            })
            .addCase(fetchCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export const { clearSelectedCategory } = categoriesSlice.actions;
export const getAllCategoriesByPage = categoriesSlice.reducer;
