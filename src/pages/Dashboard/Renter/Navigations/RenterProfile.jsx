import { memo, useEffect } from 'react';
import profileImg from '../../../../assets/userIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../../../slices/Auth/Profile';
import { SkeletonField, SkeletonAvatar, SkeletonButton } from '../../Components/ui/Skeletons';


const RenterProfile = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const user = profile || {};
    console.log("Renter Profile Data:", user);

    if (loading || (!profile && !error)) {
        return (
            <div className='bg-white rounded-[40px] border border-[#B2B2B2]'>
                <div className="max-w-6xl mx-auto p-6">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Image Section */}
                        <div className="flex flex-col lg:pt-20 gap-5 items-center order-1 lg:order-2">
                            <div className='flex justify-center items-start'>
                                <h1 className='pr-10 text-[20px] font-semibold'>Company Logo</h1>
                            </div>
                            <div className='flex'>
                                <div className="mb-4">
                                    <SkeletonAvatar size={128} />
                                </div>
                            </div>

                            <SkeletonButton />
                        </div>

                        {/* Profile Information */}
                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <h2 className="text-xl font-semibold mb-6">
                                renter Profile
                            </h2>

                            <div className="space-y-4 w-full">
                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                    <SkeletonField />
                                    <SkeletonField />
                                </div>

                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                    <SkeletonField />
                                    <SkeletonField />
                                </div>

                                <div>
                                    <SkeletonField />
                                </div>

                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                    <SkeletonField />
                                    <SkeletonField />
                                </div>

                                <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                    <SkeletonField />
                                    <SkeletonField />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div className="mt-10 flex justify-center lg:justify-end">
                        <SkeletonButton />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='bg-white rounded-[40px] border border-[#B2B2B2] p-10 flex justify-center items-center'>
                <p className="text-red-500">Error loading profile: {typeof error === 'string' ? error : 'Unknown error'}</p>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-[40px]  border border-[#B2B2B2]'>
            <div className="max-w-6xl mx-auto p-6">
                {/* Top Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Section */}
                    <div className="flex flex-col items-center order-1 lg:order-2">
                        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                            <img
                                src={user?.renter?.image || profileImg}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button className="px-10 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-600 transition">
                            Update Image
                        </button>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <h2 className="text-xl font-semibold mb-6">
                            Profile information
                        </h2>

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.renter_name}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.email}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.phone}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.contact_person}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.city}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Region
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.region}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    House Number
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.house_number}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.postalcode}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col justify-center items-start gap-2 mt-5'>
                            <div className='w-full'>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    defaultValue={user?.renter?.address}
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
                                />
                            </div>

                            <button className="text-primaryBtn text-sm font-medium hover:underline">
                                + Add another address
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className=" mt-10 flex justify-center lg:justify-end">
                    <button className="lg:w-[20%] w-[80%] px-8 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-600 transition">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(RenterProfile);