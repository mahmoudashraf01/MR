import { memo } from 'react';
import MightLikeMachineCard from '../../../components/viewDetails/MightLikeMachineCard';

const MyBookings = () => {
    return (
        <div className='bg-white rounded-l-2xl h-[calc(100vh-96px)]  overflow-y-auto '>
            <div className='flex flex-col px-8 py-8 gap-5'>
                <h1 className='text-[36px]'>MyBookings</h1>
                <div className='grid gap-5 lg:grid-cols-3 grid-cols-1 '>
                    <MightLikeMachineCard />
                    <MightLikeMachineCard />
                    <MightLikeMachineCard />
                    <MightLikeMachineCard />
                    <MightLikeMachineCard />
                    <MightLikeMachineCard />
                </div>
            </div>
        </div>
    );
};

export default memo(MyBookings);