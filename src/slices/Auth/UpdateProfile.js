import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (profileData, { getState, rejectWithValue }) => {
        const { token } = getState().saveToken;

        try {
            const profileUpdateEndpoint = privateEndpoints.get("profileUpdateEndpoint");

            const response = await axios.post(profileUpdateEndpoint, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    // axios will automatically set Content-Type to multipart/form-data if profileData is FormData
                    // or application/json if it's a plain object
                },
            });
            console.log("Profile Updated Successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Profile Update Error:", error.response?.data || error.message);
            return rejectWithValue(
                error.response?.data?.message || "Failed to update profile"
            );
        }
    }
);

const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: {
        loading: false,
        success: false,
        error: null,
        updatedData: null
    },
    reducers: {
        resetUpdateState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.updatedData = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.updatedData = action.payload;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetUpdateState } = updateProfileSlice.actions;
export const updateProfileReducer = updateProfileSlice.reducer;
