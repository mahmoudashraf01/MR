import { memo, useEffect, useState } from 'react';
import profileImg from '../../../../assets/userIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../../../slices/Auth/Profile';
import { resetUpdateState } from '../../../../slices/Auth/UpdateProfile';
import { SkeletonField, SkeletonAvatar, SkeletonButton } from '../../Components/ui/Skeletons';
import AdminUpdateDialog from '../../Admin/Components/AdminProfile/AdminUpdateDialog';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../../../../components/ui/dialog';


const AdminProfile = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.profile);
    const { success: updateSuccess, error: updateError } = useSelector((state) => state.updateProfile || {});
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(getProfile());
        }
    }, [updateSuccess, dispatch]);

    const user = profile || {};
    console.log("Admin Profile Data:", user);

    const handleSuccessDialogClose = () => {
        dispatch(resetUpdateState());
    };

    const handleErrorDialogClose = () => {
        dispatch(resetUpdateState());
    };

    if (loading || (!profile && !error)) {
        return (
            <div className='bg-white rounded-[40px] border border-[#B2B2B2]'>
                <div className="max-w-6xl mx-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col lg:pt-20 gap-5 items-center order-1 lg:order-2">
                            <div className='flex justify-center items-start'>
                                <h1 className='pr-10 text-[20px] font-semibold'>Admin Logo</h1>
                            </div>
                            <div className='flex'>
                                <div className="mb-4">
                                    <SkeletonAvatar size={128} />
                                </div>
                            </div>

                            <SkeletonButton />
                        </div>

                        <div className="lg:col-span-2 order-2 lg:order-1">
                            <h2 className="text-xl font-semibold mb-6">
                                Admin Profile
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
                <p className="text-[#EF5350]">Error loading profile: {typeof error === 'string' ? error : 'Unknown error'}</p>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-[40px]  border border-[#B2B2B2]'>
            <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center order-1 lg:order-2">
                        <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                            <img
                                src={user?.admin?.image || profileImg}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Update Image Button Removed */}
                    </div>

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
                                    value={user?.first_name + ' ' + user?.last_name}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Admin Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.admin_name}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={user?.email}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.phone}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.contact_person}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Tax ID
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.tax_id}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.city}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Region
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.region}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    House Number
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.house_number}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    value={user?.admin?.postalcode}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
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
                                    value={user?.admin?.address}
                                    readOnly
                                    placeholder='****************'
                                    className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-gray-50"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" mt-10 flex justify-center lg:justify-end">
                    <button 
                        onClick={() => setIsUpdateDialogOpen(true)}
                        className="lg:w-[20%] w-[80%] px-8 py-2 bg-primaryBtn text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
                    >
                        Edit
                    </button>
                </div>
            </div>

            <AdminUpdateDialog 
                isOpen={isUpdateDialogOpen} 
                onClose={() => setIsUpdateDialogOpen(false)} 
                user={user}
            />

            <Dialog open={!!updateSuccess} onOpenChange={(open) => !open && handleSuccessDialogClose()}>
                <DialogContent className="sm:max-w-md flex flex-col items-center gap-4 bg-white" showCloseButton={false}>
                    <FaCheckCircle className="w-16 h-16 text-green-500" />
                    <DialogHeader>
                        <DialogTitle className="text-center text-lg font-medium leading-6 text-gray-900">
                            Success
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-center text-sm text-gray-500">
                        Profile updated successfully!
                    </div>
                    <DialogFooter className="sm:justify-center w-full">
                        <button
                            type="button"
                            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-primaryBtn hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 cursor-pointer"
                            onClick={handleSuccessDialogClose}
                        >
                            Done
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={!!updateError} onOpenChange={(open) => !open && handleErrorDialogClose()}>
                <DialogContent className="sm:max-w-md flex flex-col items-center gap-4 bg-white" showCloseButton={false}>
                    <FaExclamationCircle className="w-16 h-16 text-red-500" />
                    <DialogHeader>
                        <DialogTitle className="text-center text-lg font-medium leading-6 text-gray-900">
                            Error
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-center text-sm text-gray-500">
                        {typeof updateError === 'string' && updateError.trim() !== '' ? updateError : 'Failed to update profile.'}
                    </div>
                    <DialogFooter className="sm:justify-center w-full">
                        <button
                            type="button"
                            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-[#EF5350] hover:bg-[#EF5350]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 cursor-pointer"
                            onClick={handleErrorDialogClose}
                        >
                            Close
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default memo(AdminProfile);
