import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import EquipmentCategory from '../../assets/category_search.svg';
import EquipmentName from '../../assets/equipmentSearch.svg';
import SearchDataIcon from '../../assets/searchDataIcon.svg';
import SearchLocationIcon from '../../assets/searchLocationIcon.svg';
import { FaSearch } from "react-icons/fa";
import { getAllMachinesThunk } from "../../slices/landingSlice";
import { fetchCategories } from "../../slices/Categories/GetAllCategoriesByPage";

const SearchContainer = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoriesByPage);
    
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            search: "",
            category_id: "",
            location_city: "",
            from_date: "",
            to_date: ""
        }
    });

    const watchedValues = watch();
    // Check if all fields are empty
    const isFormEmpty = !watchedValues.search && 
                        watchedValues.category_id === "" &&
                        !watchedValues.location_city && 
                        !watchedValues.from_date && 
                        !watchedValues.to_date;

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(getAllMachinesThunk({
            search: data.search || undefined,
            category_id: (data.category_id && data.category_id !== "all") ? data.category_id : undefined,
            location_city: data.location_city || undefined,
            from_date: data.from_date || undefined,
            to_date: data.to_date || undefined
        }));

        const equipmentSection = document.getElementById('equipments-section');
        if (equipmentSection) {
            equipmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full md:px-10">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="w-full bg-white shadow-xl rounded-2xl p-6 md:p-8 flex flex-col gap-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
                {/* Desktop & Large Screens */}
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 items-end">
                    {/* Equipment Name */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <img src={EquipmentName} alt="" /> Equipment Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter Equipment Name"
                                {...register("search")}
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
                                {...register("category_id")}
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm appearance-none cursor-pointer hover:border-gray-300 bg-white"
                                aria-label="Category"
                            >
                                <option value="" disabled>Select Category</option>
                                <option value="all">All Categories</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <img src={SearchLocationIcon} alt="" /> Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter city or zip code"
                                {...register("location_city")}
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm placeholder-gray-400 hover:border-gray-300"
                                aria-label="Location"
                            />
                        </div>
                    </div>

                    {/* Date From */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <img src={SearchDataIcon} alt="" /> Date From
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                {...register("from_date")}
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm hover:border-gray-300 cursor-pointer"
                                aria-label="Start date"
                            />
                        </div>
                    </div>

                    {/* Date To */}
                    <div className="flex flex-col gap-2 w-full group">
                        <label className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                            <img src={SearchDataIcon} alt="" /> Date To
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                {...register("to_date")}
                                className="border-2 border-gray-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-4 focus:ring-primaryBtn/10 focus:border-primaryBtn transition-all duration-200 text-sm hover:border-gray-300 cursor-pointer"
                                aria-label="End date"
                            />
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={isFormEmpty}
                        className={`px-8 py-3.5 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md font-semibold
                            ${isFormEmpty 
                                ? 'bg-blue-500 text-white opacity-50 cursor-not-allowed' 
                                : 'bg-primaryBtn text-white hover:opacity-90 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
                            }`}
                        aria-label="Search for equipment"
                    >
                        <FaSearch className="text-base" />
                        <span>Search</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(SearchContainer);
