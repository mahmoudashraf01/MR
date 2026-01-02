import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (categoryId, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;
            console.log("TOKEN =>", token);
            const response = await axios.delete(
                `${baseURL}/categories/${categoryId}`,
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
                error.response?.data || "Failed to delete category"
            );
        }
    }
);

const deleteCategorySlice = createSlice({
    name: "deleteCategory",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetDeleteCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetDeleteCategory } = deleteCategorySlice.actions;
export const deleteCategoryReducer = deleteCategorySlice.reducer;
