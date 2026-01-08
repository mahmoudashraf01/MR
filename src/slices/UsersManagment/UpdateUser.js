import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

// ------------------------
// Update User Status Thunk
// ------------------------
export const updateUserStatus = createAsyncThunk(
    "users/updateUserStatus",
    async ({ id, ...data }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                console.error("UpdateUser: No token found in state");
                return rejectWithValue("No authentication token found");
            }

            const formData = new FormData();
            
            // Add method spoofing for Laravel/PHP backends if they expect PUT/PATCH
            // even when using POST for FormData
            formData.append("_method", "POST");

            Object.keys(data).forEach(key => {
                let value = data[key];
                // Convert booleans to 1/0 for better backend compatibility
                if (typeof value === 'boolean') {
                    value = value ? 1 : 0;
                }
                formData.append(key, value);
            });

            console.log(`UpdateUser: Sending POST to ${baseURL}/users/${id} with token`, token);

            // Using POST with FormData and Authorization header
            const response = await axios.post(`${baseURL}/users/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Do not set Content-Type manually, let axios set it with boundary
                },
            });

            return { id, ...data, data: response.data };

        } catch (error) {
            console.error("UpdateUser: Error", error.response || error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to update user status"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const updateUserSlice = createSlice({
    name: "updateUser",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetUpdateUser: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUserStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetUpdateUser } = updateUserSlice.actions;
export const updateUserReducer = updateUserSlice.reducer;
