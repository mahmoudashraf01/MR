import { memo } from 'react';
import MachineDetails from '../components/viewDetails/MachineDetails';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
    const { id } = useParams();

    console.log("Machine ID from params:", id);   
    return (
        <>
            <MachineDetails id={id} />
            <Footer />
        </>
    );
};

export default memo(ViewDetails);