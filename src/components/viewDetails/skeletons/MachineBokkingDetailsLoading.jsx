import { memo } from 'react';

const MachineBokkingDetailsSkeletonLoader = () => {
    return (
        <div className="w-full rounded-2xl shadow-xl bg-white p-6 md:p-8 border border-gray-100 animate-pulse">

            <div className="flex flex-col md:flex-row gap-8">

                {/* LEFT: IMAGES */}
                <div className="w-full lg:w-6/8 md:w-[70%] flex flex-col gap-4">

                    {/* Big Image Skeleton */}
                    <div className="w-full h-72 md:h-96 bg-gray-300 rounded-2xl"></div>

                    {/* Thumbs Skeleton */}
                    <div className="grid grid-cols-4 gap-3">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-20 bg-gray-300 rounded-xl"></div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 flex flex-col gap-5">

                    <div className="h-10 w-3/4 bg-gray-300 rounded-lg"></div>

                    <div className="h-4 w-1/2 bg-gray-300 rounded-lg"></div>

                    <div className="flex items-center gap-4">
                        <div className="h-5 w-32 bg-gray-300 rounded-lg"></div>
                        <div className="h-5 w-20 bg-gray-300 rounded-lg"></div>
                    </div>

                    <div className="h-6 w-24 bg-gray-300 rounded-full"></div>

                    <div className="h-8 w-40 bg-gray-300 rounded-lg"></div>

                    <div className="flex gap-3">
                        <div className="h-16 w-24 bg-gray-300 rounded-xl"></div>
                        <div className="h-16 w-24 bg-gray-300 rounded-xl"></div>
                        <div className="h-16 w-24 bg-gray-300 rounded-xl"></div>
                    </div>

                    <div className="h-12 w-full bg-gray-300 rounded-xl"></div>
                </div>

            </div>
        </div>
    );
};

export default memo(MachineBokkingDetailsSkeletonLoader);