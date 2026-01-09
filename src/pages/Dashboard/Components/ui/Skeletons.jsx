import React from "react";

/* Base Skeleton */
const Skeleton = ({ className = "" }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 ${className}`}
        />
    );
};

/* Input Skeleton */
export const SkeletonInput = () => (
    <Skeleton className="w-full h-[42px] rounded-xl" />
);

/* Label + Input Skeleton */
export const SkeletonField = () => (
    <div className="space-y-2">
        <Skeleton className="w-24 h-3 rounded" />
        <Skeleton className="w-full h-[42px] rounded-xl" />
    </div>
);

/* Avatar / Image Skeleton */
export const SkeletonAvatar = ({ size = 128 }) => (
    <Skeleton
        className="rounded-full"
        style={{ width: size, height: size }}
    />
);

/* Button Skeleton */
export const SkeletonButton = () => (
    <Skeleton className="w-32 h-10 rounded-md" />
);

export default Skeleton;
