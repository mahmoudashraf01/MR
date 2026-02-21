import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

// ------------------------
// Delete Machine Thunk
// ------------------------
export const deleteMachine = createAsyncThunk(
    "machines/deleteMachine",
    async (id, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }
            const privateMachinesEndpoint = privateEndpoints.get("PrivateMachinesEndpoint");

            const response = await axios.delete(`${privateMachinesEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return { id, message: response.data?.message || "Machine deleted successfully" };

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete machine"
            );
        }
    }
);

// ------------------------
// Slice
// ------------------------
const deleteMachineSlice = createSlice({
    name: "deleteMachine",
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetDeleteState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteMachine.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteMachine.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteMachine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetDeleteState } = deleteMachineSlice.actions;
export const deleteMachineReducer = deleteMachineSlice.reducer;
