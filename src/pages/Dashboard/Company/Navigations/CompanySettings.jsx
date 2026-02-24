import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { changePassword, resetChangePasswordState } from '../../../../slices/Auth/ChangePassword';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import DropDownArrow from '../../../../assets/minusArrow.svg';
const labelBase = "block text-sm font-medium text-navColor mb-1";

const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";

const CompanySettings = () => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.changePassword);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isValid, isDirty },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    // Reset state on unmount
    useEffect(() => {
        return () => {
            dispatch(resetChangePasswordState());
        };
    }, [dispatch]);

    // Handle toast notifications based on state
    useEffect(() => {
        if (loading) {
            toast("Changing password...", {
                icon: <Spinner className="w-4 h-4" />,
            });
        }
        if (success) {
            setIsSuccessOpen(true);
            reset(); // Clear inputs
            dispatch(resetChangePasswordState());
        }
        if (error) {
            setIsErrorOpen(true);
            dispatch(resetChangePasswordState());
        }
    }, [loading, success, error, dispatch, reset]);

    const onSubmit = (data) => {
        dispatch(changePassword(data));
    };

    return (
        <div className='bg-white rounded-[40px]  border border-[#B2B2B2]'>
            <div className='grid lg:grid-cols-[3fr_1fr]'>
                <div className=" px-12 py-6">
                    {/* Header */}
                    <div className="mb-8 text-left max-sm:text-center">
                        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
                        <h2 className="text-lg font-medium text-gray-700">
                            Security Settings
                        </h2>
                    </div>

                    {/* Security Settings Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-10">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className={`w-full border ${errors.current_password ? 'border-red-500' : 'border-[#D2D2D2]'} rounded-md px-4 py-2 focus:outline-none`}
                                {...register("current_password", {
                                    required: "Current password is required",
                                })}
                            />
                            {errors.current_password && (
                                <p className="text-xs text-red-500 mt-1">{errors.current_password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className={`w-full border ${errors.password ? 'border-red-500' : 'border-[#D2D2D2]'} rounded-md px-4 py-2 focus:outline-none`}
                                {...register("password", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                            )}
                            {!errors.password && (
                                <p className="text-xs text-green-600 mt-1">
                                    Minimum 8 characters
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                placeholder="****************"
                                className={`w-full border ${errors.password_confirmation ? 'border-red-500' : 'border-[#D2D2D2]'} rounded-md px-4 py-2 focus:outline-none`}
                                {...register("password_confirmation", {
                                    required: "Please confirm your new password",
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Your passwords do no match";
                                        }
                                    },
                                })}
                            />
                            {errors.password_confirmation && (
                                <p className="text-xs text-red-500 mt-1">{errors.password_confirmation.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-5'>
                            <h2 className="text-lg font-medium text-gray-700">
                                Language Settings
                            </h2>
                            <div className='flex flex-col gap-2'>
                                <h2 className='font-medium text-gray-700'>Language</h2>
                                <div className="relative w-full">
                                    <select 
                                        className={selectBase}
                                        value={i18n.language}
                                        onChange={(e) => {
                                            const newLang = e.target.value;
                                            i18n.changeLanguage(newLang);
                                            localStorage.setItem("i18nextLng", newLang);
                                        }}
                                    >
                                        <option value="en">English</option>
                                        <option value="fr">Frensh</option>
                                    </select>
                                    <img
                                        src={DropDownArrow}
                                        alt="arrow"
                                        className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons inside form to handle submit */}
                        <div className="flex sm:justify-end gap-4 pt-5">
                            <button
                                type="submit"
                                disabled={!isDirty || !isValid || loading}
                                className={`w-full sm:w-57 px-10 py-2 text-white rounded-md transition duration-200
                                    ${(!isDirty || !isValid || loading)
                                        ? 'bg-blue-300 cursor-not-allowed opacity-70'
                                        : 'bg-primaryBtn hover:bg-blue-500 cursor-pointer'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner className="w-4 h-4 text-white" />
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success Dialog */}
            <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl">Success</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <span className="text-4xl">✅</span>
                        </div>
                        <p className="text-center text-gray-600">
                            Password changed successfully
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <button
                            type="button"
                            onClick={() => setIsSuccessOpen(false)}
                            className="bg-primaryBtn md:w-50 text-white px-8 py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Okay
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Error Dialog */}
            <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl text-red-600">Error</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="rounded-full bg-red-100 p-3">
                            <span className="text-4xl">❌</span>
                        </div>
                        <p className="text-center text-gray-600">
                            {typeof error === 'string' ? error : "Failed to change password"}
                        </p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <button
                            type="button"
                            onClick={() => setIsErrorOpen(false)}
                            className="bg-[#EF5350] md:w-50 cursor-pointer text-white px-8 py-2 rounded-md hover:opacity-90 transition-opacity"
                        >
                            Close
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default memo(CompanySettings);