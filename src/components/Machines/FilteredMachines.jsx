import { memo, useEffect, useState } from 'react';
import { FaArrowRight, FaSortAmountDown, FaTh, FaList } from 'react-icons/fa';
import MachinesFilter from './MachinesFilter';
import FilteredMachineCards from './FilteredMachineCards';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicMachines } from '../../slices/GetAllmachinesByPage';

const FilteredMachines = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');

    const dispatch = useDispatch();
    const { machines, totalPages, loading } = useSelector((state) => state.machinesByPage);

    useEffect(() => {
        dispatch(fetchPublicMachines(1));
    }, []);

    console.log("Machines by page:", machines);
    console.log("Machines by page:", totalPages);

    return (
        <div className='w-full bg-equipmentBg pb-16 pt-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                    {/* Filter Sidebar */}
                    <aside className='lg:w-72 shrink-0'>
                        <MachinesFilter />
                    </aside>

                    {/* Main Content */}
                    <main className='flex-1 min-w-0'>
                        <div className='flex flex-col gap-5'>
                            {/* Header with Sort and View Options */}
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                                <div className='flex items-baseline gap-3'>
                                    <h1 className='text-xl sm:text-2xl font-bold text-gray-900 leading-tight'>Available Machines</h1>
                                    <span className='text-xs font-semibold bg-primaryBtn/10 text-primaryBtn px-2.5 py-1 rounded-full border border-primaryBtn/20'>
                                        {totalPages} results
                                    </span>
                                </div>

                                {/* Sort and View Controls */}
                                <div className='flex items-center gap-2'>
                                    {/* Sort Dropdown */}
                                    <div className='relative group'>
                                        <button className='flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-primaryBtn transition-all duration-200 shadow-sm hover:shadow-md'>
                                            <FaSortAmountDown className='text-primaryBtn text-sm' />
                                            <span className='text-xs font-bold text-gray-700'>Sort</span>
                                            <svg className="w-3 h-3 text-gray-400 group-hover:text-primaryBtn transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <div className='absolute right-0 mt-1.5 w-40 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20'>
                                            <button
                                                onClick={() => setSortBy('newest')}
                                                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'newest' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Newest First
                                            </button>
                                            <button
                                                onClick={() => setSortBy('price-low')}
                                                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'price-low' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Price: Low to High
                                            </button>
                                            <button
                                                onClick={() => setSortBy('price-high')}
                                                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'price-high' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Price: High to Low
                                            </button>
                                            <button
                                                onClick={() => setSortBy('rating')}
                                                className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'rating' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Highest Rated
                                            </button>
                                        </div>
                                    </div>

                                    {/* View Mode Toggle */}
                                    <div className='flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm'>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid'
                                                ? 'bg-primaryBtn text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                            aria-label="Grid view"
                                        >
                                            <FaTh className='text-xs' />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list'
                                                ? 'bg-primaryBtn text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                            aria-label="List view"
                                        >
                                            <FaList className='text-xs' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Machine Cards Grid */}
                            <div className={`grid ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                                : 'grid-cols-1 gap-4'
                                }`}>
                                {machines.map((machine) => (
                                    <FilteredMachineCards key={machine.id} machine={machine} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <nav className='flex justify-center items-center gap-1.5 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-100' aria-label="Pagination">
                                <button
                                    className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled
                                    aria-label="Previous page"
                                >
                                    Previous
                                </button>
                                <button className='px-3 py-2 bg-primaryBtn text-white rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-all duration-200' aria-label="Page 1" aria-current="page">1</button>
                                <button className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold' aria-label="Page 2">2</button>
                                <button className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold' aria-label="Page 3">3</button>
                                <span className='px-2 text-xs text-gray-400 font-medium' aria-hidden="true">...</span>
                                <button className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold' aria-label="Page 10">10</button>
                                <button className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold flex items-center gap-1.5' aria-label="Next page">
                                    Next
                                    <FaArrowRight className='text-xs' />
                                </button>
                            </nav>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default memo(FilteredMachines);


