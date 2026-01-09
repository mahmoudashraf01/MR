import { memo } from 'react';
import SearchBtn from '../../../../assets/search.svg';
import DropDownArrow from '../../../../assets/dropdownArrow.svg';
import ManageMachinesTable from './Components/ManageMachines/ManageMachinesTable';



const ManageMachines = () => {
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

                <button className="px-5 py-2 bg-primaryBtn text-white rounded-md">
                    Add New Machine
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
                        className="w-full bg-white border text-sm placeholder:text-[#9CA3AF] border-[#D2D2D2] rounded-md pl-10 py-2"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>Category</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>Status</option>
                        </select>
                        <img
                            src={DropDownArrow}
                            alt="dropdown"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select className="appearance-none bg-white border text-sm text-[#9CA3AF] border-[#D2D2D2] rounded-md px-4 py-2 pr-8 w-full">
                            <option>City</option>
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
        </div>
    );
};

export default memo(ManageMachines);