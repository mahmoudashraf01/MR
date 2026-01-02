import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseURL } from "../../Helpers/const/const";


export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async ({ name, description, images, isActive }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            const state = getState();
            const token = state.saveToken?.token;

            formData.append("name", name)
            formData.append("description", description)
            formData.append("is_active", isActive ? 1 : 0)

            // images = array of File
            images.forEach((img) => {
                formData.append("images[]", img)
            })

            const response = await axios.post(
                `${baseURL}/categories`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to create category"
            )
        }
    }
)


const createCategorySlice = createSlice({
    name: "createCategory",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetCreateCategory(state) {
            state.loading = false
            state.success = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { resetCreateCategory } = createCategorySlice.actions
export const CreateCategoryReducer = createCategorySlice.reducer

