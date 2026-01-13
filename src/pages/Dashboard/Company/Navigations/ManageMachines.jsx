import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBtn from '../../../../assets/search.svg';
import DropDownArrow from '../../../../assets/dropDownArrow.svg';
import ManageMachinesTable from './Components/ManageMachines/ManageMachinesTable';
import { NavLink } from 'react-router-dom';
import { fetchPrivateMachines } from '../../../../slices/Machines/GetPrivateMachines';



const ManageMachines = () => {
    const dispatch = useDispatch();
    const { machines, privateCategories } = useSelector((state) => state.privateMachines);

    const [filters, setFilters] = useState({
        search: '',
        category_id: '',
        status: '',
        location_city: '',
    });

    useEffect(() => {
        dispatch(fetchPrivateMachines({
            page: 1,
            search: filters.search || undefined,
            category_id: filters.category_id || undefined,
            status: filters.status || undefined,
            location_city: filters.location_city || undefined,
        }));
    }, [dispatch, filters.search, filters.category_id, filters.status, filters.location_city]);

    const cities = useMemo(() => {
        const set = new Set();
        machines?.forEach((m) => {
            if (m.location_city) {
                set.add(m.location_city);
            }
        });
        return Array.from(set);
    }, [machines]);


    const handleSearchChange = (e) => {
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            category_id: value === 'all' ? '' : value,
        }));
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            status: value === 'all' ? '' : value,
        }));
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        setFilters((prev) => ({
            ...prev,
            location_city: value === 'all' ? '' : value,
        }));
    };

    return (
        <div className="p-6 bg-white min-h-screen rounded-[40px]  border border-[#B2B2B2]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className='flex flex-col justify-center lg:items-start items-center'>
                    <h1 className="text-2xl font-semibold">Manage Machines</h1>
                    <p className="text-gray-500 text-sm">
                        View and manage your rental machines
                    </p>
                </div>
                <button className="px-5 py-2 bg-primaryBtn cursor-pointer hover:bg-primaryBtn/90 text-white rounded-md">
                    <NavLink to={'/companyDashboard/addMachines'}>
                        Add New Machine
                    </NavLink>
                </button>
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
                        value={filters.search}
                        onChange={handleSearchChange}
                        className="w-full bg-white focus:outline-primaryBtn border text-sm placeholder:text-[#9CA3AF] border-[#D2D2D2] rounded-md pl-10 py-2"
                    />
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                    <div className="relative">
                        <select
                            value={filters.category_id || 'all'}
                            onChange={handleCategoryChange}
                            className="appearance-none focus:outline-primaryBtn bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                        >
                            <option value="all">All Categories</option>
                            {privateCategories?.map((cat) => (
                                <option key={`cat-${cat.id}`} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={filters.status || 'all'}
                            onChange={handleStatusChange}
                            className="appearance-none focus:outline-primaryBtn bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                        >
                            <option value="all">All Status</option>
                            <option value="rented">Rented</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="available">Available</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select
                            value={filters.location_city || 'all'}
                            onChange={handleCityChange}
                            className="appearance-none focus:outline-primaryBtn bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                        >
                            <option value="all">All Cities</option>
                            {cities.map((city, index) => (
                                <option key={`city-${index}-${city}`} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                </div>
            </div>
            <ManageMachinesTable />
        </div >
    );
};

export default memo(ManageMachines);
