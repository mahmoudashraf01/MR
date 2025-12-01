import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice"; // لو مسار مختلف عدّله
import { FaUser, FaBuilding, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  // -----------------------------
  // Local input state
  // -----------------------------
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Validation errors
  const [validation, setValidation] = useState({});

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Validate Inputs
  // -----------------------------
  const validateForm = () => {
    let errors = {};

    if (!formData.full_name.trim()) errors.full_name = "Full name is required";

    if (!formData.company_name.trim())
      errors.company_name = "Company name is required";

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email format";

    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.password_confirmation)
      errors.password_confirmation = "Passwords do not match";

    setValidation(errors);

    return Object.keys(errors).length === 0;
  };

  // -----------------------------
  // Submit Handler
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("➡️ Submitting form with data:", formData);

    // Validate Before Sending
    if (!validateForm()) {
      console.log("❌ Validation Failed:", validation);
      return;
    }

    console.log("✔ Validation Passed, dispatching register…");

    dispatch(registerUser(formData))
      .unwrap()
      .then((res) => {
        console.log("🎉 Register Success:", res);
      })
      .catch((err) => {
        console.log("❌ Register Failed:", err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-equipmentBg p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-[fadeIn_0.5s_ease-out]">
        {/* Tabs (Login / Register) */}
        <div className="flex justify-center mb-8 space-x-6 text-gray-500">
          <a href="/login" className="hover:text-primaryBtn transition-colors duration-200">Login</a>
          <button className="text-primaryBtn font-semibold border-b-2 border-primaryBtn pb-1 transition-all duration-200">
            Register
          </button>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600">
            Join the trusted marketplace for heavy machinery.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative group">
            <FaUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              validation.full_name ? "text-red-500" : "text-gray-400 group-focus-within:text-primaryBtn"
            }`} />
            <input
              name="full_name"
              type="text"
              placeholder="Enter your name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 placeholder-gray-400 ${
                validation.full_name 
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-gray-200 focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10"
              } focus:outline-none`}
              aria-label="Full name"
              aria-invalid={!!validation.full_name}
              aria-describedby={validation.full_name ? "full_name-error" : undefined}
            />
            {validation.full_name && (
              <p id="full_name-error" className="text-red-500 text-sm mt-1.5 flex items-center gap-1 animate-[shake_0.3s_ease-in-out]">
                <span>⚠</span> {validation.full_name}
              </p>
            )}
          </div>

          {/* Company */}
          <div className="relative group">
            <FaBuilding className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              validation.company_name ? "text-red-500" : "text-gray-400 group-focus-within:text-primaryBtn"
            }`} />
            <input
              name="company_name"
              type="text"
              placeholder="Enter your company"
              value={formData.company_name}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 placeholder-gray-400 ${
                validation.company_name 
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-gray-200 focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10"
              } focus:outline-none`}
              aria-label="Company name"
              aria-invalid={!!validation.company_name}
            />
            {validation.company_name && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1 animate-[shake_0.3s_ease-in-out]">
                <span>⚠</span> {validation.company_name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative group">
            <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              validation.email ? "text-red-500" : "text-gray-400 group-focus-within:text-primaryBtn"
            }`} />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 placeholder-gray-400 ${
                validation.email 
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-gray-200 focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10"
              } focus:outline-none`}
              aria-label="Email address"
              aria-invalid={!!validation.email}
            />
            {validation.email && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1 animate-[shake_0.3s_ease-in-out]">
                <span>⚠</span> {validation.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative group">
            <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              validation.password ? "text-red-500" : "text-gray-400 group-focus-within:text-primaryBtn"
            }`} />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 placeholder-gray-400 ${
                validation.password 
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-gray-200 focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10"
              } focus:outline-none`}
              aria-label="Password"
              aria-invalid={!!validation.password}
            />
            {validation.password && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1 animate-[shake_0.3s_ease-in-out]">
                <span>⚠</span> {validation.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <FaLock className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              validation.password_confirmation ? "text-red-500" : "text-gray-400 group-focus-within:text-primaryBtn"
            }`} />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Re-enter your password"
              value={formData.password_confirmation}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200 placeholder-gray-400 ${
                validation.password_confirmation 
                  ? "border-red-500 focus:ring-4 focus:ring-red-500/10" 
                  : "border-gray-200 focus:border-primaryBtn focus:ring-4 focus:ring-primaryBtn/10"
              } focus:outline-none`}
              aria-label="Confirm password"
              aria-invalid={!!validation.password_confirmation}
            />
            {validation.password_confirmation && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1 animate-[shake_0.3s_ease-in-out]">
                <span>⚠</span> {validation.password_confirmation}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Registering…
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl animate-[fadeIn_0.3s_ease-out]">
            <p className="text-center text-red-600 font-medium">
              {typeof error === "string" ? error : "Registration failed. Please try again."}
            </p>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <a href="/login" className="text-primaryBtn hover:text-primaryBtn/80 hover:underline font-semibold transition-all duration-200">
            Login
          </a>
        </p>
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
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default memo(Register);
