import { createSlice } from "@reduxjs/toolkit";

// ==========================
// Save Token Slice
// ==========================

const saveTokenSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
        user: JSON.parse(localStorage.getItem("user")) || null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.user = action.payload.user;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
            localStorage.clear();
        }
    }
})

export const saveTokenReducer = saveTokenSlice.reducer;
export const { setCredentials, logout } = saveTokenSlice.actions;
