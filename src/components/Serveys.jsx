import { memo } from 'react';
import { TbQuote } from 'react-icons/tb';
import Img from '../assets/img.jpg'
import { LiaStarSolid } from 'react-icons/lia';
import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';
import Comma from '../assets/comma.svg';
const Serveys = () => {
    return (
        <div className='flex flex-col justify-center items-center my-12 py-8'>
            <div className='flex flex-col my-10 justify-center items-center gap-6 px-4 max-w-3xl'>
                <h2 className='text-[40px] text-gray-900 font-bold text-center leading-tight max-sm:text-3xl'>What Our Clients Say</h2>
                <p className='text-center text-gray-600 text-[20px] font-normal leading-relaxed max-sm:text-base'>Trusted by leading construction companies across the nation.</p>
            </div>
            <div className='lg:px-15 px-4 md:px-10 w-full max-w-5xl'>
                <div className='border-2 border-gray-200 flex flex-col rounded-2xl shadow-xl w-full bg-white hover:shadow-2xl transition-shadow duration-300'>
                    <div className='relative justify-center items-center'>
                        <div className='absolute max-sm:w-[50px] max-sm:h-[50px] w-[70px] h-[70px] rounded-full -top-10 max-sm:-top-[25px] left-8 md:left-12 bg-white shadow-lg flex items-center justify-center'>
                            <img src={Comma} alt="quote" className='w-10 h-10' />
                        </div>
                        <div className='max-sm:px-6 text-center py-12 px-12 md:px-16 gap-5 flex flex-col justify-center items-center'>
                            <p className='text-center text-[28px] max-sm:text-lg leading-relaxed text-gray-800 font-medium'>
                                "The variety of equipment available is impressive. We can find everything we need in one place, from excavators to cranes. Highly recommended for any construction business."
                            </p>
                        </div>
                        <hr className='mx-12 md:mx-20 mb-6 border-gray-200' />
                    </div>
                    <div className='flex pb-8 px-12 md:px-16 gap-4 items-center'>
                        <img className='w-14 h-14 rounded-full object-cover border-2 border-gray-200 shadow-sm' src={Img} alt="reviewer" />
                        <div className='flex flex-col gap-2'>
                            <p className='text-[18px] max-sm:text-sm font-semibold text-gray-900'>Verified Companies</p>
                            <div className='flex gap-0.5 text-secondary'>
                                <LiaStarSolid className='text-lg' />
                                <LiaStarSolid className='text-lg' />
                                <LiaStarSolid className='text-lg' />
                                <LiaStarSolid className='text-lg' />
                                <LiaStarSolid className='text-lg' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center py-10 gap-4'>
                    <button className='flex justify-center items-center w-10 h-10 max-sm:w-8 max-sm:h-8 border-2 border-primaryBtn rounded-full hover:bg-primaryBtn hover:text-primary transition-all duration-200 shadow-sm hover:shadow-md'>
                        <FaAngleLeft className='text-primaryBtn hover:text-primary text-sm' />
                    </button>
                    <div className='flex justify-center items-center gap-2'>
                        <div className='w-3 h-3 bg-primaryBtn rounded-full shadow-sm'></div>
                        <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                        <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                    </div>
                    <button className='flex justify-center items-center w-10 h-10 max-sm:w-8 max-sm:h-8 border-2 border-primaryBtn rounded-full hover:bg-primaryBtn hover:text-primary transition-all duration-200 shadow-sm hover:shadow-md'>
                        <FaAngleRight className='text-primaryBtn hover:text-primary text-sm' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(Serveys);