import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import Logo from '../assets/logo2.svg';

const NavBar = () => {
    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className='flex justify-between items-center h-24 bg-navColor mx-auto px-6 md:px-8 text-primary shadow-md'>
            <NavLink to='/' className='flex items-center'>
                <img src={Logo} alt="Logo" className='h-10 md:h-12' />
            </NavLink>
            <div>
                <ul className='hidden lg:flex items-center gap-1'>
                    <li>
                        <NavLink
                            to='/'
                            end
                            className={({ isActive }) =>
                                `text-[18px] font-medium transition-all duration-200 px-4 py-2 rounded-lg ${isActive
                                    ? 'text-secondary underline decoration-secondary decoration-2 underline-offset-4'
                                    : 'text-white hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/machines'
                            className={({ isActive }) =>
                                `text-[18px] font-medium transition-all duration-200 px-4 py-2 rounded-lg ${isActive
                                    ? 'text-secondary underline decoration-secondary decoration-2 underline-offset-4'
                                    : 'text-white hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4'
                                }`
                            }
                        >
                            Machines
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                `text-[18px] font-medium transition-all duration-200 px-4 py-2 rounded-lg ${isActive
                                    ? 'text-secondary underline decoration-secondary decoration-2 underline-offset-4'
                                    : 'text-white hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4'
                                }`
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/contact'
                            className={({ isActive }) =>
                                `text-[18px] font-medium transition-all duration-200 px-4 py-2 rounded-lg ${isActive
                                    ? 'text-secondary underline decoration-secondary decoration-2 underline-offset-4'
                                    : 'text-white hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4'
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='hidden lg:flex  justify-between gap-3'>
                <NavLink to ='/auth/login' className=' h-10 px-4 py-2.5 r text-[18px] font-medium text-primary  transition-all duration-200 hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4 hover:text-[20px]'>
                    Login
                </NavLink>
                <NavLink to = '/auth' className=' h-10 px-4 py-2.5 r text-[18px] font-medium text-primary  transition-all duration-200 hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4 hover:text-[20px]'>
                    Register
                </NavLink>
            </div>
            <div onClick={handleNav} className='block lg:hidden cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors'>
                {!nav ? <AiOutlineClose size={24} className='text-white' /> : <AiOutlineMenu size={24} className='text-white' />}
            </div>
            <ul className={!nav ? 'fixed left-0 top-0 w-[70%] sm:w-[60%] border-r border-r-gray-900 h-full z-50 bg-navColor ease-in-out duration-300 shadow-2xl' : 'fixed -left-full top-0 w-[70%] sm:w-[60%] border-r border-r-gray-900 h-full bg-navColor z-50 ease-in-out duration-300'}>
                <div className='flex items-center justify-between py-6 px-6 border-b border-gray-700'>
                    <img src={Logo} alt="Logo" className='h-10' />
                    <button onClick={handleNav} className='p-2 hover:bg-white/10 rounded-lg'>
                        <AiOutlineClose size={20} className='text-white' />
                    </button>
                </div>
                <li className='p-4 border-b border-gray-700'>
                    <NavLink to='/' end onClick={handleNav} className={({ isActive }) => `block py-2 transition-colors ${isActive ? 'text-secondary font-semibold' : 'text-white hover:text-secondary'}`}>Home</NavLink>
                </li>
                <li className='p-4 border-b border-gray-700'>
                    <NavLink to='/machines' onClick={handleNav} className={({ isActive }) => `block py-2 transition-colors ${isActive ? 'text-secondary font-semibold' : 'text-white hover:text-secondary'}`}>Machines</NavLink>
                </li>
                <li className='p-4 border-b border-gray-700'>
                    <NavLink to='/about' onClick={handleNav} className={({ isActive }) => `block py-2 transition-colors ${isActive ? 'text-secondary font-semibold' : 'text-white hover:text-secondary'}`}>About</NavLink>
                </li>
                <li className='p-4 border-b border-gray-700'>
                    <NavLink to='/contact' onClick={handleNav} className={({ isActive }) => `block py-2 transition-colors ${isActive ? 'text-secondary font-semibold' : 'text-white hover:text-secondary'}`}>Contact</NavLink>
                </li>
                <li className='p-4 border-b border-gray-700'>
                    <NavLink to ='/auth/login' className=' block py-2 transition-colors font-medium text-primary duration-200 hover:text-secondary'>
                        Login
                    </NavLink>
                </li>
                <li className='p-4 border-b border-gray-700'>
                    <NavLink to ='/auth' className=' block py-2 transition-colors  font-medium text-primary duration-200 hover:text-secondary'>
                        Register
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default memo(NavBar);