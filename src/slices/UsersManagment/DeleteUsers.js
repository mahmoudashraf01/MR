import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

// ------------------------
// Delete User Thunk
// ------------------------
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }
            const usersEndpoint = privateEndpoints.get("usersEndpoint");

            const response = await axios.delete(`${usersEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Delete user response:", response.data);
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete user"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const deleteUserSlice = createSlice({
    name: "deleteUser",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetDeleteUser: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetDeleteUser } = deleteUserSlice.actions;
export const deleteUserReducer = deleteUserSlice.reducer;
