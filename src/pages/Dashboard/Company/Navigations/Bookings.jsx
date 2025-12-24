import { memo } from 'react';
import PendingBookingCard from "./Components/PendingBookingCard";
import ActiveBookingCard from "./Components/ActiveBookingCard";
import CompletedBookingCard from "./Components/CompletedBookingCard";

const Bookings = () => {
    return (
        <div className="p-6 bg-white border border-[#B2B2B2] rounded-[40px]  min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Bookings</h1>
                <p className="text-sm text-gray-500">
                    Manage all rental bookings and requests
                </p>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Column */}
                <div className="space-y-4">
                    <PendingBookingCard />
                    <PendingBookingCard />
                    <PendingBookingCard />
                </div>

                {/* Active Column */}
                <div className="space-y-4">
                    <ActiveBookingCard />
                    <ActiveBookingCard />
                    <ActiveBookingCard />
                    <ActiveBookingCard />
                </div>

                {/* Completed Column */}
                <div className="space-y-4">
                    <CompletedBookingCard />
                    <CompletedBookingCard />
                </div>
            </div>
        </div>
    );
};

export default memo(Bookings);