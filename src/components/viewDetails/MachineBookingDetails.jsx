import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import MachineImg from '../../assets/machineImg.png'
import machine2 from '../../assets/machine3.jpeg'
import machine3 from '../../assets/machine4.jpeg'
import FilledStar from '../../assets/filledStar.svg'
import EmptyStar from '../../assets/emptyStar.svg'
import Verified from '../../assets/verifyVector.svg'
import Location from '../../assets/location2.svg'
import LeftArrow from '../../assets/leftArrow.svg'
import RightArrow from '../../assets/rightArrow.svg'
import { getMachineDetailsThunk } from '../../slices/ViewMachineDetailsSlice';
import MachineBookingDetailsSkeleton from '../viewDetails/skeletons/MachineBokkingDetailsLoading';
import BookingDialog from './BookingSamary';

const MachineBookingDetails = ({ id }) => {
    const { data: machine, loading, error } = useSelector((state) => state.machineBokkingDetails);
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            console.log("Dispatching getMachineDetailsThunk with ID:", id);
            dispatch(getMachineDetailsThunk(id));
        }
    }, [id]);
    console.log("MachineBookingDetails received ID:", id);
    console.log("Machine:", machine);

    // ================================
    // IMAGES LOGIC
    // ================================
    const imagesArray = machine?.images?.length > 0 ? machine.images : [MachineImg, machine2, machine3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();
    const { token } = useSelector((state) => state.saveToken || {});



    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === imagesArray.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? imagesArray.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [machine]);

    const selectImage = (index) => {
        setCurrentImageIndex(index);
    };

    if (loading) {
        <style>
            {`
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`}
        </style>
        return (<MachineBookingDetailsSkeleton />);
    }

    if (error) return 'Error loading machine';
    if (!machine) return 'No Machine Found';

    return (

        <div
            className="transition-all duration-500 ease-out opacity-0 translate-y-2"
            style={{ animation: "fadeIn 1.5s forwards" }}
        >
            <div className="w-full rounded-md shadow-xl bg-white p-6 md:p-8 border border-gray-100">

                <div className="flex flex-col md:flex-row gap-8">

                    {/* LEFT: IMAGES */}
                    <div className="w-full lg:w-6/8 md:w-[70%] flex flex-col gap-4">

                        {/* Large Image */}
                        <div className="w-full h-72 md:h-96 bg-gray-200 rounded-2xl overflow-hidden relative shadow-xl group">

                            <img
                                src={imagesArray[currentImageIndex]}
                                alt="machine"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Left Arrow */}
                            {imagesArray.length > 1 && (
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3.5 hover:bg-white hover:scale-110 transition-all duration-200 z-10"
                                >
                                    <img src={LeftArrow} alt="prev" className="w-5 h-5" />
                                </button>
                            )}

                            {/* Right Arrow */}
                            {imagesArray.length > 1 && (
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3.5 hover:bg-white hover:scale-110 transition-all duration-200 z-10"
                                >
                                    <img src={RightArrow} alt="next" className="w-5 h-5" />
                                </button>
                            )}

                            {/* Counter */}
                            {machine?.images?.length > 0 || imagesArray && (
                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                    {currentImageIndex + 1} / {imagesArray.length}
                                </div>
                            )}
                        </div>

                        {/* Small Images */}
                        <div className="grid grid-cols-4 gap-3">
                            {imagesArray.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectImage(index)}
                                    className={`h-20 bg-gray-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${index === currentImageIndex
                                        ? 'ring-2 ring-primaryBtn'
                                        : 'hover:ring-2 hover:ring-primaryBtn'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`thumb-${index}`}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE DETAILS */}
                    <div className="w-full md:w-1/2 flex flex-col gap-5">

                        {/* Title + Verified */}
                        <div className="flex gap-3 items-center">
                            <h1 className="text-2xl lg:text-[36px] font-bold text-gray-900">
                                {machine.title || 'No title for this machine'}
                            </h1>

                            {machine?.company?.verified && (
                                <img src={Verified} alt="verified" className="w-7 h-7" />
                            )}
                        </div>

                        {/* Brand + ID */}
                        <div className="text-sm text-gray-500 font-medium">
                            {machine?.brand} | ID: {machine?.id}
                        </div>

                        {/* Rating + Location */}
                        <div className="flex items-center gap-4 text-sm">

                            <div className="flex items-center gap-1.5">
                                <img src={FilledStar} className="w-5 h-5" />
                                <img src={FilledStar} className="w-5 h-5" />
                                <img src={FilledStar} className="w-5 h-5" />
                                <img src={FilledStar} className="w-5 h-5" />
                                <img src={EmptyStar} className="w-5 h-5" />
                                <span className="text-gray-700 font-medium ml-1">4.8 (24 reviews)</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-1.5">
                                <img src={Location} alt="loc" className="w-5 h-5" />
                                <span className="text-gray-600">
                                    {machine?.location_city}
                                </span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-3">
                            <span
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold ${machine?.availability_status === "available"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {machine?.availability_status}
                            </span>

                            {/* Example discount - static for now */}
                            <span className="bg-red-100 rounded-full text-red-600 px-4 py-1.5 text-xs font-semibold">
                                {Math.floor(Number(machine?.daily_rate) / Number(machine?.daily_rate + 50) * 100)}% OFF
                            </span>
                        </div>

                        {/* Price */}
                        <div className="py-2">
                            <div className="text-xl font-bold text-gray-900">
                                Price from ${machine?.daily_rate} / day
                            </div>
                            <div className="text-gray-400 line-through text-sm mt-1">
                                was ${Number(machine?.daily_rate) + 50}
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* Pricing Plans */}
                        <div className="grid xl:grid-cols-3 max-xs:grid-cols-1 grid-cols-2 gap-3 mt-2">
                            <div className="border-2 border-gray-200 hover:border-primaryBtn transition-colors cursor-pointer rounded-xl px-5 py-3 text-center flex-1 min-w-[100px]">
                                <div className="text-xs text-gray-600 mb-1">Daily Rate</div>
                                <div className="font-bold text-secondary text-lg">${machine?.daily_rate}</div>
                            </div>

                            <div className="border-2 border-gray-200 hover:border-primaryBtn transition-colors cursor-pointer rounded-xl px-5 py-3 text-center flex-1 min-w-[100px]">
                                <div className="text-xs text-gray-600 mb-1">Weekly Rate</div>
                                <div className="font-bold text-secondary text-lg">${machine?.weekly_rate}</div>
                            </div>

                            <div className="border-2 border-gray-200 hover:border-primaryBtn transition-colors cursor-pointer rounded-xl px-5 py-3 text-center flex-1 min-w-[100px]">
                                <div className="text-xs text-gray-600 mb-1">Monthly Rate</div>
                                <div className="font-bold text-secondary text-lg">${machine?.monthly_rate}</div>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            onClick={() => {
                                // if user is logged in (token exists) open booking dialog
                                if (token) {
                                    setOpenDialog(true);
                                } else {
                                    // otherwise redirect to login page
                                    navigate('/auth/login');
                                }
                            }}
                            className="bg-primaryBtn cursor-pointer text-white py-4 rounded-xl mt-4 w-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <span>Book Now</span>
                            <FaArrowRight className="text-sm" />
                        </button>
                        <BookingDialog
                            open={openDialog}
                            onOpenChange={setOpenDialog}
                            machine={machine}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(MachineBookingDetails);