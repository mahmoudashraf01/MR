import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

export const createSubCategory = createAsyncThunk(
    "subCategories/createSubCategory",
    async ({ name, category_id, description, images, is_active }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("category_id", category_id);
            formData.append("description", description);
            formData.append("is_active", is_active ? 1 : 0);

            if (images && images.length > 0) {
                images.forEach((img) => {
                    // User requested "image": [list of images]
                    formData.append("image", img.file || img); 
                });
            }

            const subCategoriesEndpoint = privateEndpoints.get("subCategoriesEndpoint");

            const response = await axios.post(
                subCategoriesEndpoint,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create subcategory"
            );
        }
    }
);

const createSubCategorySlice = createSlice({
    name: "createSubCategory",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetCreateSubCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createSubCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetCreateSubCategory } = createSubCategorySlice.actions;
export const createSubCategoryReducer = createSubCategorySlice.reducer;
