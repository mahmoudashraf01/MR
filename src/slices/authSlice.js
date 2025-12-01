import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ==========================
// Register Thunk
// ==========================
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            // Create full_name
            //   const full_name = `${formData.first_name} ${formData.last_name}`;
            const fullName = formData.full_name;
            const baseURL = import.meta.env.VITE_BASE_URL;


            // Extract needed fields only
            const body = {
                first_name: fullName,
                last_name: fullName,
                company_name: formData.company_name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            };

            const response = await axios.post(
                `${baseURL}/register`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

// ==========================
// Slice
// ==========================
const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        token: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Fulfilled
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;

                // user Data
                state.user = action.payload.data.user;

                // token
                state.token = action.payload.data.token;

                // save token
                localStorage.setItem("token", action.payload.data.token);
            })

            // Rejected
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
