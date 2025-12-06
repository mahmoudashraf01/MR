import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyDataForm3 = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full animate-[fadeIn_0.5s_ease-out]">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Company Information
                </h2>
                <p className="text-gray-600">
                    Tell us more about your company to finalize your account.
                </p>
            </div>

            <form className="space-y-5">

                <div className="flex flex-col gap-2 font-medium">
                    <h1>Company Name</h1>
                    <input
                        placeholder="Enter Your Company name"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Contact Person</h1>
                    <input
                        placeholder="Enter Your Contact person"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Tax ID</h1>
                    <input
                        placeholder="Enter Your Tax ID"
                        className='w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-5">
                    <button
                        type="button"
                        onClick={() => navigate('/companyForm2')}
                        className="text-primaryBtn w-full underline hover:underline-offset-0 bg-white py-3.5 rounded-xl hover:bg-[#bad6ff] font-semibold"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition shadow-lg"
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(CompanyDataForm3);