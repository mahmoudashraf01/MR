import { memo } from 'react';
import DropDownArrow from '../../../../assets/minusArrow.svg';

const labelBase = "block text-sm font-medium text-navColor mb-1";

const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";

const CompanySettings = () => {
    return (
        <div className='bg-white rounded-[40px]  border border-[#B2B2B2]'>
            <div className='grid lg:grid-cols-[3fr_1fr]'>
                <div className=" px-12 py-6">
                    {/* Header */}
                    <div className="mb-8 text-left max-sm:text-center">
                        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
                        <h2 className="text-lg font-medium text-gray-700">
                            Security Settings
                        </h2>
                    </div>

                    {/* Security Settings */}
                    <div className="space-y-5 mb-10">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 focus:outline-none"
                            />
                            <p className="text-xs text-green-600 mt-1">
                                Minimum 8 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Language Settings */}
                    <div className="mb-10">
                        <h3 className="text-lg font-medium mb-3">
                            Language Settings
                        </h3>

                        <div className="relative">
                            <label className={labelBase}>Language</label>
                            <select className={selectBase}>
                                <option>English</option>
                                <option>Arabic</option>
                                <option>Frensh</option>
                            </select>
                            <img
                                src={DropDownArrow}
                                alt="arrow"
                                className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex sm:justify-end gap-4">
                        <button className="w-full sm:w-57 px-10 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-500 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(CompanySettings);