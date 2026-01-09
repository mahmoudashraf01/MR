import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Helpers/const/const";

export const createMachine = createAsyncThunk(
    "machines/createMachine",
    async (payload, { rejectWithValue, getState }) => {
        try {
            const state = getState();
            const token = state.saveToken?.token;

            if (!token) {
                return rejectWithValue("No authentication token found");
            }

            const companyId =
                payload?.company_id ??
                state.saveToken?.user?.company?.id ??
                state.saveToken?.user?.company_id ??
                state.saveToken?.user?.companyId ??
                state.saveToken?.user?.id;

            const formData = new FormData();

            const appendIfPresent = (key, value) => {
                if (value === undefined || value === null || value === "") return;
                formData.append(key, value);
            };

            appendIfPresent("title", payload?.title);
            appendIfPresent("category_id", payload?.category_id);
            appendIfPresent("sub_category_id", payload?.sub_category_id);
            appendIfPresent("daily_rate", payload?.daily_rate);
            appendIfPresent("weekly_rate", payload?.weekly_rate);
            appendIfPresent("monthly_rate", payload?.monthly_rate);
            appendIfPresent("deposit", payload?.deposit);
            appendIfPresent("transport_rate_per_km", payload?.transport_rate_per_km);
            appendIfPresent("year", payload?.year);
            appendIfPresent("description", payload?.description);
            appendIfPresent("location_city", payload?.location_city);
            appendIfPresent("availability_status", payload?.availability_status);
            appendIfPresent("stock", payload?.stock);

            if (companyId !== undefined && companyId !== null && companyId !== "") {
                formData.append("company_id", String(companyId));
            }

            if (payload?.is_featured !== undefined && payload?.is_featured !== null) {
                formData.append("is_featured", payload.is_featured ? 1 : 0);
            }

            if (payload?.technical_specifications !== undefined && payload?.technical_specifications !== null) {
                const specsArray = Array.isArray(payload.technical_specifications)
                    ? payload.technical_specifications
                    : [payload.technical_specifications];
                
                // Append each specification object as a separate item in the array
                specsArray.forEach((spec, index) => {
                     formData.append(`technical_specifications[${index}]`, JSON.stringify(spec));
                });
            }

            if (payload?.images && payload.images.length > 0) {
                payload.images.forEach((img) => {
                    formData.append("images[]", img?.file || img);
                });
            }

            const response = await axios.post(`${baseURL}/machines`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to create machine"
            );
        }
    }
);

const createMachineSlice = createSlice({
    name: "createMachine",
    initialState: {
        loading: false,
        success: false,
        error: null,
        data: null,
    },
    reducers: {
        resetCreateMachine(state) {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMachine.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
                state.data = null;
            })
            .addCase(createMachine.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.data = action.payload;
            })
            .addCase(createMachine.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export const { resetCreateMachine } = createMachineSlice.actions;
export const createMachineReducer = createMachineSlice.reducer;
