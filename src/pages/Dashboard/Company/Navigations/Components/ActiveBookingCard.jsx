import { memo } from 'react';
import ActiveClock from '../../../../../assets/ActiveClock.svg';


const ActiveBookingCard = () => {
    return (
        <div className="bg-[#3A86FF33] border border-[#3A86FF] rounded-lg p-4 space-y-3">
            <div className="flex lg:flex-col-reverse xl:flex-row gap-2 justify-between items-start xl:items-start lg:items-center border-b border-primaryBtn pb-2">
                <div className='w-full xl:text-start lg:text-center'>
                    <h3 className="font-semibold text-sm">CAT 320 Excavator</h3>
                    <p className="text-xs text-gray-500">John Construction Co.</p>
                    <p className="text-xs text-gray-400">john@construction.com</p>
                </div>

                <span className="px-5 py-1 flex xl:w-fit lg:w-full justify-center items-center text-xs rounded-full bg-[#3A86FF40] text-primaryBtn">
                    <img src={ActiveClock} alt="Pending" className="inline-block mr-1" />
                    Active
                </span>
            </div>

            <div className="grid grid-cols-2 text-xs">
                <div>
                    <p className="text-gray-400">Start Date</p>
                    <p className="font-medium">2024-02-15</p>
                </div>
                <div>
                    <p className="text-gray-400">End Date</p>
                    <p className="font-medium">2024-02-22</p>
                </div>
            </div>

            <div className="text-xs">
                <p className="text-gray-400">Notes</p>
                <p>Need for foundation excavation project</p>
            </div>

            <div className="flex justify-between items-center">
                <p className="font-semibold">$1,050</p>
            </div>
        </div>
    );
};

export default memo(ActiveBookingCard);