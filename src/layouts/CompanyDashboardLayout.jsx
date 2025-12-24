import { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import RenterDashBoardSideBar from '../pages/Dashboard/Renter/RenterDashBoardSideBar'
import RenterDashBoardNavBar from '../components/NavBar/RenterDashBoardNavBar'

const CompanyDashboardLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col bg-[#F4F5F7]">
            <RenterDashBoardNavBar />
            <div className="flex flex-1">
                <RenterDashBoardSideBar />
                <main key={location.pathname} className="flex-1 h-[calc(100vh-96px)] overflow-hidden">
                    {/* animate-page-fade defined in index.css */}
                    <div className="animate-page-fade py-8 px-8 h-[calc(100vh-96px)] overflow-y-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default memo(CompanyDashboardLayout);