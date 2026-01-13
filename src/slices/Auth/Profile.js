import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://darkgray-bee-896770.hostingersite.com/api";

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().saveToken;
        
        try {
            const response = await axios.get(`${BASE_URL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            console.log("Profile Data Fetched:", response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const profileReducer = profileSlice.reducer;
