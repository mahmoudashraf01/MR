import { memo } from 'react';
import machineImg from '../../assets/machine_item.png'
import { AiOutlineVerified } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';

const MachineCard = () => {
    return (
        <div className='relative w-full max-w-sm mx-auto overflow-hidden h-[475px] bg-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100'>
            <div className='w-full h-[305px] rounded-t-2xl relative flex items-center justify-center overflow-hidden' >
                <img
                    src={machineImg}
                    alt="hero"
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/20"></div>

            </div>
            <div className='absolute top-4 left-4 flex items-center justify-center min-w-[116px] h-8 rounded-full bg-secondary px-3 py-1.5 shadow-md'>
                <span className='text-sm font-semibold text-gray-900'>Excavator</span>
            </div>

            <div className='absolute top-4 right-4 flex items-center justify-center gap-1.5 min-w-[116px] h-8 rounded-full bg-primaryBtn px-3 py-1.5 text-primary shadow-md'>
                <BsShieldCheck className='text-sm' />
                <span className='text-sm font-medium'>Verified</span>
            </div>
            <div className='mx-5 my-5 pb-4 border-b border-gray-200'>
                <p className='text-[20px] font-semibold text-gray-900 mb-1'>CAT 320D Excavator</p>
                <div className='flex items-center gap-2 pt-2'>
                    <BiMap className='text-primaryBtn text-lg' />
                    <p className='text-gray-600 text-sm'>Chicago, IL</p>
                </div>
            </div>
            <div className='flex justify-between items-center mx-5 mb-5'>
                <div>
                    <h1 className='text-secondary font-bold text-2xl'>$820</h1>
                    <p className='text-gray-500 text-xs mt-0.5'>per day</p>
                </div>
                <button className='w-32 h-9 border-2 border-primaryBtn rounded-lg font-medium text-primaryBtn hover:bg-primaryBtn hover:text-primary transition-all duration-200 shadow-sm'>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default memo(MachineCard);