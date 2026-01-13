import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Search from '../../assets/search.svg'
import SearchBTN from '../../assets/searchBtn.svg'
import Location from '../../assets/location2.svg'
import { fetchCategories } from '../../slices/Categories/GetAllCategoriesByPage';
import { fetchPublicMachines } from '../../slices/GetAllmachinesByPage';

const SearchMachine = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoriesByPage);

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            search: "",
            category_id: "",
            location_city: "",
            sort: ""
        }
    });

    const watchedValues = watch();
    
    // Check if form is effectively empty (default values)
    const isFormEmpty = !watchedValues.search && 
                        watchedValues.category_id === "" &&
                        !watchedValues.location_city && 
                        watchedValues.sort === "";

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(fetchPublicMachines({
            search: data.search || undefined,
            category_id: (data.category_id && data.category_id !== "all") ? data.category_id : undefined,
            location_city: data.location_city || undefined,
            sort: data.sort || undefined,
            page: 1
        }));

        const filteredMachinesSection = document.getElementById('filtered-machines-section');
        if (filteredMachinesSection) {
            filteredMachinesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='w-full px-4 md:px-8'>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-4 md:p-5 border border-gray-100"
            >
                <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
                    {/* Keyword */}
                    <div className="w-full">
                        <div className="relative flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <img src={Search} alt="search" className="w-4 h-4 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search by keyword"
                                {...register("search")}
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                                aria-label="Search machines by keyword"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="w-full">
                        <div className="relative flex items-center text-gray-600 gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <select 
                                {...register("category_id")}
                                className="w-full outline-none text-sm bg-transparent cursor-pointer appearance-none"
                                aria-label="Select category"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="all">All Categories</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
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
                                {...register("location_city")}
                                className="w-full outline-none text-sm placeholder-gray-400 bg-transparent"
                                aria-label="Enter location"
                            />
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="w-full">
                        <div className="relative flex items-center text-gray-600 gap-2 border border-gray-200 rounded-lg px-3 py-2.5 hover:border-primaryBtn/50 transition-all duration-200 focus-within:border-primaryBtn focus-within:ring-2 focus-within:ring-primaryBtn/10 bg-white">
                            <select 
                                {...register("sort")}
                                className="w-full outline-none text-sm bg-transparent cursor-pointer appearance-none"
                                aria-label="Sort by"
                            >
                                <option value="" disabled>Sort Machines</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                            <svg className="absolute right-3 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center items-center">
                        <button 
                            type="submit"
                            disabled={isFormEmpty}
                            className={`flex justify-center items-center w-full text-white px-4 py-2.5 rounded-lg gap-1.5 transition-all duration-200 shadow-sm font-semibold text-sm
                                ${isFormEmpty 
                                    ? 'bg-blue-500 opacity-50 cursor-not-allowed' 
                                    : 'bg-primaryBtn hover:opacity-90 hover:shadow-md cursor-pointer'
                                }`}
                            aria-label="Search machines"
                        >
                            <img src={SearchBTN} alt="search" className="w-4 h-4" />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default memo(SearchMachine);
