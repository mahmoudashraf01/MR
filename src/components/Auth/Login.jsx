import { memo } from 'react';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-equipmentBg p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-[fadeIn_0.5s_ease-out]">
                {/* Tabs (Login / Register) */}
                <div className="flex justify-center mb-8 space-x-6 text-gray-500">
                    <button className="text-primaryBtn font-semibold border-b-2 border-primaryBtn pb-1 transition-all duration-200">
                        Login
                    </button>
                    <button className="hover:text-primaryBtn transition-colors duration-200">Register</button>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600">
                        Sign in to manage your rentals and bookings.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    {/* Email */}
                    <div className="relative group">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primaryBtn transition-colors duration-200" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10 transition-all duration-200 placeholder-gray-400"
                            aria-label="Email address"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative group">
                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primaryBtn transition-colors duration-200" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10 transition-all duration-200 placeholder-gray-400"
                            aria-label="Password"
                            required
                        />
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                className="accent-primaryBtn w-4 h-4 cursor-pointer rounded border-gray-300 focus:ring-2 focus:ring-primaryBtn/20" 
                            />
                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                        </label>
                        <button 
                            type="button"
                            className="text-primaryBtn hover:text-primaryBtn/80 hover:underline transition-all duration-200 font-medium"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-semibold"
                    >
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="px-4 text-sm text-gray-500 font-medium">or continue with</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3.5 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700 hover:shadow-md"
                    >
                        <FcGoogle size={22} />
                        <span>Continue with Google</span>
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-8">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primaryBtn hover:text-primaryBtn/80 hover:underline font-semibold transition-all duration-200">
                        Sign up
                    </a>
                </p>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default memo(Login);