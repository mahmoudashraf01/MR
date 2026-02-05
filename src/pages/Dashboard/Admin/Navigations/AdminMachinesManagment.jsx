

import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBtn from '../../../../assets/search.svg';
import DropDownArrow from '../../../../assets/dropDownArrow.svg';
import AdminMachineManagmentTable from '../Components/AdminMachineManagment/AdminMachineManagmentTable';
import { fetchPublicMachines } from '../../../../slices/GetAllmachinesByPage';

const AdminMachinesManagment = () => {
    const dispatch = useDispatch();
    const { machines, categories, loading } = useSelector((state) => state.machinesByPage);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [city, setCity] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        dispatch(fetchPublicMachines({ page: 1, sort: 'newest' }));
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const cities = useMemo(
        () =>
            Array.from(
                new Set(
                    machines
                        ?.map((m) => m.location_city)
                        .filter((c) => c && c.trim() !== "")
                )
            ),
        [machines]
    );

    const uniqueCategories = useMemo(
        () =>
            Array.from(
                new Map(
                    (categories || []).map((cat) => [cat.id, cat])
                ).values()
            ),
        [categories]
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedCities = localStorage.getItem("admin_machines_city_options");
        const savedCategories = localStorage.getItem("admin_machines_category_options");
        try {
            if (savedCities) {
                const parsed = JSON.parse(savedCities);
                if (Array.isArray(parsed)) setCityOptions(parsed);
            }
            if (savedCategories) {
                const parsedCat = JSON.parse(savedCategories);
                if (Array.isArray(parsedCat)) setCategoryOptions(parsedCat);
            }
        } catch {
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (city === "") {
            localStorage.setItem("admin_machines_city_options", JSON.stringify(cities));
            setCityOptions(cities);
        }
    }, [cities, city]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (categoryId === "") {
            localStorage.setItem("admin_machines_category_options", JSON.stringify(uniqueCategories));
            setCategoryOptions(uniqueCategories);
        }
    }, [uniqueCategories, categoryId]);

    useEffect(() => {
        const params = {
            page: 1,
            search: debouncedSearch || undefined,
            category_id: categoryId || undefined,
            location_city: city || undefined,
            availability_status: status || undefined,
            sort: 'newest',
        };
        dispatch(fetchPublicMachines(params));
    }, [dispatch, debouncedSearch, categoryId, city, status]);

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
            </div>

            {/* Filters */}
            <div className=" bg-[#D2D2D2]/5 rounded-2xl border border-[#D2D2D2] p-4 mb-6 space-y-4">
                <div className="relative">
                    <img
                        src={SearchBtn}
                        alt="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    />
                    <input
                        placeholder="Search ..."
                        className="w-full bg-white border text-sm placeholder:text-[#9CA3AF] border-[#D2D2D2] rounded-md pl-10 py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                    <div className="relative">
                        <select
                            className="appearance-none cursor-pointer bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {(categoryOptions.length > 0 ? categoryOptions : uniqueCategories).map((cat) => (
                                <option key={cat.id} value={cat.id}>
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
                            className="appearance-none cursor-pointer bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="available">Available</option>
                            <option value="rented">Rented</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none cursor-pointer bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">All Cities</option>
                            {(cityOptions.length > 0 ? cityOptions : cities).map((c) => (
                                <option key={c} value={c}>
                                    {c}
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
            <AdminMachineManagmentTable />
        </div>
    );
};

export default memo(AdminMachinesManagment);
