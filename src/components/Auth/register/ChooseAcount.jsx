import { memo } from 'react';
import CompanyAccount from '../../../assets/companyAccount.svg'
import RenterAccount from '../../../assets/renterAccount.svg'
import { useNavigate } from 'react-router-dom';

const ChooseAcount = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full fadeIn animate-[fadeIn_0.5s_ease-out]">

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                Choose Your Account Type
            </h2>

            <p className="text-gray-500 text-center mt-2 mb-8 text-sm md:text-base">
                Select whether you want to register as a company or as a renter to continue.
            </p>

            {/* Options */}
            <div className="space-y-6">

                {/* Company Account */}
                <div
                    onClick={() => navigate("/auth/registerCompany")}
                    className="
              cursor-pointer border border-primaryBtn rounded-2xl p-5 flex items-center gap-4
              hover:bg-blue-50 transition group
            "
                >
                    {/* Icon */}
                    <div className="
              p-3 rounded-xl 
              bg-[#9333EA24] group-hover:bg-[#852fd524] transition
            ">
                        <img
                            src={CompanyAccount}
                            alt="company icon"
                            className="w-7 h-7"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-gray-800 font-semibold text-lg">
                            Company Account
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base">
                            Register your company to manage your equipment, rentals, and business operations.
                        </p>
                    </div>
                </div>

                {/* Renter Account */}
                <div
                    onClick={() => navigate("/auth/registerRenter")}
                    className="
              cursor-pointer border border-primaryBtn rounded-2xl p-5 flex items-center gap-4
              hover:bg-[#2563EB33] transition
            "
                >
                    {/* Icon */}
                    <div className="p-3 rounded-xl bg-[#2563EB33]">
                        <img
                            src={RenterAccount}
                            alt="renter icon"
                            className="w-7 h-7"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-gray-800 font-semibold text-lg">
                            Renter Account
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base">
                            Create your renter profile to browse, request, and manage machinery rentals easily.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default memo(ChooseAcount);