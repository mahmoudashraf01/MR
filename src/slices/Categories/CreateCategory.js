import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async ({ name, description, images, isActive }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("is_active", isActive ? 1 : 0);

            if (images && images.length > 0) {
                images.forEach((img) => {
                    // Assuming API expects "image" (singular) for single file upload
                    formData.append("image", img.file || img); 
                });
            }

            const categoriesEndpoint = privateEndpoints.get("categoriesEndpoint");

            const response = await axios.post(
                categoriesEndpoint,
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
                error.response?.data?.message || "Failed to create category"
            );
        }
    }
);

const createCategorySlice = createSlice({
    name: "createCategory",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetCreateCategory(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetCreateCategory } = createCategorySlice.actions;
export const CreateCategoryReducer = createCategorySlice.reducer;
