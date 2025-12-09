import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import UserIcon from "../../../../../assets/userIcon.svg";
import EmailIcon from "../../../../../assets/emailIcon.svg";
import phoneIcon from "../../../../../assets/phoneIcon.svg";
import LockIcon from "../../../../../assets/lockIcon.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CompanyDataForm1 = ({ data, setData, nextStep }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: data?.full_name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      password: data?.password || "",
      password_confirmation: data?.password_confirmation || "",
    },
  });

  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = (values) => {
    const nameParts = values.full_name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    setData((prev) => ({
      ...prev,
      ...values,
      first_name: firstName,
      last_name: lastName,
    }));

    nextStep(); // فقط
  };

  return (
    <div className="w-full animate-[fadeIn_0.5s_ease-out]">

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">
          Join the trusted marketplace for heavy machinery.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

        {/* Full Name */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Name</h1>
          <div className="relative group">
            <img
              src={UserIcon}
              alt="user icon"
              className={`absolute left-4 top-1/2 -translate-y-1/2
              ${errors.full_name ? "text-red-500" : "text-gray-400"}`}
            />

            <input
              {...register("full_name", {
                required: "Full name is required",
                minLength: { value: 3, message: "Name is too short" },
              })}
              placeholder="Enter your name"
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl 
              ${errors.full_name ? "border-red-500" : "border-gray-200 focus:border-primaryBtn"}`}
            />

            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Email Address</h1>

          <div className="relative group">
            <img
              src={EmailIcon}
              alt="email icon"
              className={`absolute left-4 top-1/2 -translate-y-1/2
              ${errors.email ? "text-red-500" : "text-gray-400"}`}
            />

            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl 
              ${errors.email ? "border-red-500" : "border-gray-200 focus:border-primaryBtn"}`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Phone Number</h1>

          <div className="relative group">
            <img
              src={phoneIcon}
              alt="phone icon"
              className={`absolute left-4 top-1/2 -translate-y-1/2
              ${errors.phone ? "text-red-500" : "text-gray-400"}`}
            />

            <input
              {...register("phone", {
                required: "Phone number is required",
              })}
              placeholder="Enter your phone number"
              className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl 
              ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-primaryBtn"}`}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Password</h1>

          <div className="relative group">
            <img
              src={LockIcon}
              alt="lock icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl 
              ${errors.password ? "border-red-500" : "border-gray-200 focus:border-primaryBtn"}`}
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2E3A4533]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Confirm Password</h1>

          <div className="relative group">
            <img
              src={LockIcon}
              alt="lock icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              {...register("password_confirmation", {
                required: "Please confirm the password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl 
              ${errors.password_confirmation ? "border-red-500" : "border-gray-200 focus:border-primaryBtn"}`}
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2E3A4533]"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password_confirmation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-5">
          <button
            type="button"
            onClick={() => navigate("/auth")}
            className="text-primaryBtn w-full underline bg-white py-3.5 rounded-xl hover:bg-[#bad6ff] font-semibold"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition shadow-lg"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(CompanyDataForm1);
