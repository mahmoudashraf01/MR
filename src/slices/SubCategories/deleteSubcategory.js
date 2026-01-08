import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

export const deleteSubCategory = createAsyncThunk(
    "subCategories/deleteSubCategory",
    async (subCategoryId, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;
            console.log("TOKEN =>", token);
            const response = await axios.delete(
                `${baseURL}/sub-categories/${subCategoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to delete subcategory"
            );
        }
    }
);

const deleteSubCategorySlice = createSlice({
    name: "deleteSubCategory",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetDeleteSubCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteSubCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetDeleteSubCategory } = deleteSubCategorySlice.actions;
export const deleteSubCategoryReducer = deleteSubCategorySlice.reducer;
