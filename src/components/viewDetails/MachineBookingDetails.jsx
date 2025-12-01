import { memo } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import MachineImg from '../../assets/machineImg.png'
import FilledStar from '../../assets/filledStar.svg'
import EmptyStar from '../../assets/emptyStar.svg'
import Verified from '../../assets/verifyVector.svg'
import Location from '../../assets/location2.svg'
import LeftArrow from '../../assets/leftArrow.svg'
import RightArrow from '../../assets/rightArrow.svg'

const MachineBookingDetails = () => {
    return (
        <div className="w-full rounded-2xl shadow-xl bg-white p-6 md:p-8 border border-gray-100">

            <div className="flex flex-col md:flex-row gap-8">
                {/* LEFT: IMAGES */}
                <div className="w-full lg:w-6/8 md:w-[70%] flex flex-col gap-4">
                    {/* Large Image */}
                    <div className="w-full h-72 md:h-96 bg-gray-200 rounded-2xl overflow-hidden relative shadow-xl group">
                        <img src={MachineImg} alt="main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                        {/* Left Arrow */}
                        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3.5 hover:bg-white hover:scale-110 transition-all duration-200 z-10">
                            <img src={LeftArrow} alt="prev" className="w-5 h-5" />
                        </button>

                        {/* Right Arrow */}
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3.5 hover:bg-white hover:scale-110 transition-all duration-200 z-10">
                            <img src={RightArrow} alt="next" className="w-5 h-5" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                            1 / 8
                        </div>
                    </div>

                    {/* Small Images */}
                    <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-20 bg-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
                                i === 1 ? 'ring-2 ring-primaryBtn' : 'hover:ring-2 hover:ring-primaryBtn'
                            }`}>
                                <img src={MachineImg} alt={`thumbnail ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: DETAILS */}
                <div className="w-full md:w-1/2 flex flex-col gap-5">
                    <div className='flex gap-3 items-center'>
                        <h1 className="text-2xl lg:text-[36px] font-bold text-gray-900">CAT 320D Excavator</h1>
                        <img src={Verified} alt="verified" className="w-7 h-7" />
                    </div>

                    <div className="text-sm text-gray-500 font-medium">Excavator | ID: 1</div>

                    {/* Rating + Location */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                            <img src={FilledStar} alt="star" className="w-5 h-5" />
                            <img src={FilledStar} alt="star" className="w-5 h-5" />
                            <img src={FilledStar} alt="star" className="w-5 h-5" />
                            <img src={FilledStar} alt="star" className="w-5 h-5" />
                            <img src={EmptyStar} alt="star" className="w-5 h-5" />
                            <span className="text-gray-700 font-medium ml-1">4.8 (24 reviews)</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <img src={Location} alt="loc" className="w-5 h-5" />
                            <span className="text-gray-600">Chicago, IL</span>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3">
                        <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-semibold">
                            Available
                        </span>
                        <span className="bg-red-100 rounded-full text-red-600 px-4 py-1.5 text-xs font-semibold">-20%</span>
                    </div>

                    {/* Price */}
                    <div className="py-2">
                        <div className="text-xl font-bold text-gray-900">Price from $100 / day</div>
                        <div className="text-gray-400 line-through text-sm mt-1">was $120</div>
                    </div>

                    <hr className='border-gray-200' />
                    {/* Pricing Plans */}
                    <div className="flex flex-wrap gap-3 mt-2">
                        <div className="border-2 border-gray-200 rounded-xl px-5 py-3 text-center hover:border-primaryBtn transition-colors cursor-pointer flex-1 min-w-[100px]">
                            <div className="text-xs text-gray-600 mb-1">Daily Rate</div>
                            <div className="font-bold text-secondary text-lg">$350</div>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl px-5 py-3 text-center hover:border-primaryBtn transition-colors cursor-pointer flex-1 min-w-[100px]">
                            <div className="text-xs text-gray-600 mb-1">Weekly Rate</div>
                            <div className="font-bold text-secondary text-lg">$350</div>
                        </div>
                        <div className="border-2 border-gray-200 rounded-xl px-5 py-3 text-center hover:border-primaryBtn transition-colors cursor-pointer flex-1 min-w-[100px]">
                            <div className="text-xs text-gray-600 mb-1">Monthly Rate</div>
                            <div className="font-bold text-secondary text-lg">$350</div>
                        </div>
                    </div>

                    {/* Button */}
                    <button className="bg-primaryBtn text-white py-4 rounded-xl mt-4 w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                        <span>Book Now</span>
                        <FaArrowRight className="text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(MachineBookingDetails);