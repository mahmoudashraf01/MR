import { memo } from 'react';

const PrimaryButton = () => {
    return (
        <button className='bg-primaryBtn w-[140px] h-10 px-4 py-2.5 rounded-lg text-[18px] font-medium text-primary shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90'>
            Login
        </button>
    );
};

export default memo(PrimaryButton);