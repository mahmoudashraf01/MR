import { memo } from 'react';
import profile from '../../../../assets/contact.jpeg';

const RenterProfile = () => {
    return (
        <div className='bg-white rounded-[40px]  border border-[#B2B2B2]'>
            <div className="max-w-6xl mx-auto p-6">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Section */}
                    <div className="flex flex-col items-center order-1 lg:order-2">
                        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                            <img
                                src={profile}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button className="px-10 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-600 transition">
                            Update Image
                        </button>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <h2 className="text-xl font-semibold mb-6">
                            Profile information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <button className="text-primaryBtn text-sm font-medium hover:underline">
                                + Add another address
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className=" mt-10 flex justify-center lg:justify-end">
                    <button className="lg:w-[20%] w-[80%] px-8 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-600 transition">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(RenterProfile);