import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../Helpers/const/const";

// ==========================
// Thunk: Register Company
// ==========================
export const registerCompany = createAsyncThunk(
    "auth/registerCompany",
    async (formData, { rejectWithValue }) => {
        try {
            // formData expected to have snake_case keys from parent:
            // full_name, company_name, email, password, password_confirmation, phone, city, region, address, postalcode, house_number, contact_person, tax_id

            // Split full_name to first_name + last_name
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
                role: "company", // ثابت
                phone: formData.phone || "",
                city: formData.city || "",
                region: formData.region || "",
                address: formData.address || "",
                postalcode: formData.postalcode || "",
                house_number: formData.house_number || formData.houseNumber || "",
                company_name: formData.company_name,
                contact_person: formData.contact_person || formData.contactPerson || "",
                tax_id: formData.tax_id || formData.taxId || "",
            };

            console.log("🚀 Register Body Sent → ", body);

            const response = await axios.post(`${baseURL}/register`, body, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("✅ API Success Response → ", response.data);
            return response.data;
        } catch (err) {
            console.log("❌ API Error → ", err.response?.data || err.message);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ==========================
//Register Company Slice
// ==========================
const registerCompanySlice = createSlice({
    name: "registerCompany",
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(registerCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // Fulfilled
            .addCase(registerCompany.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })

            // Rejected
            .addCase(registerCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const registerCompnayReducer = registerCompanySlice.reducer;

