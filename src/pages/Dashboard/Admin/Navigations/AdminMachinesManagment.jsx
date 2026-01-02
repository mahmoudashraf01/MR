

import { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicMachines } from '../../../../slices/GetAllmachinesByPage';
import SearchBtn from '../../../../assets/search.svg';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import DropDownArrow from '../../../../assets/dropdownArrow.svg';
import TrashIcon from '../../../../assets/trashIcon.svg';
import EditIcon from '../../../../assets/editIcon.svg';
import EyeIcon from '../../../../assets/eyeIcon.svg';
import Machine from '../../../../assets/machine2.jpeg';
import SkeletonTable from '../Skeletons/SkeletonTable';

const columns = [
    { key: "category", label: "Category" },
    { key: "city", label: "City" },
    { key: "owner_company", label: "Owner Company" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];

const AdminMachinesManagment = () => {
    const dispatch = useDispatch();
    const { machines, loading, totalPages } = useSelector((state) => state.machinesByPage);
    const tableRef = useRef(null);

    const [activeColumn, setActiveColumn] = useState("category");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPublicMachines(currentPage));
    }, [dispatch, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 3;

        // Helper function to create button
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
            // Logic for more than 4 pages
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, currentPage + 1);

            if (currentPage === 1) {
                endPage = 3;
            } else if (currentPage === totalPages) {
                startPage = totalPages - 2;
            }

            // Always show first page if not in range
            if (startPage > 1) {
                buttons.push(createButton(1));
                if (startPage > 2) {
                    buttons.push(<span key="ellipsis-start" className='px-2 text-xs text-gray-400 font-medium'>...</span>);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(createButton(i));
            }

            // Always show last page if not in range
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
                    <h1 className="text-2xl font-semibold">Manage Machines</h1>
                    <p className="text-gray-500 text-sm">
                        View and manage your rental machines
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

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>Category</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>Status</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>City</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
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
                                Title
                            </th>

                            {/* Mobile Dynamic Column */}
                            <th
                                className={`px-4 py-3 text-sm text-left font-medium lg:hidden transition-all duration-300 ease-in-out
                  ${activeColumn !== "category"
                                        ? "text-blue-600"
                                        : ""
                                    }`}
                            >
                                {columns.find((c) => c.key === activeColumn)?.label}
                            </th>

                            {/* Desktop Columns */}
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Category</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">City</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Owner Company</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Status</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <SkeletonTable rows={8} />
                        ) : (
                            machines?.map((machine) => (
                                <tr key={machine.id} className="border-t border-gray-300 hover:bg-blue-50 transition-colors">
                                    {/* Title */}
                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <img src={machine.images[0] || Machine} alt={machine.title} className="w-8 h-8 rounded-md" />
                                        <span className="text-sm font-medium">
                                            {machine.title}
                                        </span>
                                    </td>

                                    {/* Mobile Dynamic Cell */}
                                    <td className="px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">
                                        {activeColumn === "category" && (
                                            <span className="text-gray-500 text-sm">
                                                {machine.category?.name || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "city" && (
                                            <span className="text-gray-500 text-sm">
                                                {machine.location_city || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "owner_company" && (
                                            <span className="text-gray-500 text-sm">
                                                {machine.company?.company_name || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "status" && (
                                            <span className={`px-3 py-1 text-xs rounded-full ${machine.availability_status === 'available' ? 'bg-[#68BB5FCC]' : 'bg-[#EF5350CC]'} text-white`}>
                                                {machine.availability_status}
                                            </span>
                                        )}

                                        {activeColumn === "actions" && (
                                            <div className="flex gap-3">
                                                <img src={TrashIcon} alt="delete" className="w-4 h-4" />
                                                <img src={EditIcon} alt="edit" className="w-4 h-4" />
                                                <img src={EyeIcon} alt="view" className="w-4 h-4" />
                                            </div>
                                        )}
                                    </td>

                                    {/* Desktop Cells */}
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {machine.category?.name || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {machine.location_city || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {machine.company?.company_name || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <span className={`px-3 py-1 text-xs rounded-full ${machine.availability_status === 'available' ? 'bg-[#68BB5FCC]' : 'bg-[#EF5350CC]'} text-white`}>
                                            {machine.availability_status}
                                        </span>
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <div className="flex gap-3">
                                            <img src={TrashIcon} alt="delete" className="w-4 h-4" />
                                            <img src={EditIcon} alt="edit" className="w-4 h-4" />
                                            <img src={EyeIcon} alt="view" className="w-4 h-4" />
                                        </div>
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

export default memo(AdminMachinesManagment);