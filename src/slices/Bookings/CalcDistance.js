import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDistanceKm = createAsyncThunk(
    "distance/fetchDistanceKm",
    async ({ userAddress, companyAddress }, { rejectWithValue }) => {
        try {
            if (!window.google || !window.google.maps) {
                return rejectWithValue("Google Maps API not loaded");
            }

            const service = new window.google.maps.DistanceMatrixService();

            const distanceKm = await new Promise((resolve, reject) => {
                service.getDistanceMatrix(
                    {
                        origins: [userAddress],
                        destinations: [companyAddress],
                        travelMode: window.google.maps.TravelMode.DRIVING,
                        unitSystem: window.google.maps.UnitSystem.METRIC,
                    },
                    (response, status) => {
                        if (status === "OK" && response) {
                            const row = response.rows[0];
                            if (row && row.elements && row.elements[0]) {
                                const element = row.elements[0];
                                if (element.status === "OK") {
                                    // Distance value is in meters
                                    resolve(element.distance.value / 1000);
                                } else {
                                    reject(`Distance calculation failed: ${element.status}`);
                                }
                            } else {
                                reject("No distance information found");
                            }
                        } else {
                            reject(`Distance Matrix API failed: ${status}`);
                        }
                    }
                );
            });

            return distanceKm;
        } catch (err) {
            return rejectWithValue(typeof err === 'string' ? err : err.message || "Unknown error occurred");
        }
    }
);

const distanceSlice = createSlice({
    name: "distance",
    initialState: {
        distanceKm: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetDistance(state) {
            state.distanceKm = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDistanceKm.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.distanceKm = null;
            })
            .addCase(fetchDistanceKm.fulfilled, (state, action) => {
                state.loading = false;
                state.distanceKm = action.payload;
                state.error = null;
            })
            .addCase(fetchDistanceKm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.distanceKm = null;
            });
    },
});

export const { resetDistance } = distanceSlice.actions;

export const distanceReducer = distanceSlice.reducer;

