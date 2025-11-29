import { memo } from 'react';
import HeroImg from '../../assets/hero1.jpg'
import Landing from '../../assets/landing.jpg'
import About from '../../assets/About.png'
import HeavyMachine2 from '../../assets/machine7.jpeg'
import PrimaryButton from '../buttons/PrimaryButton';

const AboutHero = () => {
    return (<div className="relative h-[500px] w-full flex flex-col items-center justify-center overflow-hidden">
        <img
            src={HeavyMachine2}
            alt="hero"
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A2540B2]/70"></div>
        <div className=' flex flex-col justify-center items-center relative'>
            <div className='text-center flex flex-col justify-center items-center relative text-primary text-[50px] font-bold drop-shadow-lg max-sm:text-2xl my-10 leading-relaxed'>
                <h1>
                    Building Trust Through Reliable
                </h1>
                <h1 className='text-secondary'> Machine Rentals.</h1>
            </div>
            <div className='w-full flex justify-center items-center '>
                <p className=' text-center text-primary text-base text-[20px] leading-relaxed'>We connect construction companies with the equipment they need — safely, quickly, and efficiently..</p>
            </div>
            <div className='flex lex gap-2.5 my-6'>
                <button className='bg-primaryBtn p-2.5 md:w-[260px] sm:w-40 md:h-[46px] sm:h-[20] rounded-md'>
                    Find Equipment
                </button>
                <button className='bg-secondary p-2.5 md:w-[260px] sm:w-40 md:h-[46px] sm:h-[20] rounded-md'>
                    List Your Machines
                </button>
            </div>
        </div>
    </div>
    );
};

export default memo(AboutHero);
