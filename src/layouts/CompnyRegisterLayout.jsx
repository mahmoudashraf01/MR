import { Outlet, Link } from "react-router-dom";
import { memo } from "react";

const CompanyRegisterLayout = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] bg-equipmentBg p-6">
            <div className="w-full lg:max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-[fadeIn_0.5s_ease-out]">

                {/* Tabs */}
                <div className="flex justify-center mb-8 space-x-6 text-gray-500">
                    <Link
                        to="/login"
                        className="hover:text-primaryBtn transition-colors duration-200"
                    >
                        Login
                    </Link>

                    <button className="text-primaryBtn font-semibold border-b-2 border-primaryBtn pb-1 transition-all duration-200">
                        Register
                    </button>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default memo(CompanyRegisterLayout);
