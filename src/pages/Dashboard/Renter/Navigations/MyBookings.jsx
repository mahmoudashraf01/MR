import { memo } from 'react';
import MyBookingsMachines from './components/MyBookingsMachines';

const MyBookings = () => {
    return (
        <div className='bg-white rounded-[40px]  border border-[#B2B2B2] '>
            <div className='flex flex-col justify-center items-center px-8'>
                <div className='py-8 gap-10 flex flex-col w-full'>
                    <h1 className='text-[36px] lg:text-start text-center'>MyBookings</h1>
                    <div className='grid gap-5 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 '>
                        <MyBookingsMachines />
                        <MyBookingsMachines />
                        <MyBookingsMachines />
                        <MyBookingsMachines />
                        <MyBookingsMachines />
                        <MyBookingsMachines />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(MyBookings);