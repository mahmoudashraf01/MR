import { Outlet, NavLink, useLocation } from "react-router-dom";
import { memo } from "react";

const CompanyRegisterLayout = () => {
    const location = useLocation();

    const isLoginRoute = location.pathname === '/login' || location.pathname.startsWith('/login/');

    const activeClass = 'text-primaryBtn font-semibold border-b-2 border-primaryBtn pb-1 transition-all duration-200';
    const inactiveClass = 'text-gray-500 hover:text-primaryBtn transition-colors duration-200';

    const RegisterTab = () => (
        <NavLink
            to='/'
            end
            className={() => (isLoginRoute ? inactiveClass : activeClass)}
        >
            Register
        </NavLink>
    );

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] p-6">
            <div className="w-full lg:max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-[fadeIn_0.5s_ease-out]">

                {/* Tabs */}
                <div className="flex justify-center mb-8 space-x-6">
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-primaryBtn font-semibold border-b-2 border-primaryBtn pb-1 transition-all duration-200'
                                : 'text-gray-500 hover:text-primaryBtn transition-colors duration-200'
                        }
                    >
                        Login
                    </NavLink>

                    {/* Register should be active whenever Login is NOT active (keeps active during registration flow) */}
                    <RegisterTab />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default memo(CompanyRegisterLayout);
