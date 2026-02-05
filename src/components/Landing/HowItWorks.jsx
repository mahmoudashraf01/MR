import { memo } from 'react';
import { FaSearch, FaPaperPlane, FaBars } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <div className="w-full py-20 px-6 flex flex-col items-center text-center bg-white">
            {/* Title */}
            <div className="mb-12 max-w-2xl">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
                    Get started in three easy steps. Simple, fast, and reliable.
                </p>
            </div>

            {/* Steps */}
            <div className="relative mt-8 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
                <div className='max-md:hidden max-sm:hidden absolute w-full border-b-2 border-gray-200 py-4 top-14 left-0'></div>
                {/* Step 1 */}
                <div className="flex flex-col items-center w-full">
                    <div className="relative">
                        <div className="w-28 h-28 bg-primaryBtn rounded-full flex items-center justify-center text-primary text-4xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <FaSearch />
                        </div>
                        {/* Number badge */}
                        <span className="absolute -top-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg text-lg">
                            1
                        </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-3">Search for Machines</h3>
                    <p className="text-gray-600 max-w-xs leading-relaxed text-base">
                        Browse our extensive catalog of verified heavy equipment. Filter by type, location, and availability.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center w-full">
                    <div className="relative">
                        <div className="w-28 h-28 bg-primaryBtn rounded-full flex items-center justify-center text-primary text-4xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <FaPaperPlane />
                        </div>
                        <span className="absolute -top-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg text-lg">
                            2
                        </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-3">Send Booking Request</h3>
                    <p className="text-gray-600 max-w-xs leading-relaxed text-base">
                        Select your dates and submit a booking request. Get instant confirmation from verified suppliers.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center w-full">
                    <div className="relative">
                        <div className="w-28 h-28 bg-primaryBtn rounded-full flex items-center justify-center text-primary text-4xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <FaBars />
                        </div>
                        <span className="absolute -top-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-gray-900 shadow-lg text-lg">
                            3
                        </span>
                    </div>

                    <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-3">Start Your Project</h3>
                    <p className="text-gray-600 max-w-xs leading-relaxed text-base">
                        Receive your equipment on time and start your project with confidence. We're here to support you.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 flex flex-col items-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Ready to get started?</h3>

                <div className="flex flex-col sm:flex-row gap-4">
                    <NavLink to={"/machines"} className="bg-primaryBtn text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90 cursor-pointer">
                        Browse Equipment
                    </NavLink>
                    <NavLink to={'/about'} className="border-2 border-primaryBtn text-primaryBtn px-8 py-3 rounded-lg font-medium hover:bg-primaryBtn/5 transition-all duration-200 shadow-sm cursor-pointer">
                        Learn More
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default memo(HowItWorks);