import { memo } from 'react';
import TotalMachinesIcon from '../../../../assets/totalMachiensIcon.svg';
import TotalBookingsIcon from '../../../../assets/totalBookingsIcon.svg';
import ActivelMachinesIcon from '../../../../assets/activeMachinesIcon.svg';
import UnderMaintanceIcon from '../../../../assets/underMaintanceIcon.svg';
import AddMachineIcon from '../../../../assets/addMachineIcon.svg';
import ViewBookingsIcon from '../../../../assets/viewBookingsIcon.svg';
import ManageIcon from '../../../../assets/manageIcon.svg';
import IncreaseArrow from '../../../../assets/increaseArrow.svg';
import DecreaseArrow from '../../../../assets/decreaseArrow.svg';
import DropDownArrow from '../../../../assets/minusArrow.svg';
import ProgressBar from './Components/OverView/ProgressBar';
import MonthlyRevenueChart from './Components/OverView/MonthlyRevenueChart';
import MachineUtaliztionChart from './Components/OverView/MachineUtaliztionChart';



const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";



const CompanyOverView = () => {
    return (
        <div className="flex flex-col gap-10 p-6 bg-white border border-[#B2B2B2] rounded-[40px]  min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Company Dashboard</h1>
                <p className="text-sm text-gray-500">
                    Manage your bookings and profile — everything in one place.
                </p>
            </div>

            {/*Cards Review*/}
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>
                <div className='flex flex-col gap-4 border border-[#8A38F533] rounded-2xl p-4 bg-[#EDEEFC]'>
                    <h1>Total MAchines</h1>
                    <div className='flex justify-between items-center'>
                        <h1>10</h1>
                        <img src={TotalMachinesIcon} alt="" />
                    </div>
                    <div className='flex'>
                        <img src={IncreaseArrow}
                            alt="IncreaseArrow"
                            className='w-3'
                        />
                        <span className='text-[12px] text-[#22C55E]'>+12%</span>
                        <h1 className='text-[12px] text-[#0A254099]'>
                            vs last month
                        </h1>
                    </div>
                </div>

                <div className='flex flex-col gap-4 border border-[#F6C90E33] rounded-2xl p-4 bg-[#F6C90E1A]'>
                    <h1>Total Bookings</h1>
                    <div className='flex justify-between items-center'>
                        <h1>8</h1>
                        <img src={TotalBookingsIcon} alt="" />
                    </div>
                    <div className='flex'>
                        <img src={IncreaseArrow}
                            alt="IncreaseArrow"
                            className='w-3'
                        />
                        <span className='text-[12px] text-[#22C55E]'>+12%</span>
                        <h1 className='text-[12px] text-[#0A254099]'>
                            vs last month
                        </h1>
                    </div>
                </div>

                <div className='flex flex-col gap-4 border border-[#22C55E33] rounded-2xl p-4 bg-[#22C55E1A]'>
                    <h1>Active MAchines</h1>
                    <div className='flex justify-between items-center'>
                        <h1>8</h1>
                        <img src={ActivelMachinesIcon} alt="" />
                    </div>
                    <div className='flex'>
                        <img src={IncreaseArrow}
                            alt="IncreaseArrow"
                            className='w-3'
                        />
                        <span className='text-[12px] text-[#22C55E]'>+12%</span>
                        <h1 className='text-[12px] text-[#0A254099]'>
                            vs last month
                        </h1>
                    </div>
                </div>

                <div className='flex flex-col gap-4 border border-[#EF535033] rounded-2xl p-4 bg-[#EF53501A]'>
                    <h1>Under Maintenance</h1>
                    <div className='flex justify-between items-center'>
                        <h1>1</h1>
                        <img src={UnderMaintanceIcon} alt="" />
                    </div>
                    <div className='flex'>
                        <img src={DecreaseArrow}
                            alt="IncreaseArrow"
                            className='w-3'
                        />
                        <span className='text-[12px] text-[#EF5350]'>+12%</span>
                        <h1 className='text-[12px] text-[#0A254099]'>
                            vs last month
                        </h1>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className='w-full bg-primary border border-[#D2D2D2] rounded-2xl'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 p-5'>
                    <div className="relative w-full">
                        <select className={selectBase}>
                            <option>Today</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="arrow"
                            className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
                        />
                    </div>

                    <div className="relative w-full">
                        <select className={selectBase}>
                            <option>This Weak</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="arrow"
                            className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
                        />
                    </div>

                    <div className="relative w-full">
                        <select className={selectBase}>
                            <option>This Month</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="arrow"
                            className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            <div className='grid xl:grid-cols-2 grid-cols-1 gap-5'>
                <MonthlyRevenueChart />
                <MachineUtaliztionChart />
            </div>

            <div className='grid md:grid-cols-[2fr_1fr] grid-cols-1 w-full gap-5'>
                <div className='flex flex-col gap-4 border border-[#3A86FF26] p-5 rounded-2xl'>
                    <div className='flex flex-col gap-2 border-b border-[#E5E5EF]'>
                        <h1 className='text-[20px] font-semibold'>Monthly Revenue</h1>
                        <p className="text-[12px] text-gray-500">Revenue trend over time</p>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-[12px] text-[#615E8399]'>Forklifts</h1>
                        <ProgressBar progressIndecator={20} />
                        <h1 className='text-[12px] text-[#615E8399]'>12</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-[12px] text-[#615E8399]'>Loaders</h1>
                        <ProgressBar progressIndecator={30} />
                        <h1 className='text-[12px] text-[#615E8399]'>15</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-[12px] text-[#615E8399]'>Cranes</h1>
                        <ProgressBar progressIndecator={10} />
                        <h1 className='text-[12px] text-[#615E8399]'>10</h1>
                    </div>
                    <div className='flex gap-2'>
                        <h1 className='text-[12px] text-[#615E8399]'>Excavators</h1>
                        <ProgressBar progressIndecator={40} />
                        <h1 className='text-[12px] text-[#615E8399]'>30</h1>
                    </div>
                </div>

                <div className='flex flex-col gap-4 border border-[#3A86FF26] p-5 rounded-2xl'>
                    <div className='flex gap-2'>
                        <img src={AddMachineIcon} alt="" />
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold text-navColor'>Add Machine</h1>
                            <h1 className='font-medium text-[10px] text-[#16163199]'>Add a new machine to your inventory</h1>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <img src={ViewBookingsIcon} alt="" />
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold text-navColor'>View Bookings</h1>
                            <h1 className='font-medium text-[10px] text-[#16163199]'>Manage and review all bookings</h1>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <img src={ManageIcon} alt="" />
                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold text-navColor'>Manage Inventory</h1>
                            <h1 className='font-medium text-[10px] text-[#16163199]'>View and update machine inventory</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default memo(CompanyOverView);