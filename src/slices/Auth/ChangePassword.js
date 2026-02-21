import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

// ------------------------
// Change Password Thunk
// ------------------------
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async (passwordData, { rejectWithValue, getState }) => {
        try {
            const token = getState().saveToken.token;
            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const changePasswordEndpoint = privateEndpoints.get("changePasswordEndpoint");

            const response = await axios.post(changePasswordEndpoint, passwordData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to change password"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const changePasswordSlice = createSlice({
    name: "changePassword",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetChangePasswordState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;
export const changePasswordReducer = changePasswordSlice.reducer;
