import { memo } from 'react';
import Machine from '../../../../assets/machine3.jpeg'
import DropDownArrow from '../../../../assets/minusArrow.svg';
import DropUpArrow from '../../../../assets/dropUpArrow.svg';


const inputBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none border-[#D2D2D2] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]";

const labelBase = "block text-sm font-medium text-navColor mb-1";

const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";

const AddMachines = () => {
    return (
        <div className="flex flex-col bg-white border border-[#D2D2D2] rounded-[40px] shadow gap-5">
            <div className="min-h-screen mx-auto p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-center lg:items-start items-center gap-3">
                    <h1 className="text-2xl font-semibold">Add New Machine</h1>
                    <p className="text-sm text-gray-500 text-center">
                        Fill in the details to add a new machine to your inventory
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Image Section */}
                    <div className="order-1 lg:order-2 flex flex-col items-center text-center">
                        <h3 className="font-medium mb-4">Machine Images</h3>

                        <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 mb-4">
                            <img
                                src={Machine}
                                alt="machine"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <button className="px-5 py-2 bg-primaryBtn text-white rounded-md">
                            Update Image
                        </button>
                    </div>

                    {/* Form Section */}
                    <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
                        {/* Basic Information */}
                        <div>
                            <h3 className="font-semibold mb-4">Basic Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className={labelBase}>Machine Title</label>
                                    <input
                                        className={inputBase}
                                        placeholder="Enter machine title"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Category */}
                                    <div className="relative">
                                        <label className={labelBase}>Category</label>
                                        <select className={selectBase}>
                                            <option>Select Category</option>
                                        </select>
                                        <img
                                            src={DropDownArrow}
                                            alt="arrow"
                                            className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                        />
                                    </div>

                                    {/* Subcategory */}
                                    <div className="relative">
                                        <label className={labelBase}>Subcategory</label>
                                        <select className={selectBase}>
                                            <option>Select Subcategory</option>
                                        </select>
                                        <img
                                            src={DropDownArrow}
                                            alt="arrow"
                                            className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Brand */}
                                    <div className="relative">
                                        <label className={labelBase}>Brand</label>
                                        <select className={selectBase}>
                                            <option>Select Brand</option>
                                        </select>
                                        <img
                                            src={DropDownArrow}
                                            alt="arrow"
                                            className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                        />
                                    </div>

                                    {/* Model */}
                                    <div>
                                        <label className={labelBase}>Model</label>
                                        <input className={inputBase} placeholder="Enter Model" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelBase}>Year of Manufacturing</label>
                                        <div className="relative">
                                            <input className={`${inputBase} pr-8`} type="number" placeholder="2025" />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={(e) => {
                                                        const container = e.target.closest('.relative');
                                                        const input = container.querySelector('input[type="number"]');
                                                        input.stepUp();
                                                        input.dispatchEvent(new Event('change', { bubbles: true }));
                                                    }}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={(e) => {
                                                        const container = e.target.closest('.relative');
                                                        const input = container.querySelector('input[type="number"]');
                                                        input.stepDown();
                                                        input.dispatchEvent(new Event('change', { bubbles: true }));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className={labelBase}>Availability Status</label>
                                        <select className={selectBase}>
                                            <option>Available</option>
                                        </select>
                                        <img
                                            src={DropDownArrow}
                                            alt="arrow"
                                            className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className={labelBase}>Location</label>
                                    <select className={selectBase}>
                                        <option>Select City</option>
                                    </select>
                                    <img
                                        src={DropDownArrow}
                                        alt="arrow"
                                        className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Stock */}
                        <div>
                            <h3 className="font-semibold mb-4">Pricing & Stock</h3>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className={labelBase}>Daily Rate ($)</label>
                                    <div className="relative">
                                        <input className={`${inputBase} pr-8`} type="number" placeholder="0.00" step="1" />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img
                                                src={DropUpArrow}
                                                alt="increase"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepUp();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                            <img
                                                src={DropDownArrow}
                                                alt="decrease"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepDown();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Weekly Rate ($)</label>
                                    <div className="relative">
                                        <input className={`${inputBase} pr-8`} type="number" placeholder="0.00" step="1" />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img
                                                src={DropUpArrow}
                                                alt="increase"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepUp();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                            <img
                                                src={DropDownArrow}
                                                alt="decrease"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepDown();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Monthly Rate ($)</label>
                                    <div className="relative">
                                        <input className={`${inputBase} pr-8`} type="number" placeholder="0.00" step="1" />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img
                                                src={DropUpArrow}
                                                alt="increase"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepUp();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                            <img
                                                src={DropDownArrow}
                                                alt="decrease"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepDown();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Stock Quantity</label>
                                    <div className="relative">
                                        <input className={`${inputBase} pr-8`} type="number" placeholder="1" />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img
                                                src={DropUpArrow}
                                                alt="increase"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepUp();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                            <img
                                                src={DropDownArrow}
                                                alt="decrease"
                                                className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                onClick={(e) => {
                                                    const container = e.target.closest('.relative');
                                                    const input = container.querySelector('input[type="number"]');
                                                    input.stepDown();
                                                    input.dispatchEvent(new Event('change', { bubbles: true }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div>
                {/* Specifications */}
                <div className='flex flex-col px-6 justify-center'>
                    <div className='flex flex-col items-start'>
                        <h3 className="font-semibold mb-4">Specifications (JSON)</h3>

                        <input
                            className={inputBase}
                            placeholder="Enter Specifications"
                        />

                        <button className="text-primaryBtn text-sm mt-2">
                            Add More
                        </button>
                    </div>
                    {/* Actions */}
                    <div className='lg:flex flex-col items-end'>
                        <div className="my-5 flex max-sm:flex-col justify-center gap-4">
                            <button className="w-57  max-sm:w-full py-2 bg-red-500 text-white rounded-md">
                                Cancel
                            </button>
                            <button className="w-57  max-sm:w-full py-2 bg-primaryBtn text-white rounded-md">
                                Save
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default memo(AddMachines);