import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { baseURL } from "../Helpers/const/const";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token;

    // ============================
    // Fetch Profile (using token)
    // ============================
    const fetchProfile = async () => {
        try {
            const res = await axios.get(`${baseURL}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const profile = res.data.data;
            setUser(profile);
            setRole(profile.role); // "company" | "renter" | "user"
        } catch (err) {
            console.error("Profile error: ", err);
            logout();
        }
    };

    // ============================
    // Login Function
    // ============================
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API}/login`, {
                email,
                password,
            });

            const returnedToken = res.data.data.token;
            localStorage.setItem("token", returnedToken);
            setToken(returnedToken);

            // fetch profile after login
            await fetchProfile();

            return { success: true, role: role };
        } catch (err) {
            console.error(err);
            return { success: false, error: err.response?.data?.message || "Login failed" };
        }
    };

    // ============================
    // Register (optional)
    // ============================
    const register = async (formData) => {
        try {
            const res = await axios.post(`${API}/register`, formData);

            const returnedToken = res.data.data.token;
            localStorage.setItem("token", returnedToken);
            setToken(returnedToken);

            await fetchProfile();

            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, error: err.response?.data?.message };
        }
    };

    // ============================
    // Logout
    // ============================
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setRole(null);
    };

    // ============================
    // Load user on page refresh
    // ============================
    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                await fetchProfile();
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                token,
                loading,
                isAuthenticated,

                login,
                register,
                logout,
                fetchProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
