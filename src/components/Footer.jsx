import { memo } from 'react';
import { TbBrandFacebook } from 'react-icons/tb';
import { FaInstagram } from 'react-icons/fa';
import { TbBrandLinkedin } from 'react-icons/tb';
import Logo from '../assets/Logo2.svg';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='flex justify-center items-center flex-col w-full bg-navColor px-6 md:px-10 py-12'>
            <div className='border-b-2 border-primaryBtn py-8 w-full max-w-7xl'>
                <div className='grid gap-8 lg:grid-cols-[1fr_1.5fr] w-full'>
                    <div className='flex flex-col gap-5 lg:items-start items-center'>
                        <div className='flex items-center gap-2.5'>
                            <NavLink to='/' className='hover:opacity-80 transition-opacity'>
                                <img src={Logo} alt="Logo" className='h-10' />
                            </NavLink>
                        </div>
                        <p className='text-[16px] lg:text-start leading-relaxed text-center font-normal text-[#FFFFFFCC] max-w-md'>The most trusted platform for reliable, safe, and efficient heavy equipment rentals. Connecting construction professionals with verified suppliers nationwide.</p>
                    </div>
                    <div className='flex w-full lg:justify-center justify-between gap-12 md:gap-20'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary text-[18px] font-semibold mb-1'>Quick Links</h1>
                            <NavLink to='/' className='text-[16px] text-gray-400 hover:text-secondary transition-colors'>Home</NavLink>
                            <NavLink to='/about' className='text-[16px] text-gray-400 hover:text-secondary transition-colors'>About</NavLink>
                            <NavLink to='/contact' className='text-[16px] text-gray-400 hover:text-secondary transition-colors'>Contact Us</NavLink>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>Help Center</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary text-[18px] font-semibold mb-1'>Machines</h1>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>Excavators</p>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>Cranes</p>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>Bulldozers</p>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>Loaders</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-[18px] text-primary font-semibold mb-1'>Follow Us</h1>
                                <div className='flex items-center gap-3'>
                                    <a href='#' className='flex justify-center items-center text-primary bg-primaryBtn w-[50px] h-[50px] rounded-full hover:bg-primaryBtn/80 transition-all duration-200 shadow-md hover:shadow-lg'>
                                        <TbBrandFacebook className='text-xl' />
                                    </a>
                                    <a href='#' className='flex justify-center items-center text-primary bg-primaryBtn w-[50px] h-[50px] rounded-full hover:bg-primaryBtn/80 transition-all duration-200 shadow-md hover:shadow-lg'>
                                        <FaInstagram className='text-xl' />
                                    </a>
                                    <a href='#' className='flex justify-center items-center text-primary bg-primaryBtn w-[50px] h-[50px] rounded-full hover:bg-primaryBtn/80 transition-all duration-200 shadow-md hover:shadow-lg'>
                                        <TbBrandLinkedin className='text-xl' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid gap-4 lg:grid-cols-[3.2fr_1.1fr] my-6 w-full max-w-7xl'>
                <p className='text-gray-400 text-sm text-center lg:text-left'>© 2025 MachineRentals – All rights reserved.</p>
                <div className='flex justify-center lg:justify-end items-center gap-4 flex-wrap'>
                    <p className='text-gray-400 text-sm hover:text-secondary transition-colors cursor-pointer'>Privacy Policy</p>
                    <p className='text-gray-400 text-sm hover:text-secondary transition-colors cursor-pointer'>Terms of Service</p>
                    <p className='text-gray-400 text-sm hover:text-secondary transition-colors cursor-pointer'>Cookie Policy</p>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);