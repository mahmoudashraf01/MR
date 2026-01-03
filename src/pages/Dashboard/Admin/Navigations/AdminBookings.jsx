import { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings } from '../../../../slices/Bookings/getAllBookings';
import DropDownArrow from '../../../../assets/dropdownArrow.svg';
import SearchBtn from '../../../../assets/search.svg';
import DateIcon from '../../../../assets/dateIcon.svg';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import SkeletonTable from '../Skeletons/SkeletonTable';
import Machine from '../../../../assets/machine2.jpeg';

const columns = [
    { key: "owner_company", label: "Owner Company" },
    { key: "renter", label: "Renter" },
    { key: "booking_period", label: "Booking Period" },
    { key: "status", label: "Booking Status" },
    { key: "total_cost", label: "Total Costs" },
];

const AdminBookings = () => {
    const dispatch = useDispatch();
    const { bookings, loading, totalPages } = useSelector((state) => state.getAllBookings);
    const tableRef = useRef(null);
    const inputRef = useRef(null);

    const [activeColumn, setActiveColumn] = useState("owner_company");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchAllBookings(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openDatePicker = () => {
        inputRef.current?.showPicker?.() || inputRef.current?.focus();
    };

    const calculatePeriod = (start, end) => {
        if (!start || !end) return "N/A";
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const days = Math.max(1, diffDays); // Ensure at least 1 day
        return days === 1 ? "1 day" : `${days} days`;
    };

    const getStatusColor = (status) => {
        const lowerStatus = status?.toLowerCase() || "";
        if (lowerStatus === 'pending') return 'bg-secondary';
        if (lowerStatus === 'approved') return 'bg-[#68BB5FCC]';
        return 'bg-[#EF5350CC]';
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        const createButton = (pageNum) => (
            <button
                key={`page-${pageNum}`}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ${pageNum === currentPage ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                aria-label={`Page ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
            >
                {pageNum}
            </button>
        );

        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(createButton(i));
            }
        } else {
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, currentPage + 1);

            if (currentPage === 1) {
                endPage = 3;
            } else if (currentPage === totalPages) {
                startPage = totalPages - 2;
            }

            if (startPage > 1) {
                buttons.push(createButton(1));
                if (startPage > 2) {
                    buttons.push(<span key="ellipsis-start" className='px-2 text-xs text-gray-400 font-medium'>...</span>);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(createButton(i));
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    buttons.push(<span key="ellipsis-end" className='px-2 text-xs text-gray-400 font-medium'>...</span>);
                }
                buttons.push(createButton(totalPages));
            }
        }
        return buttons;
    };

    return (
        <div ref={tableRef} className="p-6 bg-white min-h-screen rounded-[40px]  border border-[#B2B2B2]">

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

            {/* Mobile Column Menu */}
            <div className="relative mb-3 lg:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="border border-[#D2D2D2] rounded-md px-4 py-2 w-full flex justify-between"
                >
                    Columns
                    {menuOpen ? <AiOutlineClose className="w-4 h-4" /> : <AiOutlineMenu className="w-4 h-4" />}
                </button>

                {menuOpen && (
                    <div className="absolute animate-fade-in duration-300 z-10 bg-white border rounded-md w-full mt-2">
                        {columns.map((col) => (
                            <button
                                key={col.key}
                                onClick={() => {
                                    setActiveColumn(col.key);
                                    setMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm
                  ${activeColumn === col.key
                                        ? "text-primaryBtn font-medium bg-blue-50"
                                        : "text-gray-700"
                                    }`}
                            >
                                {col.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg  overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-[#D2D2D2]/5 shadow">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium">
                                Machine Name
                            </th>

                            {/* Mobile Dynamic Column */}
                            <th
                                className={`px-4 py-3 text-sm text-left font-medium lg:hidden transition-all duration-300 ease-in-out
                  ${activeColumn !== "owner_company"
                                        ? "text-blue-600"
                                        : ""
                                    }`}
                            >
                                {columns.find((c) => c.key === activeColumn)?.label}
                            </th>

                            {/* Desktop Columns */}
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Owner Company</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Renter</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Booking Period</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Booking Status</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Total Costs</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <SkeletonTable rows={8} />
                        ) : (
                            bookings?.map((booking) => (
                                <tr key={booking.id} className="border-t border-gray-300 hover:bg-blue-50 transition-colors">
                                    {/* Machine Name */}
                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <img src={booking.machine?.images?.[0] || Machine} alt={booking.machine?.title} className="w-8 h-8 rounded-md" />
                                        <span className="text-sm font-medium">
                                            {booking.machine?.title || "N/A"}
                                        </span>
                                    </td>

                                    {/* Mobile Dynamic Cell */}
                                    <td className="px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">
                                        {activeColumn === "owner_company" && (
                                            <span className="text-gray-500 text-sm">
                                                {booking.owner_company?.company_name || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "renter" && (
                                            <span className="text-gray-500 text-sm">
                                                {booking.renter?.name || booking.renter?.contact_person || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "booking_period" && (
                                            <span className="text-gray-500 text-sm">
                                                {calculatePeriod(booking.start_date, booking.end_date)}
                                            </span>
                                        )}

                                        {activeColumn === "status" && (
                                            <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)} text-white`}>
                                                {booking.status}
                                            </span>
                                        )}

                                        {activeColumn === "total_cost" && (
                                            <span className="text-gray-500 text-sm">
                                                {booking.total_cost || "0"}
                                            </span>
                                        )}
                                    </td>

                                    {/* Desktop Cells */}
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {booking.owner_company?.company_name || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {booking.renter?.name || booking.renter?.contact_person || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {calculatePeriod(booking.start_date, booking.end_date)}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)} text-white`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {booking.total_cost || "0"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-end pt-5'>
                {/* Pagination */}
                <nav className='flex justify-center items-center gap-1.5 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-100' aria-label="Pagination">
                    <button
                        className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    >
                        Previous
                    </button>

                    {/* Page number buttons */}
                    {renderPaginationButtons()}

                    <button
                        className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 disabled:opacity-50 transition-all duration-200 font-semibold flex items-center gap-1.5'
                        aria-label="Next page"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    >
                        Next
                        <FaArrowRight className='text-xs' />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default memo(AdminBookings);