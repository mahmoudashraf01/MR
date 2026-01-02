import { memo } from 'react';

const SkeletonCell = ({ className = "" }) => (
    <div className={`h-4 bg-gray-200 rounded ${className}`} />
);

const SkeletonBadge = () => (
    <div className="h-6 w-20 bg-gray-200 rounded-full" />
);

const SkeletonActions = () => (
    <div className="flex gap-3">
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="w-4 h-4 bg-gray-200 rounded" />
        <div className="w-4 h-4 bg-gray-200 rounded" />
    </div>
);

const SkeletonTable = ({ rows = 5 }) => {
    return (
        <>
            {
                Array.from({ length: rows }).map((_, index) => (
                    <tr
                        key={index}
                        className="border-t border-gray-300 animate-pulse"
                    >
                        {/* Title */}
                        <td className="px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-md" />
                            <SkeletonCell className="w-32" />
                        </td>

                        {/* Mobile Dynamic Cell */}
                        <td className="px-4 py-3 lg:hidden">
                            <SkeletonCell className="w-24" />
                        </td>

                        {/* Desktop Cells */}
                        <td className="hidden lg:table-cell px-4 py-3">
                            <SkeletonCell className="w-24" />
                        </td>

                        <td className="hidden lg:table-cell px-4 py-3">
                            <SkeletonCell className="w-20" />
                        </td>

                        <td className="hidden lg:table-cell px-4 py-3">
                            <SkeletonCell className="w-28" />
                        </td>

                        <td className="hidden lg:table-cell px-4 py-3">
                            <SkeletonBadge />
                        </td>

                        <td className="hidden lg:table-cell px-4 py-3">
                            <SkeletonActions />
                        </td>
                    </tr>
                ))
            }
        </>
    );
};

export default memo(SkeletonTable);