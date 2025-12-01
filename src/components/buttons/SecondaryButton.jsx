import { memo } from 'react';

const SecondaryButton = () => {
    return (
        <button className='bg-secondary w-[190px] h-10 px-4 py-2.5 rounded-lg text-[18px] font-medium text-gray-900 shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90'>
            Login
        </button>
    );
};

export default memo(SecondaryButton);