import { memo, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import MightLikeMachineCard from './MightLikeMachineCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicMachines } from '../../slices/GetAllmachinesByPage';
import FilteredMachineCardShimmer from '../Machines/skeletons/FilteredMachineCardShimmer';
import { NavLink } from 'react-router-dom';


const MightLikeMachines = ({ id }) => {
    const dispatch = useDispatch();
    const { machines, totalMachines, totalPages, loading, companies } = useSelector((state) => state.machinesByPage);
    const { data: machine } = useSelector((state) => state.machineBokkingDetails);
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const arr = 6;
    const companyId = machine?.company?.id;

    useEffect(() => {
        if (!companyId) return;
        dispatch(fetchPublicMachines({
            page: currentPage,
            company_id: companyId,
        }));
    }, [dispatch, currentPage, companyId]);

    console.log('curr page', currentPage);
    console.log('total page', totalPages);
    console.log('companyId', companyId);


    const topRef = useRef(null);

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        else window.scrollTo({ top: 0, behavior: "smooth", });
    };

    // Smooth-scroll to top when the page changes so user sees new results
    useEffect(() => {
        try {
            scrollToTop();
        } catch (e) {
            // fallback for environments that don't support smooth behavior
            window.scrollTo({ top: 0, behavior: "smooth", });
        }
    }, [currentPage]);

    return (
        <div className='flex flex-col gap-6 py-5 w-full'>
            <div className='flex max-sm:flex-col max-md:flex-col max-sm:gap-3 max-md:gap-3 justify-between'>
                <div className='flex lg:justify-start lg:items-start justify-center items-center flex-col gap-7'>
                    <h1 className='leading-relaxed text-[40px] font-semibold text-center max-xs:text-[30px]'>You Might Also Like</h1>
                    <p className='text-gray-500 text-center'>Similar machines that might interest you</p>
                </div>
                <div className='flex justify-center items-center my-12'>
                    <NavLink to={'/machines'} className='bg-primaryBtn flex justify-center items-center gap-2.5 w-[260px] h-[46px] rounded-lg text-primary font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90'>
                        View All Equipment
                        <FaArrowRight />
                    </NavLink>
                </div>
            </div>
            {/* Machine Cards Grid */}
            <div className={`grid ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'grid-cols-1 gap-4'
                }`}>
                {loading ? (
                    // show a few shimmers while loading
                    Array.from({ length: 6 }).map((_, i) => (
                        <FilteredMachineCardShimmer key={`shimmer-${i}`} />
                    ))
                ) : machines && machines.length > 0 ? (
                    machines.map((machine) => (
                        <MightLikeMachineCard key={machine.id} machine={machine} />
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

            {/* Pagination */}
            <nav className='flex justify-center items-center gap-1.5 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-100' aria-label="Pagination">
                <button
                    className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                    Previous
                </button>

                {/* Page number buttons */}
                {totalPages <= 3 ? (
                    // show all pages when totalPages is 3 or less
                    Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        const isActive = pageNum === currentPage;
                        return (
                            <button
                                key={`page-${pageNum}`}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                aria-label={`Page ${pageNum}`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {pageNum}
                            </button>
                        );
                    })
                ) : (
                    // design: 1 2 3 ... last
                    <>
                        {[1, 2, 3].map((pageNum) => {
                            const isActive = pageNum === currentPage;
                            return (
                                <button
                                    key={`page-${pageNum}`}
                                    onClick={() => setCurrentPage(pageNum)}
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
                            onClick={() => setCurrentPage(totalPages)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold ${totalPages === currentPage ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                            aria-label={`Page ${totalPages}`}
                            aria-current={totalPages === currentPage ? 'page' : undefined}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 disabled:opacity-50 transition-all duration-200 font-semibold flex items-center gap-1.5'
                    aria-label="Next page"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                    Next
                    <FaArrowRight className='text-xs' />
                </button>
            </nav>

        </div>
    );
};

export default memo(MightLikeMachines);



