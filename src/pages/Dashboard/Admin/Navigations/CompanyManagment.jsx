import { memo, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SearchBtn from '../../../../assets/search.svg';
import DropDownArrow from '../../../../assets/dropDownArrow.svg';
import CompanyManagmentTable from '../CompaniesManagments/CompanyManagmentTable';

const CompanyManagment = () => {
    const { users } = useSelector((state) => state.listUsers);

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState("");
    const [city, setCity] = useState("");
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const companies = useMemo(
        () => users?.map((user) => user.company).filter((company) => !!company) || [],
        [users]
    );

    const uniqueCities = useMemo(
        () =>
            Array.from(
                new Set(
                    companies
                        .map((company) => company.city)
                        .filter((c) => c && c.trim() !== "")
                )
            ),
        [companies]
    );

    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem("company_city_options");
        if (!saved) return;
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                setCityOptions(parsed);
            }
        } catch {
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (city !== "") return;
        localStorage.setItem("company_city_options", JSON.stringify(uniqueCities));
        setCityOptions(uniqueCities);
    }, [uniqueCities, city]);

    const filters = useMemo(() => ({
        role: "company",
        search: debouncedSearch || undefined,
        verified:
            status === ""
                ? undefined
                : status === "verified"
                ? 1
                : status === "nonVerified"
                ? 0
                : undefined,
        city: city || undefined,
    }), [debouncedSearch, status, city]);

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
                        className="w-full bg-white border text-sm placeholder:text-[#9CA3AF] border-[#D2D2D2] rounded-md pl-10 py-2 outline-none focus:border-primaryBtn"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex w-full flex-col sm:flex-row gap-4">
                    <div className="relative w-full md:w-55 ">
                        <select
                            className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full outline-none focus:border-primaryBtn"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="verified">Verified</option>
                            <option value="nonVerified">Non-Verified</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative w-full md:w-55">
                        <select
                            className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full outline-none focus:border-primaryBtn"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">All Cities</option>
                            {(cityOptions.length > 0 ? cityOptions : uniqueCities).map((c) => (
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

            {/* Companies Table */}
            <CompanyManagmentTable filters={filters} />
        </div>
    );
};

export default memo(CompanyManagment);
