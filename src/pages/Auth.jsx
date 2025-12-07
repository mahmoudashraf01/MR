import { memo } from 'react';
import AuthImg from '../assets/auth.png'
import CompnyRegisterLayout from '../layouts/CompnyRegisterLayout';
import Logo from '../assets/logo2.svg'

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
                <div className="absolute flex flex-col gap-5 text-white px-10 text-center">
                    <div className='flex justify-end'>
                        <img src={Logo} alt="Logo" className="flex w-100 justify-center items-center" />
                    </div>
                    <p className="max-w-md text-gray-200 text-md font-medium leading-relaxed">
                        Your trusted platform for heavy machinery rentals. Connecting equipment
                        owners with construction professionals.
                    </p>
                </div>
            </div>
            <CompnyRegisterLayout />
        </div>
    );
};

export default memo(Auth);