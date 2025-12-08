import { memo } from "react";
import DropDownIcon from "../../../../../assets/dropDownIcon.svg";


const RenterForm2 = ({ data, setData, prevStep, handleSubmit, loading }) => {
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

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Country */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Country</h1>
          <div className="relative">
            <select
              value={data.country}
              onChange={(e) =>
                setData((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full appearance-none text-[#2E3A45CC] px-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
            >
              <option value="">Select Your Country</option>
              {countries.map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </select>
            {/* Custom arrow (bigger + shifted left) */}
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xl">
              <img src={DropDownIcon} alt="" />
            </span>
          </div>
        </div>

        {/* City */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>City</h1>
          <input
            value={data.city}
            onChange={(e) =>
              setData((prev) => ({ ...prev, city: e.target.value }))
            }
            placeholder="Enter Your City"
            className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
          />
        </div>

        {/* Region */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Region</h1>
          <input
            value={data.region}
            onChange={(e) =>
              setData((prev) => ({ ...prev, region: e.target.value }))
            }
            placeholder="Enter Your Region"
            className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
          />
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Street Address</h1>
          <input
            value={data.address}
            onChange={(e) =>
              setData((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Enter Your Street address"
            className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
          />
        </div>

        {/* Postal Code */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>Postal code</h1>
          <input
            value={data.postalcode}
            onChange={(e) =>
              setData((prev) => ({ ...prev, postalcode: e.target.value }))
            }
            placeholder="Enter Your Postal code"
            className="w-full pl-4 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn"
          />
        </div>

        {/* House Number */}
        <div className="flex flex-col gap-2 font-medium">
          <h1>House Number</h1>
          <input
            value={data.house_number}
            onChange={(e) =>
              setData((prev) => ({ ...prev, house_number: e.target.value }))
            }
            placeholder="Enter Your House number"
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
            className={`w-full bg-primaryBtn text-white py-3.5 rounded-xl transition shadow-lg ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
              }`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(RenterForm2);
