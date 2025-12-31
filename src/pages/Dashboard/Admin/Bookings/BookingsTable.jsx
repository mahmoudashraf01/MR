

import { memo, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import TrashIcon from '../../../../assets/trashIcon.svg';
import EditIcon from '../../../../assets/editIcon.svg';
import EyeIcon from '../../../../assets/eyeIcon.svg';
import Machine from '../../../../assets/machine2.jpeg';



const columns = [
    { key: "renter", label: "Renter" },
    { key: "owner_company", label: "Owner Company" },
    { key: "booking_status", label: "Booking Status" },
    { key: "booking_period", label: "Booking Period" },
    { key: "total_cost", label: "Total Cost" },
];

const machines = Array.from({ length: 8 });

const BookingsTable = () => {
    const [activeColumn, setActiveColumn] = useState("owner_company");
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>

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
            <div className="bg-white rounded-lg border-b border-[#D2D2D2]  overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-[#F8FAFB] shadow">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium">
                                Machine Name
                            </th>

                            {/* Mobile Dynamic Column */}
                            <th
                                className={`px-4 py-3 text-sm text-left font-medium lg:hidden transition-all duration-300 ease-in-out
                     ${activeColumn !== "subcategory"
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
                        {machines.map((_, i) => (
                            <tr key={i} className="border-t border-gray-300">
                                {/* Title */}
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <h1 className='text-xs font-medium'>Machine name</h1>
                                </td>

                                {/* Mobile Dynamic Cell */}
                                <td className="px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">

                                    {activeColumn === "owner_company" && (
                                        <span className="text-gray-500 text-sm">
                                            ---------------
                                        </span>
                                    )}

                                    {activeColumn === "renter" && (
                                        <span className="text-gray-500 text-sm">
                                            -------------
                                        </span>
                                    )}

                                    {activeColumn === "booking_status" && (
                                        <span className="px-3 py-1 text-xs rounded-full bg-[#68BB5FCC] text-white">
                                            Approved
                                        </span>
                                    )}

                                    {activeColumn === "booking_period" && (
                                        <h1>---------------</h1>
                                    )}

                                    {activeColumn === "total_cost" && (
                                        <div className="flex gap-3">
                                            ----------
                                        </div>
                                    )}
                                </td>

                                {/* Desktop Cells */}
                                <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                    -----------
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                    -------------
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                    -------------
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3">
                                    <span className="px-3 py-1 text-xs rounded-full bg-[#68BB5FCC] text-white">
                                        Approved
                                    </span>
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3">
                                    <div className="flex gap-3">
                                        <h1>---------</h1>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(BookingsTable);