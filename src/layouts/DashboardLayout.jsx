import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import RenterDashBoardSideBar from '../pages/Dashboard/RenterDashBoardSideBar'
import DashBoardNavBar from '../components/NavBar/DashBoardNavBar'

const DashboardLayout = () => {
    const location = useLocation()

    return (
        <div className="flex flex-col bg-[#F4F5F7]">
            <DashBoardNavBar />
            <div className="flex flex-1">
                <RenterDashBoardSideBar />
                <main key={location.pathname} className="flex-1 h-[calc(100vh-96px)] overflow-hidden">
                    {/* animate-page-fade defined in index.css */}
                    <div className="animate-page-fade py-8 pl-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
