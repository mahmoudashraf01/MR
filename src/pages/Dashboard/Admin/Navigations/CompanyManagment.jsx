import { memo, useState } from 'react';
import SearchBtn from '../../../../assets/search.svg';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import DropDownArrow from '../../../../assets/dropdownArrow.svg';
import TrashIcon from '../../../../assets/trashIcon.svg';
import EditIcon from '../../../../assets/editIcon.svg';
import EyeIcon from '../../../../assets/eyeIcon.svg';
import Machine from '../../../../assets/machine2.jpeg';


const columns = [
    { key: "city", label: "City" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];

const machines = Array.from({ length: 8 });

const CompanyManagment = () => {
    const [activeColumn, setActiveColumn] = useState("category");
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="p-6 bg-white min-h-screen rounded-[40px]  border border-[#B2B2B2]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className='flex flex-col justify-center lg:items-start items-center'>
                    <h1 className="text-2xl font-semibold">Companies Management</h1>
                    <p className="text-gray-500 text-sm">
                        Review, verify, and manage registered companies
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
                                Company Name
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
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">City</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Phone</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Status</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {machines.map((_, i) => (
                            <tr key={i} className="border-t border-gray-300">
                                {/* Title */}
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={Machine} alt="machine" className="w-8 h-8 rounded-md" />
                                    <span className="text-sm font-medium">
                                        CAT 320 Excavator
                                    </span>
                                </td>

                                {/* Mobile Dynamic Cell */}
                                <td className="px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">
                                    {activeColumn === "city" && (
                                        <span className="text-gray-500 text-sm">
                                            Alex
                                        </span>
                                    )}

                                    {activeColumn === "phone" && (
                                        <span className="text-gray-500 text-sm">
                                            01087678656
                                        </span>
                                    )}

                                    {activeColumn === "status" && (
                                        <span className="px-3 py-1 text-xs rounded-full bg-primaryBtn text-white">
                                            Verified
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
                                    Excavators
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                    $150 / Day
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3">
                                    <span className="px-3 py-1 text-xs rounded-full bg-primaryBtn text-white">
                                        In Use
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(CompanyManagment);