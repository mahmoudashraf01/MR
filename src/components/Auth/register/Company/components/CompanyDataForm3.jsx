import { memo } from "react";

const CompanyDataForm3 = ({ data, setData, prevStep, handleSubmit, loading }) => {
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

            <form className="space-y-5" onSubmit={handleSubmit}>

                {/* Company Name */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Company Name</h1>
                    <input
                        value={data.company_name}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, company_name: e.target.value }))
                        }
                        placeholder="Enter Your Company name"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                </div>

                {/* Contact Person */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Contact Person</h1>
                    <input
                        value={data.contact_person}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, contact_person: e.target.value }))
                        }
                        placeholder="Enter Your Contact person"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                </div>

                {/* Tax ID */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Tax ID</h1>
                    <input
                        value={data.tax_id}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, tax_id: e.target.value }))
                        }
                        placeholder="Enter Your Tax ID"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-5">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="text-primaryBtn w-full underline bg-white py-3.5 rounded-xl hover:bg-[#bad6ff] font-semibold"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-primaryBtn cursor-pointer text-white py-3.5 rounded-xl transition shadow-lg ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                            }`}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(CompanyDataForm3);
