import { memo } from "react";
import { useForm } from "react-hook-form";
import DropDownIcon from "../../../../../assets/dropDownIcon.svg";

// ======== All Countries (195 Country) ========
const countries = [
    "Egypt", "Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar",
    "Bahrain", "Oman", "Jordan", "Lebanon", "Tunisia", "Algeria",
    "Morocco", "Libya", "Sudan", "Iraq", "Syria", "Turkey",
    "United States", "Canada", "Brazil", "Argentina", "Mexico",
    "United Kingdom", "France", "Germany", "Italy", "Spain", "Netherlands",
    "Belgium", "Sweden", "Norway", "Finland", "Switzerland", "India",
    "China", "Japan", "South Korea", "Indonesia", "Malaysia", "Australia",
    "New Zealand", "South Africa", "Nigeria", "Kenya",
];

const CompanyDataForm2 = ({ data, setData, nextStep, prevStep }) => {

    // Pre-filled values from parent
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            city: data.city || "",
            region: data.region || "",
            address: data.address || "",
            postalcode: data.postalcode || "",
            house_number: data.house_number || "",
            country: data.country || "",
        }
    });

    const onSubmit = (values) => {
        // Merge data from step2 with parent
        setData(prev => ({
            ...prev,
            ...values,
        }));

        nextStep(); // Move to Step 3
    };

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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* ------- Country Select ------- */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Country</h1>
                    <div className="relative">
                        <select
                            {...register("country", { required: "Country is required" })}
                            className="w-full appearance-none text-[#2E3A45CC] px-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                        >
                            <option value="" >Select Your Country</option>
                            {countries.map((c, index) => (
                                <option key={index} value={c}>{c}</option>
                            ))}
                        </select>

                        {/* Custom arrow (bigger + shifted left) */}
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xl">
                            <img src={DropDownIcon} alt="" />
                        </span>
                    </div>
                    {errors.country && <p className="text-red-500">{errors.country.message}</p>}
                </div>

                {/* City  */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>City</h1>
                    <input
                        {...register("city", { required: "City is required" })}
                        placeholder="Enter Your City"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                    {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                </div>

                {/* Region */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Region</h1>
                    <input
                        {...register("region", { required: "Region is required" })}
                        placeholder="Enter Your Region"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                    {errors.region && <p className="text-red-500">{errors.region.message}</p>}
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Street Address</h1>
                    <input
                        {...register("address", { required: "Address is required" })}
                        placeholder="Enter Your Street address"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                    {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                </div>

                {/* Postal code */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>Postal code</h1>
                    <input
                        {...register("postalcode", { required: "Postal code is required" })}
                        placeholder="Enter Your Postal code"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                    {errors.postalcode && <p className="text-red-500">{errors.postalcode.message}</p>}
                </div>

                {/* House Number */}
                <div className="flex flex-col gap-2 font-medium">
                    <h1>House Number</h1>
                    <input
                        {...register("house_number", { required: "House number is required" })}
                        placeholder="Enter Your House number"
                        className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
                    />
                    {errors.house_number && <p className="text-red-500">{errors.house_number.message}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-5">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="text-primaryBtn w-full underline bg-white py-3.5 rounded-xl hover:bg-[#bad6ff] font-semibold cursor-pointer"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition shadow-lg cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default memo(CompanyDataForm2);
