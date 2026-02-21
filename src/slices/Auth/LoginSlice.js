// src/redux/features/auth/loginSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCredentials } from "../SaveTokenSlice";  // 👈 أهم إضافة
import { publicEndpoints } from "../../store/api/endPoints";

// ----------------------
//  Login Thunk Function
// ----------------------
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const loginEndpoint = publicEndpoints.get("loginEndpoint");

            const response = await axios.post(loginEndpoint, {
                email,
                password,
            });

            const payload = response.data.data;

            const token = payload?.token;
            const user = payload?.user;
            const role = payload?.user?.role || "unknown";

            if (token && user) {
                thunkAPI.dispatch(setCredentials({ token, user, role }));
            }

            return payload;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed, try again"
            );
        }
    }
);

// ----------------------
//       Slice
// ----------------------
const loginSlice = createSlice({
    name: "login",
    initialState: {
        loading: false,
        data: null,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;

            })

            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const loginReducer = loginSlice.reducer;
