import { memo } from 'react';

const FilteredMachineCardShimmer = () => {
    return (
        <article className="w-full overflow-hidden bg-white rounded-xl shadow-md border border-gray-100 animate-pulse">

            {/* Image Skeleton */}
            <div className="w-full h-[260px] bg-gray-200" />

            {/* Content */}
            <div className="p-5 flex flex-col gap-4">

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        {/* Stars skeleton */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-3 w-3 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="h-3 w-6 bg-gray-200 rounded"></div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-6 w-14 bg-gray-200 rounded"></div>
                    <div className="h-6 w-14 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>

                {/* Price + Button */}
                <footer className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">

                        <div className="space-y-2">
                            <div className="h-5 w-20 bg-gray-200 rounded"></div>
                            <div className="h-3 w-10 bg-gray-200 rounded"></div>
                        </div>

                        <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                    </div>
                </footer>

            </div>
        </article>
    );
};

export default memo(FilteredMachineCardShimmer);