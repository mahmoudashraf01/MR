import { memo } from 'react';
import AuthImg from '../assets/auth.png'
import CompnyRegisterLayout from '../layouts/CompnyRegisterLayout';
import Logo from '../assets/logo2.svg'
import BackArrowIcon from '../assets/backArrowIcon.svg'
import { NavLink } from 'react-router-dom';

const Auth = () => {
    return (
        <div className="relative grid grid-cols-1 justify-center xl:grid-cols-[1.2fr_1fr] min-h-screen bg-[#F4F5F7]">
            <div className="relative hidden xl:flex items-center justify-center rounded-r-3xl overflow-hidden">
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
            <NavLink to={'/'} className={`absolute top-4 right-4`}>
                <button className='flex gap-2 hover:scale-105 cursor-pointer justify-center items-center top-4 right-4'>
                    <img src={BackArrowIcon} alt="" />
                    <h1 className='text-secondary'>
                        Back to Home
                    </h1>
                </button>
            </NavLink>
            <div className='w-full flex mt-10 justify-center items-center'> 
                <CompnyRegisterLayout />
            </div>
        </div>
    );
};

export default memo(Auth);