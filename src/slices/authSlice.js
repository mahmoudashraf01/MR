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
            // استخراج البيانات من الـ formData
            const {
                fullName,
                email,
                password,
                confirmPassword,
                phone,
                city,
                region,
                address,
                postalcode,
                houseNumber,
                companyName,
                contactPerson,
                taxId,
            } = formData;

            // Split full name
            const [first_name, last_name] = fullName.split(" ");

            // body المطلوب + role ثابت = "company"
            const body = {
                first_name: first_name || "",
                last_name: last_name || "",
                email,
                password,
                password_confirmation: confirmPassword,
                role: "company",
                phone,
                city,
                region,
                address,
                postalcode,
                house_number: houseNumber,
                company_name: companyName,
                contact_person: contactPerson,
                tax_id: taxId,
            };

            console.log("🚀 Register Body Sent → ", body);

            const response = await axios.post(baseURL, body, {
                headers: {
                    "Content-Type": "application/json",
                },
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

export default registerCompanySlice.reducer;

