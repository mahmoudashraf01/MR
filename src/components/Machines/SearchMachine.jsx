import { memo } from 'react';
import Search from '../../assets/search.svg'
import SearchBTN from '../../assets/SearchBTN.svg'
import Location from '../../assets/location2.svg'

const SearchMachine = () => {
    return (
        <div className='w-full px-4 md:px-8'>
            <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-4 md:p-5 border border-gray-100">
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {/* Keyword */}
                    <div className="w-full">
                        <div className="relative flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <img src={Search} alt="search" className="w-4 h-4 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search by keyword"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                                aria-label="Search machines by keyword"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="w-full">
                        <div className="relative flex items-center text-gray-600 gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <select 
                                className="w-full outline-none text-sm bg-transparent cursor-pointer appearance-none"
                                aria-label="Select category"
                            >
                                <option>All Categories</option>
                            </select>
                            <svg className="absolute right-3 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="w-full">
                        <div className="relative flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <img src={Location} alt="location" className="w-4 h-4 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                                aria-label="Enter location"
                            />
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="w-full">
                        <div className="relative flex items-center text-gray-600 gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <select 
                                className="w-full outline-none text-sm bg-transparent cursor-pointer appearance-none"
                                aria-label="Sort by"
                            >
                                <option>Newest</option>
                            </select>
                            <svg className="absolute right-3 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center items-center">
                        <button 
                            className="flex justify-center items-center bg-primaryBtn w-full text-white px-4 py-2.5 rounded-lg gap-1.5 hover:opacity-90 transition-all duration-200 shadow-sm hover:shadow-md font-semibold text-sm"
                            aria-label="Search machines"
                        >
                            <img src={SearchBTN} alt="search" className="w-4 h-4" />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(SearchMachine);