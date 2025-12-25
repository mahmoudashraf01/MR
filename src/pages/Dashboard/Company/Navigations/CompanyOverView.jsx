import { memo } from 'react';
import TotalMachinesIcon from '../../../../assets/totalMachiensIcon.svg';
import TotalBookingsIcon from '../../../../assets/totalBookingsIcon.svg';
import ActivelMachinesIcon from '../../../../assets/activeMachinesIcon.svg';
import UnderMaintanceIcon from '../../../../assets/underMaintanceIcon.svg';
import IncreaseArrow from '../../../../assets/increaseArrow.svg';
import DecreaseArrow from '../../../../assets/decreaseArrow.svg';
import DropDownArrow from '../../../../assets/minusArrow.svg';

const labelBase = "block text-sm font-medium text-navColor mb-1";

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

        </div>
    );
};

export default memo(CompanyOverView);