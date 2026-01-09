import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../../../slices/Auth/Profile';
import defaultProfile from '../../../../assets/contact.jpeg';
import VerifiedCompany from '../../../../assets/verifiedCompanyIcon.svg';
import { SkeletonField, SkeletonAvatar, SkeletonButton } from '../../Components/ui/Skeletons';

const CompanyProfile = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const company = profile?.company || {};
    const user = profile || {};

    if (loading) {
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
                                Company Profile
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
                            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 relative">
                                <img
                                    src={company.image || defaultProfile}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {company.verified === 1 && (
                                <img 
                                    src={VerifiedCompany}
                                    alt="Verified"
                                    className='w-8 h-8 ml-2'
                                />
                            )}
                        </div>

                        <button className="px-10 py-2 bg-primaryBtn text-white rounded-md hover:bg-primaryBtn transition">
                            Update Image
                        </button>
                    </div>

                    {/* Profile Information */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <h2 className="text-xl font-semibold mb-6">
                            Company Profile
                        </h2>

                        <div className="space-y-4 w-full">
                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.company_name || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Contact Person
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.contact_person || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                            </div>

                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.phone || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={user.email || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                            </div>

                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.address || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.city || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                            </div>

                            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Pstal Code
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.postalcode || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        House Number
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.house_number || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Region
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.region || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Tax ID
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={company.tax_id || ''}
                                        placeholder="****************"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-2 bg-white"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <div className=" mt-10 flex justify-center lg:justify-end">
                    <button className="lg:w-[20%] w-[80%] px-8 py-2 bg-primaryBtn text-white rounded-md hover:bg-primaryBtn transition">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(CompanyProfile);