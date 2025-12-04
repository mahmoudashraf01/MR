import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMachinesThunk } from '../../slices/landingSlice';

import MachineCard from './MachineCard';
import { FaArrowRight } from 'react-icons/fa';

const Equipments = () => {

    const dispatch = useDispatch();
    const { machines, loading } = useSelector((state) => state.machines);
        const baseURL = import.meta.env.VITE_BASE_URL;


    useEffect(() => {
        dispatch(getAllMachinesThunk());
    }, []);

    return (
        <div className='flex flex-col justify-center items-center w-full bg-equipmentBg pb-16 pt-8'>
            <div className='flex flex-col gap-6 justify-center items-center my-16 mx-auto px-4 max-w-4xl'>
                <h1 className='leading-tight text-center text-[40px] font-bold max-sm:text-[30px] text-gray-900'>
                    Popular Heavy Equipment 
                </h1>
                <p className='leading-relaxed text-center text-[20px] text-gray-600 max-w-2xl'>
                    Verified listings from trusted suppliers. Find the perfect machine for your project.
                </p>
            </div>

            {/* loading state */}
            {loading && <p className="text-center">Loading...</p>}

            <div className='grid md:grid-cols-2 mx-auto max-xs:mx-6 lg:grid-cols-3 sm:grid-cols-1 gap-8 px-4 max-w-7xl w-full'>
                {machines.map((machine) => (
                    <MachineCard key={machine.id} machine={machine} />
                ))}
            </div>

            <div className='flex justify-center items-center my-12'>
                <button className='bg-primaryBtn flex justify-center items-center gap-2.5 w-[260px] h-[46px] rounded-lg text-primary font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90'>
                    View All Equipment
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default memo(Equipments);
