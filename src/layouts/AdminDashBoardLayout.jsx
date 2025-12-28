import { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import AdminDashboardNavBar from '../components/NavBar/AdminDashboardNavBar';
import AdminDashBoardSideBar from '../pages/Dashboard/Admin/AdminDashBoardSideBar';


const AdminDashBoardLayout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col bg-[#F4F5F7]">
            <AdminDashboardNavBar />
            <div className="flex flex-1">
                <AdminDashBoardSideBar />
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

export default memo(AdminDashBoardLayout);