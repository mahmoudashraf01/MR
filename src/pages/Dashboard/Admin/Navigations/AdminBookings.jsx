import { memo, useRef } from 'react';
import DropDownArrow from '../../../../assets/dropdownArrow.svg';
import SearchBtn from '../../../../assets/search.svg';
import DateIcon from '../../../../assets/dateIcon.svg';
import BookingsTable from '../Bookings/BookingsTable';


const AdminBookings = () => {
    const inputRef = useRef(null);
    const openDatePicker = () => {
        inputRef.current?.showPicker?.() || inputRef.current?.focus();
    };

    return (
        <div className="p-6 bg-white min-h-screen rounded-[40px]  border border-[#B2B2B2]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className='flex flex-col justify-center lg:items-start items-center'>
                    <h1 className="text-2xl font-semibold">Bookings Overview</h1>
                    <p className="text-gray-500 text-center text-sm">
                        Monitor and track all bookings across the platform
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-[#D2D2D2]/5 rounded-2xl border border-[#D2D2D2] p-4 mb-6 space-y-4">
                <div className="relative">
                    <img
                        src={SearchBtn}
                        alt="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    />
                    <input
                        placeholder="Search ..."
                        className="w-full bg-white border text-sm placeholder:text-[#9CA3AF] border-[#D2D2D2] rounded-md pl-10 py-2"
                    />
                </div>

                <div className="flex w-full flex-col sm:flex-row gap-4">
                    <div className="relative w-full md:w-55 ">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>Status</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative w-full md:w-55">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>City</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>

                    <div className="relative w-full md:w-55">
                        <input ref={inputRef}
                            type='date'
                            className=" bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full [&::-webkit-calendar-picker-indicator]:hidden">
                        </input>
                        <img
                            onClick={openDatePicker}
                            src={DateIcon}
                            alt="dropdown"
                            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 w-6 h-6"
                        />
                    </div>
                </div>
            </div>

            <BookingsTable />

        </div>
    );
};

export default memo(AdminBookings);