import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { publicEndpoints } from "../store/api/endPoints";
import { setCredentials } from "./SaveTokenSlice";


// ==========================
// Thunk: Register Renter
// ==========================
export const registerRenter = createAsyncThunk(
    "auth/registerRenter",
    async (formData, thunkAPI) => {
        try {
            const full = (formData.full_name || "").trim();
            const parts = full.split(/\s+/);
            const first_name = parts[0] || "";
            const last_name = parts.slice(1).join(" ") || "";

            const body = {
                first_name,
                last_name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
                role: "renter",
                phone: formData.phone || "",
                city: formData.city || "",
                region: formData.region || "",
                address: formData.address || "",
                postalcode: formData.postalcode || "",
                house_number: formData.house_number || formData.houseNumber || "",
                contact_person: formData.contact_person || formData.contactPerson || "",
                tax_id: formData.tax_id || formData.taxId || "",
            };

            const registerEndpoint = publicEndpoints.get("registerEndpoint");

            const response = await axios.post(registerEndpoint, body, {
                headers: { "Content-Type": "application/json" },
            });

            const payload = response.data;

            // Extract token & user
            const token = payload?.data?.token;
            const user = payload?.data?.user;

            // Save into global auth state
            if (token && user) {
                thunkAPI.dispatch(setCredentials({ token, user, role: "renter" }));
            }

            return payload;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ==========================
// Register Renter Slice
// ==========================
const registerRenterSlice = createSlice({
    name: "registerRenter",
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerRenter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerRenter.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(registerRenter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const registerRenterReducer = registerRenterSlice.reducer;

