import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { privateEndpoints } from "../../store/api/endPoints";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().saveToken.token;
      if (!token) {
        return rejectWithValue("No authentication token found");
      }
      const statisticsEndpoint = privateEndpoints.get("statisticsEndpoint");

      const response = await axios.get(statisticsEndpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch statistics");
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    data: null, // Full data object including status, recent_users, etc.
    admins: null,
    companies: null,
    renters: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        // Extract roles for specific dashboard usage as requested
        if (action.payload.data?.roles) {
          state.admins = action.payload.data.roles.admins;
          state.companies = action.payload.data.roles.companies;
          state.renters = action.payload.data.roles.renters;
        }
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
