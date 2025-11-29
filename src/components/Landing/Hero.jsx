import { memo } from 'react';
 
import SearchContainer from './SearchContainer';
 import HeavyMachine2 from '../../assets/machine6.jpeg'

const Hero = () => {
    return (
        <div className="relative h-[800px] w-full flex items-center justify-center overflow-hidden">
            <img
                src={HeavyMachine2}
                alt="hero"
                className="absolute top-0 left-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-[#0A25408C]/90"></div>
            <div className=' flex flex-col justify-center items-center relative gap-4'>
                <div className='text-center leading-relaxed flex flex-col justify-center items-center relative text-primary text-[50px] max-md:text-[30px]  font-bold drop-shadow-lg max-sm:text-2xl my-10'>
                    <h1>
                        Rent Heavy Equipment, <span className='text-secondary'>Anytime,</span>
                    </h1>
                    <h1 className='text-secondary'> Anywhere.</h1>
                </div>
                <div className='w-full flex justify-center items-center '>
                    <p className=' text-center text-primary text-base sm:text-lg  md:text-[20px]'>The most trusted platform for reliable, safe, and efficient machine rentals.</p>
                </div>
                <SearchContainer />
                <div className='flex gap-2.5'>
                    <div className='flex justify-between items-center gap-2.5 p-2'>
                        <div className=' w-2.5 h-2.5 bg-secondary rounded-full'></div>
                        <p className='text-primary md:text-xl max-sm:text-[12px] '>1000+ Verified Machines</p>
                    </div>
                    <div className='flex justify-between items-center gap-2.5 p-2 '>
                        <div className=' w-2.5 h-2.5 bg-secondary rounded-full'></div>
                        <p className='text-primary md:text-xl max-sm:text-[12px]'>500+ Trusted Suppliers</p>
                    </div>
                    <div className='flex justify-between items-center gap-2.5 p-2'>
                        <div className=' w-2.5 h-2.5 bg-secondary rounded-full'></div>
                        <p className='text-primary md:text-xl max-sm:text-[12px]'>24/7 Support</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Hero);
