import { memo } from "react";
import UserIcon from '../../../../../assets/userIcon.svg';
import EmailIcon from '../../../../../assets/emailIcon.svg';
import phoneIcon from '../../../../../assets/phoneIcon.svg';
import LockIcon from '../../../../../assets/lockIcon.svg';
import { useNavigate } from "react-router-dom";

const CompanyDataForm2 = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Add Your Address Details
                </h2>
                <p className="text-gray-600">
                    We need your location information to complete your profile.
                </p>
            </div>

            <form className="space-y-5">
                {/* Full Name */}
                <div className=" flex flex-col gap-2 font-medium">
                    <h1>City</h1>
                    <select
                        className='w-full text-gray-400 px-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    >
                        <option value="">Seclect Your City</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Region</h1>
                    <input
                        placeholder="Enter Your Region"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Street Address</h1>
                    <input
                        placeholder="Enter Your Street address"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    <h1>House Number</h1>
                    <input
                        placeholder="Enter Your House number"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Postal code</h1>
                    <input
                        placeholder="Enter Your Postal code"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-5">
                    <button
                        type="button"
                        onClick={() => navigate('/companyForm1')}
                        className="text-primaryBtn w-full underline hover:underline-offset-0 bg-white py-3.5 rounded-xl hover:bg-[#bad6ff] font-semibold"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition shadow-lg"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(CompanyDataForm2);
