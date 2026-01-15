

import { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings } from '../../../../slices/Bookings/getAllBookings';
import { updateBookingStatus } from '../../../../slices/Bookings/ChangeBookingStatus';
import DropDownArrow from '../../../../assets/dropDownArrow.svg';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import SkeletonTable from '../Skeletons/SkeletonTable';
import Machine from '../../../../assets/machine2.jpeg';
import BookingDetailsDialog from './BookingDetailsDialog';
import DeleteCategoryAlert from '../Components/Category/DeleteCategoryAlert';

const columns = [
    { key: "owner_company", label: "Owner Company" },
    { key: "renter", label: "Renter" },
    { key: "booking_period", label: "Booking Period" },
    { key: "status", label: "Booking Status" },
    { key: "total_cost", label: "Total Costs" },
];

const bookingStatuses = ['approved', 'pending', 'in_progress', 'rejected', 'cancelled', 'completed'];

const formatStatusLabel = (value) => {
    if (!value) return "";
    const str = String(value).replace('_', '');
    return str.charAt(0).toUpperCase() + str.slice(1);
};


const BookingsTable = ({ filters = {} }) => {
    const dispatch = useDispatch();
    const { bookings, loading, totalPages } = useSelector((state) => state.getAllBookings);
    const tableRef = useRef(null);
    const [activeColumn, setActiveColumn] = useState("owner_company");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ show: false, title: "", type: "", color: "", borderColor: "" });

    const { search, status, city, booking_date } = filters || {};

    const handleRowClick = (booking) => {
        setSelectedBooking(booking);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, status, city, booking_date]);

    useEffect(() => {
        dispatch(fetchAllBookings({ page: currentPage, search, status, city, booking_date }));
    }, [dispatch, currentPage, search, status, city, booking_date]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeDropdown && !event.target.closest('.status-dropdown-container')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    // Scroll to dropdown when it opens
    useEffect(() => {
        if (activeDropdown) {
            // Small timeout to ensure the DOM has updated
            setTimeout(() => {
                const element = document.getElementById(`dropdown-${activeDropdown}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 100);
        }
    }, [activeDropdown]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        setActiveDropdown(null);

        const resultAction = await dispatch(updateBookingStatus({ bookingId, status: newStatus }));

        if (updateBookingStatus.fulfilled.match(resultAction)) {
            const backendMessage = resultAction.payload?.data?.message || "Status updated successfully";

            setAlertInfo({
                show: true,
                title: backendMessage,
                type: "success",
                color: "#68BB5FCC",
                borderColor: "#22C55E33"
            });

            dispatch(fetchAllBookings({ page: currentPage, search, status, city, booking_date }));

            setTimeout(() => {
                setAlertInfo(prev => ({ ...prev, show: false }));
            }, 3000);
        } else {
            const errorMessage = resultAction.payload || "Failed to update status";

            setAlertInfo({
                show: true,
                title: errorMessage,
                type: "error",
                color: "#EF5350CC",
                borderColor: "#EF535033"
            });

            setTimeout(() => {
                setAlertInfo(prev => ({ ...prev, show: false }));
            }, 3000);
        }
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
        if (lowerStatus === 'in_progress') return 'bg-blue-500';
        if (lowerStatus === 'completed') return 'bg-green-600';
        return 'bg-[#EF5350CC]';
    };
    const renderStatusCell = (booking) => (
        <div className={`relative status-dropdown-container w-30 h-8 text-xs rounded-xl ${getStatusColor(booking.status)}`}>
            <button
                type='button'
                onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === booking.id ? null : booking.id);
                }}
                className={`px-2 py-1 text-xs rounded-full text-white flex items-center gap-2 transition-all cursor-pointer hover:opacity-80`}
            >
                <div
                    className='flex  justify-center items-center gap-2 px-5 py-1 text-xs rounded-full text-white'
                >
                    {formatStatusLabel(booking.status)}
                    <img src={DropDownArrow} alt="arrow" className={`w-4 h-4 brightness-0 invert transition-transform ${activeDropdown === booking.id ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {activeDropdown === booking.id && (
                <div
                    id={`dropdown-${booking.id}`}
                    className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in origin-top-left"
                >
                    {bookingStatuses.map((status) => (
                        <button
                            type='button'
                            key={status}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(booking.id, status);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors capitalize cursor-pointer
                                ${booking.status?.toLowerCase() === status ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}
                            `}
                        >
                            {formatStatusLabel(status)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

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
        <div ref={tableRef}>
            {alertInfo.show && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle={alertInfo.title}
                        alertColor={alertInfo.color}
                        borderColor={alertInfo.borderColor}
                        type={alertInfo.type}
                    />
                </div>
            )}
            <BookingDetailsDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                booking={selectedBooking}
            />

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

                    <tbody className='relative'>
                        {loading ? (
                            <SkeletonTable rows={8} />
                        ) : (
                            bookings?.map((booking) => (
                                <tr
                                    key={booking.id}
                                    onClick={() => handleRowClick(booking)}
                                    className="border-t border-gray-300 hover:bg-blue-50 transition-colors cursor-pointer"
                                >
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

                                            renderStatusCell(booking)
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
                                        {renderStatusCell(booking)}
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

export default memo(BookingsTable);
