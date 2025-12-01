import { memo } from 'react';
import Contact from '../../assets/contact.jpeg'

const HeroContact = () => {
    return (<div className="relative h-[550px] w-full flex flex-col items-center justify-center overflow-hidden">
        <img
            src={Contact}
            alt="contact"
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A2540B2]/90"></div>
        <div className=' flex flex-col justify-center items-center relative'>
            <div className='text-center flex flex-col justify-center items-center relative text-primary text-[50px] font-bold drop-shadow-lg max-sm:text-2xl my-10 leading-relaxed'>
                <h1>
                    Need Help? <span className='text-secondary'> We're Here for You.</span>
                </h1>
            </div>
            <div className='w-full flex justify-center items-center '>
                <p className=' text-center text-primary text-base text-[20px] leading-relaxed'>Our support team assists you with rentals, machine listings, delivery options, and account help.</p>
            </div>
        </div>
    </div>
    );
};

export default memo(HeroContact);
