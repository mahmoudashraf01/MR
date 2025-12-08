// src/redux/features/auth/loginSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://darkgray-bee-896770.hostingersite.com/api";

// ----------------------
//  Login Thunk Function
// ----------------------
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email,
                password,
            });

            // كل الداتا الراجعة
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed, try again"
            );
        }
    }
);

// ----------------------
//       Slice
// ----------------------
const loginSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: null,
        error: null,
    },

    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        builder

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.token = action.payload.token;

                // Save in localStorage
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
