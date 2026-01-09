import { memo } from 'react';
import { useSelector } from 'react-redux';
import MachineImg from '../../assets/machineImg.png'


const MachineMoreImages = () => {
    const { data: machine } = useSelector((state) => state.machineBokkingDetails);

    if (!machine?.images || machine.images.length === 0) return null;

    return (
        <div className='grid w-full  grid-cols-3 max-sm:grid-cols-1 gap-4'>
            {machine.images.map((img, index) => (
                <img key={index} src={img} alt="" className='h-[336px] w-full object-cover' />
            ))}
        </div>
    );
};

export default memo(MachineMoreImages);