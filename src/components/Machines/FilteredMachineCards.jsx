import { memo } from 'react';
import machineImg from '../../assets/machine_item.png'
import { BiMap } from 'react-icons/bi';
import { BsShieldCheck } from 'react-icons/bs';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const FilteredMachineCard = ({ machine }) => {

    // Destructure values coming from API
    const {
        title,
        images,
        daily_rate,
        category,
        location_city,
        rating,
        reviews_count,
        year,
        availability_status
    } = machine;

    // Image fallback
    const displayedImage =
        images?.length > 0 && images[0]
            ? images[0]
            : machineImg;

    return (
        <article className='group relative w-full overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100'>

            {/* Image Section */}
            <div className='w-full h-[260px] rounded-t-xl relative flex items-center justify-center overflow-hidden'>
                <img
                    src={displayedImage}
                    alt={title}
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className='absolute top-3 left-3 flex items-center justify-center h-7 rounded-full bg-secondary px-3 shadow-sm z-10'>
                    <span className='text-xs font-bold text-gray-900 leading-none'>
                        {category?.name || "Unknown"}
                    </span>
                </div>

                {/* Verified Badge */}
                {machine?.company.verified && (
                    <div className='absolute top-3 right-3 flex items-center justify-center gap-1 h-7 rounded-full bg-primaryBtn px-3 text-white shadow-sm z-10'>
                        <BsShieldCheck className='text-xs' />
                        <span className='text-xs font-semibold leading-none'>Verified</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className='p-5 flex flex-col gap-3.5 bg-white'>

                {/* Title & Location */}
                <header className='space-y-1.5'>
                    <h3 className='text-lg font-bold text-gray-900 group-hover:text-primaryBtn transition-colors duration-200 line-clamp-1 leading-tight'>
                        {title}
                    </h3>

                    <div className='flex items-center gap-1.5'>
                        <BiMap className='text-primaryBtn text-sm shrink-0' />
                        <span className='text-xs text-gray-600 font-medium'>
                            {location_city || "Unknown"}
                        </span>
                    </div>
                </header>

                {/* Rating */}
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-0.5'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`text-xs ${star <= Math.round(rating) ? 'text-secondary' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className='text-xs font-bold text-gray-800'>{rating || 0}</span>
                    <span className='text-xs text-gray-500'>({reviews_count || 0})</span>
                </div>

                {/* Features */}
                <div className='flex items-center gap-2 flex-wrap'>
                    {year && (
                        <div className='px-2.5 py-1 bg-gray-50 rounded-md border border-gray-100'>
                            <span className='text-xs text-gray-700 font-medium'>{year}</span>
                        </div>
                    )}
                    <div className={`px-2.5 py-1 rounded-md border ${availability_status ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
                        }`}>
                        <span className={`text-xs font-semibold ${availability_status ? "text-green-700" : "text-red-700"
                            }`}>
                            {availability_status ? "Available" : "Unavailable"}
                        </span>
                    </div>
                </div>

                {/* daily_rate + Button */}
                <footer className='pt-3 border-t border-gray-100'>
                    <div className='flex items-end justify-between gap-3'>
                        <div className='flex-1 min-w-0'>
                            <div className='flex xl:flex-col items-baseline gap-1'>
                                <h2 className='text-secondary font-bold text-2xl leading-none'>
                                    ${daily_rate || 0}
                                </h2>
                                <span className='text-xs text-gray-500 font-medium'>/day</span>
                            </div>
                            <p className='text-xs text-gray-500 mt-0.5'>Starting from</p>
                        </div>

                        <NavLink to={`/viewDetails/${machine.id}`} onClick={(e) => e.stopPropagation()}>
                            <button className='flex items-center gap-1.5 px-4 py-2 bg-primaryBtn cursor-pointer text-white rounded-lg font-semibold shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200 text-xs whitespace-nowrap group/btn'>
                                <span>View Details</span>
                                <FaArrowRight className='text-xs group-hover/btn:translate-x-0.5 transition-transform duration-200' />
                            </button>
                        </NavLink>
                    </div>
                </footer>

            </div>
        </article>
    );
};

export default memo(FilteredMachineCard);
