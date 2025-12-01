import { memo } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import EquipmentCategory from '../../assets/category_search.svg';
import EquipmentName from '../../assets/equipmentSearch.svg';

const SearchContainer = () => {
    return (
        <div className="w-full px-4 md:px-10">
            <div className="w-full bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                {/* Desktop & Large Screens */}
                <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-4 items-end">
                    {/* Equipment Name */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <img src={EquipmentName} alt="" /> Equipment Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter Equipment Name"
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm placeholder-gray-400 hover:border-gray-300"
                                aria-label="Equipment name"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <img src={EquipmentCategory} alt="" /> Category
                        </label>
                        <div className="relative">
                            <select
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm appearance-none cursor-pointer hover:border-gray-300 bg-white"
                                aria-label="Category"
                            >
                                <option>All Categories</option>
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <FaMapMarkerAlt className='text-primaryBtn text-base' /> Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter city or zip code"
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm placeholder-gray-400 hover:border-gray-300"
                                aria-label="Location"
                            />
                        </div>
                    </div>

                    {/* Date From */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <FaCalendarAlt className='text-primaryBtn text-base' /> Date From
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm hover:border-gray-300 cursor-pointer"
                                aria-label="Start date"
                            />
                        </div>
                    </div>

                    {/* Date To */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <FaCalendarAlt className='text-primaryBtn text-base' /> Date To
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm hover:border-gray-300 cursor-pointer"
                                aria-label="End date"
                            />
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-end mt-2">
                    <button
                        className="bg-primaryBtn text-white px-8 py-3.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 font-semibold"
                        aria-label="Search for equipment"
                    >
                        <FaSearch className="text-base" />
                        <span>Search</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(SearchContainer);


