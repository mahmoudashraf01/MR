import React, { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../../assets/logo2.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/SaveTokenSlice';
import DropDownArrow from '../../assets/dropDownArrow.svg';
import UserLocationIcon from '../../assets/location2.svg';
import LogOutIcon from '../../assets/logOutIcon.svg';
import { MdLogout } from "react-icons/md";
import ActiveLeftArrowIcon from '../../assets/activeLeftArrow.svg';
import OverviewIcon from '../../assets/overviewIcon.svg';
import ActiveOverviewIcon from '../../assets/activeOverview.svg';
import BookingIcon from '../../assets/bookingIcon.svg';
import ActiveBookingIcon from '../../assets/activeBookingIcon.svg';
import ProfileIcon from '../../assets/profileIcon.svg';
import ActiveProfileIcon from '../../assets/activeProfileIcon.svg';
import SettingIcon from '../../assets/settingIcon.svg';
import ActiveSettingIcon from '../../assets/activeSettingIcon.svg';
import ActiveAnaliticsIcon from '../../assets/activeAnalyticsIcon.svg';
import ActiveManageMachinesIcon from '../../assets/ActiveManageMachineIcon.svg';
import ActivePlusIcon from '../../assets/activePlusIcon.svg';
import PlusIcon from '../../assets/plusIcon.svg';
import AnaliticsIcon from '../../assets/analyticsIcon.svg';
import ManageMachinesIcon from '../../assets/manageMachineIcon.svg';


const CompanyDashboardNavBar = () => {
    const [nav, setNav] = useState(true);
    const [openSummary, setOpenSummary] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    const dispatch = useDispatch();
    const { token, user, role } = useSelector((state) => state.saveToken || {});
    const userFullName = user?.first_name + ' ' + user?.last_name;
    const displayName = user?.name || userFullName || user?.company_name || user?.companyName || user?.first_name
        || user?.username || 'User';
    const displayRole = role ? String(role).charAt(0).toUpperCase() + String(role).slice(1) : null;

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className='flex w-full justify-between items-center h-24 bg-navColor mx-auto px-6 md:px-8 text-primary shadow-md'>
            <NavLink to='/' className='flex items-center'>
                <img src={Logo} alt="Logo" className='h-10 md:h-12' />
            </NavLink>

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
                    <div className='flex items-center gap-2'>
                        <div className='text-white text-[16px] font-medium relative'>
                            <div
                                onClick={() => setOpenSummary(!openSummary)}
                                className="flex gap-5 justify-between items-center text-sm font-medium cursor-pointer py-2"
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    <div className='w-8 h-8 bg-primaryBtn rounded-full'></div>
                                    <div className='flex flex-col justify-center items-center'>
                                        {displayName}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <span
                                        className={`transform transition-transform duration-300 ${openSummary
                                            ? "rotate-0"
                                            : "rotate-180"
                                            }`}
                                    >
                                        <img src={DropDownArrow} alt="" />
                                    </span>
                                </div>
                            </div>

                            {/* DROPDOWN CONTENT - Absolutely positioned */}
                            <div
                                className={`absolute top-full right-0 mt-2 w-48 bg-white/90 rounded-lg shadow-lg border border-gray-200 z-50 transition-all duration-300 ${openSummary ? "opacity-100 visible" : "opacity-0 invisible"}`}
                            >
                                <div className="p-4">
                                    {displayRole && (
                                        <NavLink to="/" className='mb-3 flex justify-center items-center'>
                                            <span className='text-xs text-white w-full text-center bg-secondary hover:bg-secondary/80 px-2 py-1 rounded'>
                                                <h1 className="text-navColor ">
                                                    Back To Home
                                                </h1>
                                            </span>
                                        </NavLink>
                                    )}
                                    <div className=" flex gap-2 text-xs mb-3 leading-relaxed">
                                        <div className='text-[10px] text-gray-700'>{displayRole.toLowerCase() === 'renter' ? user?.renter?.city : displayRole.toLowerCase() === 'company' ? user?.company?.city : user?.admin?.city || 'Location'}</div>
                                        <img src={UserLocationIcon} alt="" />
                                    </div>
                                    <div className='flex items-center border-t border-gray-200'>
                                        <button onClick={handleLogout} className='text-left hover:text-[15px] w-full px-3 py-2 text-sm text-black rounded transition-colors'>
                                            Logout
                                        </button>
                                        <img className='w-5' src={LogOutIcon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <button onClick={handleLogout} className='px-3 py-2 rounded-lg bg-white/10 text-white text-sm hover:bg-white/20 transition'>Logout</button> */}
                    </div>
                )}
            </div>
            <div onClick={handleNav} className='block lg:hidden cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors'>
                {!nav ? <AiOutlineClose size={24} className='text-white' /> : <AiOutlineMenu size={24} className='text-white' />}
            </div>

            <ul className={!nav ? 'lg:hidden fixed left-0 top-0 w-[70%] sm:w-[60%] border-r border-r-gray-900 h-full z-50 bg-navColor ease-in-out duration-300 shadow-2xl' : 'fixed -left-full top-0 w-[70%] sm:w-[60%] border-r border-r-gray-900 h-full bg-navColor z-50 ease-in-out duration-300'}>
                <div className={`${token ? 'flex flex-col justify-between h-full' : 'flex flex-col justify-between '}`} >
                    <div className='flex items-center justify-between py-6 px-6 border-b border-gray-700'>
                        <img src={Logo} alt="Logo" className='h-10' />
                        <button onClick={handleNav} className='p-2 hover:bg-white/10 rounded-lg'>
                            <AiOutlineClose size={20} className='text-white' />
                        </button>
                    </div>

                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard" icon={OverviewIcon} activeIcon={ActiveOverviewIcon} text="Overview" end={true} />
                    </li>
                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard/manageMachines" icon={ManageMachinesIcon} activeIcon={ActiveManageMachinesIcon} text="Manage Machines" end={true} />
                    </li>
                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard/addMachines" icon={PlusIcon} activeIcon={ActivePlusIcon} text="Add Machine" end={true} />
                    </li>
                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard/companyAnalitics" icon={AnaliticsIcon} activeIcon={ActiveAnaliticsIcon} text="Analitics" />
                    </li>
                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard/companyBookings" icon={BookingIcon} activeIcon={ActiveBookingIcon} text="My Bookings" />
                    </li>
                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard/companyprofile" icon={ProfileIcon} activeIcon={ActiveProfileIcon} text="Profile" />
                    </li>
                    <li className='px-4 py-2 border-gray-700'>
                        <NavItem to="/companyDashboard/companysettings" icon={SettingIcon} activeIcon={ActiveSettingIcon} text="Settings" />
                    </li>
                    {!token ? (
                        <>
                            <li className='p-4 border-gray-700'>
                                <NavLink to='/auth/login' onClick={handleNav} className=' block py-2 transition-colors font-medium text-primary duration-200 hover:text-secondary'>
                                    Login
                                </NavLink>
                            </li>
                            <li className='p-4 border-gray-700'>
                                <NavLink to='/auth' onClick={handleNav} className=' block py-2 transition-colors  font-medium text-primary duration-200 hover:text-secondary'>
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='p-4 border-gray-700'>
                                <div className='flex px-2 gap-4 rounded-md justify-start items-center'>
                                    <MdLogout />
                                    <button onClick={() => { handleNav(); handleLogout(); }} className=' block py-2 hover:text-blue-400 hover:text-[17px] hover cursor-pointer transition-colors font-medium text-primary duration-200'>
                                        Logout
                                    </button>
                                </div>
                            </li>
                            <div className='flex flex-col border-t border-gray-700 py-3 px-2 transition-colors font-medium text-white mt-auto'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <div className='w-8 h-8 bg-primaryBtn rounded-full'></div>
                                        <div className='flex flex-col justify-center items-start'>
                                            {displayName}
                                            <div className=' text-[10px] text-[#D4D4D4]'>{displayRole.toLowerCase() === 'renter' ? user?.renter?.city : displayRole.toLowerCase() === 'company' ? user?.company?.city : user?.admin?.city}</div>
                                        </div>
                                    </div>
                                    {displayRole && (
                                        <span className='text-xs text-white bg-secondary ml-2 px-5 py-2 rounded'>
                                            <NavLink to='/'>
                                                Back To Home
                                            </NavLink>
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


const NavItem = ({ to, icon, activeIcon, text, end }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink
            to={to}
            end={end}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={({ isActive }) =>
                `flex items-center justify-between hover:bg-primaryBtn rounded-md px-2 py-2 mb-2 ${isActive
                    ? "text-white font-semibold bg-primaryBtn"
                    : "text-white hover:text-white"
                }`
            }
        >
            <div className='flex items-center gap-2'>
                <img src={activeIcon} alt="" className="w-5 h-5" />
                <span>{text}</span>
            </div>
            <img src={ActiveLeftArrowIcon} alt="" className="w-4 h-4" />

        </NavLink>
    );
};

export default memo(CompanyDashboardNavBar);