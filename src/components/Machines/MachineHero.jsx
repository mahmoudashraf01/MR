import { memo } from 'react';
import HeroImg from '../../assets/hero1.jpg'
import Landing from '../../assets/Landing.jpg'
import Contact from '../../assets/contact.jpeg'
import SearchMachine from './SearchMachine';

const MachineHero = () => {
    return (
        <div className="relative bg-gradient-to-br from-[#1F6FEB17] via-[#1F6FEB0D] to-[#1F6FEB17] min-h-[500px] w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #1F6FEB 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Soft Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primaryBtn/3 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/3 rounded-full blur-3xl" />

            <div className='flex flex-col justify-center items-center py-10 relative px-4 z-10 w-full'>
                {/* Hero Content */}
                <div className='text-center flex flex-col justify-center items-center relative w-full max-w-4xl mb-8'>
                    <div className='mb-5'>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold max-sm:text-2xl leading-tight tracking-tight'>
                            <span className='block text-primaryBtn mb-1'>
                                Find the Right Equipment{' '}
                                <span className='text-secondary'>for Your</span>
                            </span>
                            <span className='block text-secondary'>
                                Next Project
                            </span>
                        </h1>
                    </div>
                    
                    <div className='w-full max-w-2xl'>
                        <p className='text-center text-gray-600 text-sm sm:text-base leading-relaxed font-normal'>
                            Browse verified heavy machines from trusted suppliers across the nation.
                        </p>
                    </div>
                </div>
                
                {/* Search Container */}
                <div className='w-full px-4 z-10'>
                    <SearchMachine />
                </div>
            </div>
        </div>
    );
};

export default memo(MachineHero);
