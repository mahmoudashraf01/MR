import { memo, use, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import EmailIcon from "../../../assets/emailIcon.svg";
import LockIcon from "../../../assets/lockIcon.svg";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from '../../../slices/Auth/LoginSlice'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.login);

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Handle Submit
    const onSubmit = async (data) => {
        const result = await dispatch(loginUser(data));

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
            console.log("LOGIN RESPONSE:", result.payload);
        } else {
            alert("❌ Invalid email or password");
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-full animate-[fadeIn_0.5s_ease-out]">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome Back!
                    </h2>
                    <p className="text-gray-600">
                        Sign in to manage your rentals and bookings.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email Field */}
                    <div className="relative group">
                        <img src={EmailIcon} alt="email icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 ${errors.email
                                ? "border-red-500"
                                : "border-gray-200 focus:border-primaryBtn focus:ring-primaryBtn/10"
                                }`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <img src={LockIcon} alt="lock icon" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl transition-all duration-200 ${errors.password
                                ? "border-red-500"
                                : "border-gray-200 focus:border-primaryBtn focus:ring-primaryBtn/10"
                                }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />

                        {/* eye icon */}
                        <span
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <IoEyeOff className="text-[#2E3A4533]" size={22} /> : <IoEye className="text-[#2E3A4533]" size={22} />}
                        </span>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-primaryBtn w-4 h-4 cursor-pointer"
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>

                        <button
                            type="button"
                            className="text-primaryBtn hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-primaryBtn cursor-pointer text-white py-3.5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Pending..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-8">
                    Don't have an account?{" "}
                    <a
                        href="/auth"
                        className="text-primaryBtn hover:underline font-semibold"
                    >
                        Sign up
                    </a>
                </p>

                {/* Animation */}
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default memo(Login);
