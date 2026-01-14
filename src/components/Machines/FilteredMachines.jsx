import { memo, useEffect, useState, useRef } from 'react';
import { FaArrowRight, FaSortAmountDown, FaTh, FaList } from 'react-icons/fa';
import MachinesFilter from './MachinesFilter';
import FilteredMachineCards from './FilteredMachineCards';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicMachines } from '../../slices/GetAllmachinesByPage';
import FilteredMachineCardShimmer from './skeletons/FilteredMachineCardShimmer';

const FilteredMachines = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest');

    const dispatch = useDispatch();
    const { machines, totalMachines, totalPages, loading, searchParams } = useSelector((state) => state.machinesByPage);

    const [currentPage, setCurrentPage] = useState(1);
    const arr = 6;

    useEffect(() => {
        dispatch(fetchPublicMachines({ page: 1, sort: 'newest' }));
    }, [dispatch]);

    console.log('curr page', currentPage);
    console.log('total page', totalPages);


    const topRef = useRef(null);

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        else window.scrollTo({ top: 0, behavior: "smooth", });
    };

    useEffect(() => {
        try {
            scrollToTop();
        } catch (e) {
            // fallback for environments that don't support smooth behavior
            window.scrollTo({ top: 0, behavior: "smooth", });
        }
    }, [currentPage]);

    const handleSortChange = (value) => {
        setSortBy(value);

        let sortParam = 'newest';
        if (value === 'price-low') {
            sortParam = 'daily_rate_low_to_high';
        } else if (value === 'price-high') {
            sortParam = 'daily_rate_high_to_low';
        }

        const params = {
            ...searchParams,
            sort: sortParam
        };

        const newPage = 1;
        setCurrentPage(newPage);
        dispatch(fetchPublicMachines({ page: newPage, ...params }));
    };

    const handlePageChange = (pageNum) => {
        const params = {
            ...searchParams
        };
        setCurrentPage(pageNum);
        dispatch(fetchPublicMachines({ page: pageNum, ...params }));
    };

    const handleApplyFilters = ({ minRate, maxRate }) => {
        const params = {
            ...searchParams,
            min_rate: minRate,
            max_rate: maxRate
        };
        const newPage = 1;
        setCurrentPage(newPage);
        dispatch(fetchPublicMachines({ page: newPage, ...params }));
    };

    const handleResetFilters = () => {
        const params = {
            ...searchParams
        };
        delete params.min_rate;
        delete params.max_rate;
        const newPage = 1;
        setCurrentPage(newPage);
        dispatch(fetchPublicMachines({ page: newPage, ...params }));
    };

    return (
        <div id="filtered-machines-section" className='w-full bg-equipmentBg pb-16 pt-10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
                    <aside className='lg:w-72 shrink-0'>
                        <MachinesFilter
                            onApplyFilters={handleApplyFilters}
                            onResetFilters={handleResetFilters}
                        />
                    </aside>

                    {/* Main Content */}
                    <main ref={topRef} className='flex-1 min-w-0'>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100'>
                                <div className='flex items-baseline gap-3'>
                                    <h1 className='text-xl sm:text-2xl font-bold text-gray-900 leading-tight'>Available Machines</h1>
                                    <span className='text-xs font-semibold bg-primaryBtn/10 text-primaryBtn px-2.5 py-1 rounded-full border border-primaryBtn/20'>
                                        {totalMachines} results
                                    </span>
                                </div>

                                <div className='flex items-center gap-2'>
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
                                                onClick={() => handleSortChange('newest')}
                                                className={`w-full text-left cursor-pointer px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'newest' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Newest First
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('price-low')}
                                                className={`w-full text-left cursor-pointer px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'price-low' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Price: Low to High
                                            </button>
                                            <button
                                                onClick={() => handleSortChange('price-high')}
                                                className={`w-full text-left cursor-pointer px-3 py-2 text-xs hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${sortBy === 'price-high' ? 'text-primaryBtn font-bold bg-primaryBtn/10' : 'text-gray-700 font-medium'}`}
                                            >
                                                Price: High to Low
                                            </button>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm'>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid'
                                                ? 'bg-primaryBtn text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50 cursor-pointer'
                                                }`}
                                            aria-label="Grid view"
                                        >
                                            <FaTh className='text-xs' />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list'
                                                ? 'bg-primaryBtn text-white shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50 cursor-pointer'
                                                }`}
                                            aria-label="List view"
                                        >
                                            <FaList className='text-xs' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={`grid ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                                : 'grid-cols-1 gap-4'
                                }`}>
                                {loading ? (
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <FilteredMachineCardShimmer key={`shimmer-${i}`} />
                                    ))
                                ) : machines && machines.length > 0 ? (
                                    machines.map((machine) => (
                                        <FilteredMachineCards key={machine.id} machine={machine} />
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
                                        <div className="bg-gray-50 p-4 rounded-full mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">No Machines Found</h3>
                                        <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                            We couldn't find any machines matching your criteria. Try adjusting your filters or search terms.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <nav className='flex justify-center items-center gap-1.5 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-100' aria-label="Pagination">
                                <button
                                    className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={currentPage === 1}
                                    aria-label="Previous page"
                                    onClick={() => {
                                        const newPage = Math.max(1, currentPage - 1);
                                        handlePageChange(newPage);
                                    }}
                                >
                                    Previous
                                </button>

                                {totalPages <= 3 ? (
                                    Array.from({ length: totalPages }).map((_, idx) => {
                                        const pageNum = idx + 1;
                                        const isActive = pageNum === currentPage;
                                        return (
                                            <button
                                                key={`page-${pageNum}`}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                                aria-label={`Page ${pageNum}`}
                                                aria-current={isActive ? 'page' : undefined}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <>
                                        {[1, 2, 3].map((pageNum) => {
                                            const isActive = pageNum === currentPage;
                                            return (
                                                <button
                                                    key={`page-${pageNum}`}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                                    aria-label={`Page ${pageNum}`}
                                                    aria-current={isActive ? 'page' : undefined}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <span className='px-2 text-xs text-gray-400 font-medium' aria-hidden="true">...</span>

                                        <button
                                            key={`page-${totalPages}`}
                                            onClick={() => handlePageChange(totalPages)}
                                            className={`px-3 py-2 rounded-lg text-xs font-semibold ${totalPages === currentPage ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                            aria-label={`Page ${totalPages}`}
                                            aria-current={totalPages === currentPage ? 'page' : undefined}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}

                                <button
                                    className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 disabled:opacity-50 transition-all duration-200 font-semibold flex items-center gap-1.5 disabled:cursor-not-allowed cursor-pointer'
                                    aria-label="Next page"
                                    disabled={currentPage === totalPages}
                                    onClick={() => {
                                        const newPage = Math.min(totalPages, currentPage + 1);
                                        handlePageChange(newPage);
                                    }}
                                >
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

