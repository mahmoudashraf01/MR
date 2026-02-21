import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, data }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const formData = new FormData();
            
            // Append fields if they exist
            if (data.name) formData.append("name", data.name);
            if (data.description) formData.append("description", data.description);
            if (data.image) formData.append("image", data.image);
            
            // Handle boolean or numeric isActive
            if (data.is_active !== undefined && data.is_active !== null) {
                formData.append("is_active", data.is_active ? 1 : 0);
            }
            const categoriesEndpoint = privateEndpoints.get("categoriesEndpoint");

            const response = await axios.post(
                `${categoriesEndpoint}/${id}/update`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // Let axios set Content-Type to include the boundary
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update category"
            );
        }
    }
);

const updateCategorySlice = createSlice({
    name: "updateCategory",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetUpdateCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetUpdateCategory } = updateCategorySlice.actions;
export const updateCategoryReducer = updateCategorySlice.reducer;
