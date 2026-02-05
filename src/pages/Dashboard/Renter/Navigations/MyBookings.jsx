import { memo, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DropDownArrow from '../../../../assets/dropDownArrow.svg';
import SearchBtn from '../../../../assets/search.svg';
import DateIcon from '../../../../assets/dateIcon.svg';
import BookingsTable from '../../Admin/Bookings/BookingsTable';


const MyBookings = () => {
    const inputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState("");
    const [city, setCity] = useState("");
    const [bookingDate, setBookingDate] = useState("");

    const { bookings } = useSelector((state) => state.getAllBookings);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const cities = Array.from(
        new Set(
            (bookings || [])
                .map((b) => b.owner_company?.city)
                .filter(Boolean)
        )
    );

    const filters = {
        search: debouncedSearch || undefined,
        status: status || undefined,
        city: city || undefined,
        booking_date: bookingDate || undefined,
    };

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
                        placeholder="Search by machine name ..."
                        className="w-full bg-white border text-sm placeholder:text-[#9CA3AF] border-[#D2D2D2] rounded-md pl-10 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full flex-col sm:flex-row gap-4">
                    <div className="relative w-full md:w-55 ">
                        <select
                            className="appearance-none cursor-pointer bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Status</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative w-full md:w-55">
                        <select
                            className="appearance-none cursor-pointer bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>

                    <div className="relative w-full md:w-55">
                        <input
                            ref={inputRef}
                            type='date'
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
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

            <BookingsTable filters={filters} />
        </div>
    );
};

export default memo(MyBookings);