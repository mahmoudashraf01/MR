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
            const { token, user, role } = action.payload;

            state.token = token;
            state.user = user;
            state.role = role;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", role);

            console.log("🔥 Stored Token →", token);
            console.log("🔥 Stored Role →", role);
            console.log("🔥 Stored User →", user);
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
