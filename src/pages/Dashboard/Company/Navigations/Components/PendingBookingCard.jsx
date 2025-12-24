import { memo } from 'react';
import PendingClock from '../../../../../assets/PendingClock.svg';
import RejectIcon from '../../../../../assets/rejectIcon.svg';

const PendingBookingCard = () => {
    return (
        <div className="bg-[#F5AE2933] border border-secondary rounded-lg p-4 space-y-3">
            {/* Header */}
            <div className="flex lg:flex-col-reverse xl:flex-row gap-2 justify-between items-start xl:items-start lg:items-center border-b border-b-secondary pb-2">
                <div className='w-full xl:text-start lg:text-center'>
                    <h3 className=" font-semibold text-sm">CAT 320 Excavator</h3>
                    <p className="text-xs text-gray-500">John Construction Co.</p>
                    <p className="text-xs text-gray-400">john@construction.com</p>
                </div>

                <span className="flex xl:w-fit lg:w-full justify-center items-center text-xs rounded-full bg-[#F6C90E40] text-secondary px-5 py-1">
                    <img src={PendingClock} alt="Pending" className="inline-block mr-1" />
                    Pending
                </span>
            </div>

            {/* Dates */}
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

            {/* Notes */}
            <div className="text-xs">
                <p className="text-gray-400">Notes</p>
                <p>Need for foundation excavation project</p>
            </div>

            {/* Footer */}
            <div className="flex xl:flex-row lg:flex-col border-t border-secondary pt-3 justify-between items-center xl:items-center gap-3">
                <p className="font-semibold lg:text-start">$1,050</p>

                <div className="flex justify-center gap-2">
                    <button className="px-4 py-1 text-xs bg-green-500 text-white rounded-md">
                        Approve
                    </button>
                    <button className="flex justify-center items-center gap-2 px-4 py-1 text-xs border border-[#EF5350] text-[#EF5350] rounded-md ">
                        <img src={RejectIcon} alt="" />
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(PendingBookingCard);