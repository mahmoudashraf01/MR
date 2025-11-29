import { memo } from 'react';
import { TbBrandFacebook } from 'react-icons/tb';
import { FaInstagram } from 'react-icons/fa';
import { TbBrandLinkedin } from 'react-icons/tb';
import Logo from '../assets/logo2.svg';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='flex justify-center items-center flex-col w-full bg-navColor px-10 py-10 '>
            <div className='border-b-2 border-primaryBtn py-4'>
                <div className='grid gap-5 lg:grid-cols-[1fr_1.5fr] w-full '>
                    <div className='flex flex-col gap-5 lg:items-start items-center'>
                        <div className='flex items-center gap-2.5'>
                            <NavLink to='/'>
                                <img src={Logo} alt="" />
                            </NavLink>
                        </div>
                        <p className='text-[16px] lg:text-start leading-relaxed text-center font-normal text-[#FFFFFFCC]'>The most trusted platform for reliable, safe, and efficient heavy  equipment rentals. Connecting construction professionals with verified  suppliers nationwide.</p>
                    </div>
                    <div className='flex w-full lg:justify-center justify-between  gap-20'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary max-sm:text-[10px] text-[20px] font-semibold'>Quick Links</h1>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Home</p>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>About</p>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Contact Us</p>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Help Center</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary  max-sm:text-[10px] text-[20px] font-semibold'>Machines</h1>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Excavators</p>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Cranes</p>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Bulldozers</p>
                            <p className='text-[16px] max-sm:text-[10px] text-gray-400'>Loaders</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-[20px] max-sm:text-[10px] text-primary font-semibold'>Follow Us</h1>
                                <div className='flex items-center gap-2.5'>
                                    <div className='flex justify-center items-center text-primary  bg-primaryBtn max-sm:w-[35px] max-sm:h-[35px] w-[55px] h-[55px] rounded-[50%]'>
                                        <TbBrandFacebook className='text-center text-2xl max-sm:text-xl' />
                                    </div>
                                    <div className='flex justify-center items-center text-primary  bg-primaryBtn max-sm:w-[35px] max-sm:h-[35px] w-[55px] h-[55px] rounded-[50%]'>
                                        <FaInstagram className='text-center text-2xl max-sm:text-xl' />
                                    </div>
                                    <div className='flex justify-center items-center text-primary  bg-primaryBtn max-sm:w-[35px] max-sm:h-[35px] w-[55px] h-[55px] rounded-[50%]'>
                                        <TbBrandLinkedin className='text-center text-2xl max-sm:text-xl' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className='grid gap-4 lg:grid-cols-[3.2fr_1.1fr] my-4'>
                <p className='text-gray-400'>© 2025 MachineRentals – All rights reserved.</p>
                <div className='flex justify-center items-center gap-2.5'>
                    <p className='text-gray-400'>Privacy Policy</p>
                    <p className='text-gray-400'>Terms of Service</p>
                    <p className='text-gray-400'>Cookie Policy</p>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
