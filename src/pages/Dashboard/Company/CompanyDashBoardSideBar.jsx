import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../slices/SaveTokenSlice';
import LeftArrowIcon from '../../../assets/leftArrowIcon.svg';
import ActiveLeftArrowIcon from '../../../assets/activeLeftArrow.svg';
import OverviewIcon from '../../../assets/overviewIcon.svg';
import ActiveOverviewIcon from '../../../assets/activeOverview.svg';
import BookingIcon from '../../../assets/bookingIcon.svg';
import ActiveBookingIcon from '../../../assets/activeBookingIcon.svg';
import ProfileIcon from '../../../assets/profileIcon.svg';
import ActiveProfileIcon from '../../../assets/activeProfileIcon.svg';
import SettingIcon from '../../../assets/SettingIcon.svg';
import ActiveSettingIcon from '../../../assets/activeSettingIcon.svg';
import ActiveManageMachinesIcon from '../../../assets/ActiveManageMachineIcon.svg';
import ActivePlusIcon from '../../../assets/ActivePlusIcon.svg';
import PlusIcon from '../../../assets/plusIcon.svg';
import ManageMachinesIcon from '../../../assets/manageMachineIcon.svg';

import LogOutIcon from '../../../assets/LogOutIcon.svg';



const CompanyDashBoardSideBar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (

        <aside className="max-sm:hidden max-md:hidden w-[20%] bg-white overflow-hidden">
            <div className="flex flex-col justify-between h-full">
                {/* LINKS */}
                <div className='px-5 py-8'>
                    <NavItem to="/companyDashboard" icon={OverviewIcon} activeIcon={ActiveOverviewIcon} text="Overview" end={true} />
                    <NavItem to="/companyDashboard/manageMachines" icon={ManageMachinesIcon} activeIcon={ActiveManageMachinesIcon} text="Manage Machines" />
                    <NavItem to="/companyDashboard/addMachines" icon={PlusIcon} activeIcon={ActivePlusIcon} text="Add Machines" />
                    <NavItem to="/companyDashboard/companyBookings" icon={BookingIcon} activeIcon={ActiveBookingIcon} text="Bookings" />
                    <NavItem to="/companyDashboard/companyprofile" icon={ProfileIcon} activeIcon={ActiveProfileIcon} text="Profile" />
                    <NavItem to="/companyDashboard/companysettings" icon={SettingIcon} activeIcon={ActiveSettingIcon} text="Settings" />
                </div>

                {/* LOGOUT */}
                <div className='px-5 py-5 flex gap-2 hover:gap-3 '>
                    <img src={LogOutIcon} alt="" />
                    <NavLink to='/'
                        onClick={handleLogout}
                        className=" text-left text-navColor hover:text-primaryBtn transition-colors"
                    >
                        Log out
                    </NavLink>
                </div>
            </div>
        </aside>
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

export default memo(CompanyDashBoardSideBar);
