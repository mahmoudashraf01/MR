import { memo } from 'react';
import RenterActiveBookingsIcon from '../../../../assets/renterActiveBookingsIcon.svg';
import CompletedRentalsIcon from '../../../../assets/completedRentalsIcon.svg';
import CanceledRentalsIcon from '../../../../assets/canceledRentalsIcon.svg';
import RenterPendingRequestsIcon from '../../../../assets/renterPendingRequestsIcon.svg';
import MonthlyRentalActivity from './components/Overview/MonthlyRentalActivity';
import BookingStatusBreackDown from './components/Overview/BookingStatusBreackDown';
import RenterCardInfo from './components/Overview/RenterCardInfo';

const RenterOverview = () => {
    return (
        <div className="flex flex-col gap-10 p-6 bg-white border border-[#B2B2B2] rounded-[40px]  min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Renter Dashboard</h1>
                <p className="text-sm text-gray-500">
                    Manage your bookings and profile — everything in one place.
                </p>
            </div>

            {/*Cards Review*/}
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>

                {/* ActiveBookings */}
                <RenterCardInfo
                    cardColor={'#EDEEFC'}
                    cardBorder={'#8A38F533'}
                    cardTitle={'Active Bookings'}
                    conentNumber={'1'}
                    contentIcon={RenterActiveBookingsIcon}
                />

                {/* Pending Reuests */}
                <RenterCardInfo
                    cardColor={'#F6C90E1A'}
                    cardBorder={'#F6C90E33'}
                    cardTitle={'Pending Requests'}
                    conentNumber={'1'}
                    contentIcon={RenterPendingRequestsIcon}
                />

                {/* Completed Rentals */}
                <RenterCardInfo
                    cardColor={'#22C55E1A'}
                    cardBorder={'#22C55E33'}
                    cardTitle={'Completed Rentals'}
                    conentNumber={'1'}
                    contentIcon={CompletedRentalsIcon}
                />

                {/* Canceled Rentals */}
                <RenterCardInfo
                    cardColor={'#EF53501A'}
                    cardBorder={'#EF535033'}
                    cardTitle={'Canceled Rentals'}
                    conentNumber={'1'}
                    contentIcon={CanceledRentalsIcon}
                />

            </div>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-5'>
                <MonthlyRentalActivity />
                <BookingStatusBreackDown />
            </div>

        </div>
    );
};

export default memo(RenterOverview);