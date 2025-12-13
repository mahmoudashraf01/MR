import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashBoardNavBar from '../components/NavBar/DashBoardNavBar'

const DashboardLayout = () => {
    const location = useLocation()

    return (
        <>
            <DashBoardNavBar />
            <main key={location.pathname} className="flex-1">
                {/* animate-page-fade defined in index.css */}
                <div className="animate-page-fade">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default DashboardLayout
