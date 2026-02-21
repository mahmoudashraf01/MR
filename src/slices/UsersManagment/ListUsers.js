import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

// ------------------------
// Fetch Users Thunk
// ------------------------
export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (arg = 1, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            let params = {};
            if (typeof arg === 'object') {
                params = arg;
            } else {
                params = { page: arg };
            }
            const usersEndpoint = privateEndpoints.get("usersEndpoint");

            const response = await axios.get(usersEndpoint, {
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Fetched users:", response.data);
            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const usersSlice = createSlice({
    name: "listUsers",
    initialState: {
        users: [],
        totalPages: 1,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data || [];
                state.totalPages = action.payload.meta?.last_page || 1;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const listUsersReducer = usersSlice.reducer;
