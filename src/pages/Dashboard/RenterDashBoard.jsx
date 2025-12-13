import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '../../assets/logo2.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/SaveTokenSlice';
import LeftArrowIcon from '../../assets/leftArrowIcon.svg';
import ActiveLeftArrowIcon from '../../assets/activeLeftArrow.svg';
import OverviewIcon from '../../assets/overviewIcon.svg';
import ActiveOverviewIcon from '../../assets/activeOverview.svg';
import BookingIcon from '../../assets/bookingIcon.svg';
import ActiveBookingIcon from '../../assets/activeBookingIcon.svg';
import ProfileIcon from '../../assets/profileIcon.svg';
import ActiveProfileIcon from '../../assets/activeProfileIcon.svg';
import SettingIcon from '../../assets/SettingIcon.svg';
import ActiveSettingIcon from '../../assets/activeSettingIcon.svg';
import LogOutIcon from '../../assets/LogOutIcon.svg';


const RenterDashBoard = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='bg-[#F4F5F7] h-[calc(100vh-96px)]'>
            <div className='flex gap-5'>
                <aside className="max-sm:hidden max-md:hidden fixed left-0 top-0 w-[20%] h-[calc(100vh-96px)] bg-white z-50 overflow-hidden">
                    <div className="flex flex-col justify-between h-full">
                        {/* LINKS */}
                        <div className='px-5 py-8'>
                            <NavItem to="/dashboard/overview" icon={OverviewIcon} activeIcon={ActiveOverviewIcon} text="Overview" />
                            <NavItem to="/dashboard/bookings" icon={BookingIcon} activeIcon={ActiveBookingIcon} text="My Bookings" />
                            <NavItem to="/dashboard/profile" icon={ProfileIcon} activeIcon={ActiveProfileIcon} text="Profile" />
                            <NavItem to="/dashboard/settings" icon={SettingIcon} activeIcon={ActiveSettingIcon} text="Settings" />
                        </div>

                        {/* LOGOUT */}
                        <button
                            onClick={handleLogout}
                            className="p-4 text-left text-navColor hover:text-secondary transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, activeIcon, text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink
            to={to}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={({ isActive }) =>
                `flex items-center justify-between hover:bg-primaryBtn rounded-md px-2 py-2 mb-2 ${isActive
                    ? "text-white font-semibold bg-primaryBtn"
                    : "text-navColor hover:text-white"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <div className='flex items-center gap-2'>
                        <img src={isActive || isHovered ? activeIcon : icon} alt="" className="w-5 h-5" />
                        <span>{text}</span>
                    </div>
                    <img src={isActive || isHovered ? ActiveLeftArrowIcon : LeftArrowIcon} alt="" className="w-4 h-4" />
                </>
            )}
        </NavLink>
    );
};

export default memo(RenterDashBoard);
