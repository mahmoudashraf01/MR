import { memo } from 'react';
import AuthImg from '../assets/auth.png'
import Login from '../components/Auth/login/Login';
import Register from '../components/Auth/register/Company/RegisterCompany/RegisterCompany/RegisterCompany';

const Auth = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-[#F4F5F7]">
            <div className="relative hidden lg:flex items-center justify-center rounded-r-3xl overflow-hidden">
                {/* الصورة */}
                <img
                    src={AuthImg}
                    alt="Auth background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0A25408C]/50"></div>
                <div className="absolute text-white px-10 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex justify-center items-center bg-secondary w-[50px] h-[50px] text-primary font-bold text-sm rounded-md px-2 py-1 mr-2">
                            logo
                        </div>
                        <h1 className="text-3xl text-center font-semibold">
                            Machine<span className="text-secondary">Rentals</span>
                        </h1>
                    </div>
                    <p className="max-w-md text-gray-200 text-sm leading-relaxed">
                        Your trusted platform for heavy machinery rentals. Connecting equipment
                        owners with construction professionals.
                    </p>
                </div>
            </div>
            {/* <Login /> */}
            <Register/>
        </div>
    );
};

export default memo(Auth);