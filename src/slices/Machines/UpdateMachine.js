import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

// ------------------------
// Update Machine Thunk
// ------------------------
export const updateMachine = createAsyncThunk(
    "machines/updateMachine",
    async ({ id, formData }, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            formData.append("_method", "POST");
            // Append token to formData
            // Check if formData is indeed FormData object (it should be)
            if (formData instanceof FormData) {
                formData.append('token', token);
            }

            const response = await axios.post(`${baseURL}/machines/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update machine"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const updateMachineSlice = createSlice({
    name: "updateMachine",
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        resetUpdateMachine: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateMachine.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateMachine.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateMachine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetUpdateMachine } = updateMachineSlice.actions;
export const updateMachineReducer = updateMachineSlice.reducer;
