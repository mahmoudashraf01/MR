import { memo } from 'react';

const RenterSettings = () => {
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
                                className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Language Settings */}
                    <div className="mb-10">
                        <h3 className="text-lg font-medium mb-3">
                            Language Settings
                        </h3>

                        <label className="block text-sm text-gray-600 mb-1">
                            Language
                        </label>

                        <select className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>English</option>
                            <option>Arabic</option>
                            <option>French</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
                        <button className="w-full sm:w-auto px-6 py-2 bg-[#EF5350] text-white rounded-md hover:bg-red-400 transition">
                            Delete Your Account
                        </button>

                        <button className="w-full sm:w-auto px-10 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-500 transition">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(RenterSettings);