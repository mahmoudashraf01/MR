import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../assets/logo2.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/SaveTokenSlice';

const NavBar = () => {
    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav);
    };

    const dispatch = useDispatch();
    const { token, user, role } = useSelector((state) => state.saveToken || {});

    const displayName = user?.name || user?.fullName || user?.company_name || user?.companyName || user?.first_name
        || user?.username || 'User';
    const displayRole = role ? String(role).charAt(0).toUpperCase() + String(role).slice(1) : null;

    const handleLogout = () => {
        dispatch(logout());
    }

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
            <div className='hidden lg:flex  justify-between gap-3 items-center'>
                {!token ? (
                    <>
                        <NavLink to='/auth/login' className=' h-10 px-4 py-2.5 r text-[18px] font-medium text-primary  transition-all duration-200 hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4 hover:text-[20px]'>
                            Login
                        </NavLink>
                        <NavLink to='/auth' className=' h-10 px-4 py-2.5 r text-[18px] font-medium text-primary  transition-all duration-200 hover:text-secondary hover:underline hover:decoration-secondary hover:underline-offset-4 hover:text-[20px]'>
                            Register
                        </NavLink>
                    </>
                ) : (
                    <div className='flex items-center gap-3'>
                        <div className='text-white text-[16px] font-medium'>
                            {displayName}
                            {displayRole && (
                                <span className='text-xs text-secondary ml-2 px-2 py-0.5 bg-white/10 rounded'>
                                    {displayRole.toLowerCase() === 'renter' ? 'Renter Dashboard' : displayRole.toLowerCase() === 'admin' ? 'Admin Dashboard' : 'Company Dashboard'}
                                </span>
                            )}
                        </div>
                        <button onClick={handleLogout} className='px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition'>Logout</button>
                    </div>
                )}
            </div>
            <div onClick={handleNav} className='block lg:hidden cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors'>
                {!nav ? <AiOutlineClose size={24} className='text-white' /> : <AiOutlineMenu size={24} className='text-white' />}
            </div>

            <ul className={!nav ? 'fixed left-0 top-0 w-[70%] sm:w-[60%] border-r border-r-gray-900 h-full z-50 bg-navColor ease-in-out duration-300 shadow-2xl' : 'fixed -left-full top-0 w-[70%] sm:w-[60%] border-r border-r-gray-900 h-full bg-navColor z-50 ease-in-out duration-300'}>
                <div className={`${token ? 'flex flex-col justify-between h-full' : 'flex flex-col justify-between '}`} >
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
                    {!token ? (
                        <>
                            <li className='p-4 border-b border-gray-700'>
                                <NavLink to='/auth/login' onClick={handleNav} className=' block py-2 transition-colors font-medium text-primary duration-200 hover:text-secondary'>
                                    Login
                                </NavLink>
                            </li>
                            <li className='p-4 border-b border-gray-700'>
                                <NavLink to='/auth' onClick={handleNav} className=' block py-2 transition-colors  font-medium text-primary duration-200 hover:text-secondary'>
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='p-4 border-b border-gray-700'>
                                <button onClick={() => { handleNav(); handleLogout(); }} className=' block py-2 transition-colors font-medium text-primary duration-200 hover:text-secondary'>
                                    Logout
                                </button>
                            </li>
                            <div className='flex flex-col border-t border-gray-700 py-3 px-2 transition-colors font-medium text-white mt-auto'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <div className='w-8 h-8 bg-primaryBtn rounded-full'></div>
                                        <div className='flex flex-col justify-center items-center'>
                                            {displayName}
                                            <div className=' text-[10px] text-[#D4D4D4]'>{user?.renter.city}</div>
                                        </div>
                                    </div>
                                    {displayRole && (
                                        <span className='text-xs text-white bg-secondary ml-2 px-2 py-2 rounded'>
                                            {displayRole.toLowerCase() === 'renter' ?
                                                <NavLink >
                                                    Go to Dashboard
                                                </NavLink> : displayRole.toLowerCase() === 'admin' ? 'Admin Dashboard' : 'Company Dashboard'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default memo(NavBar);