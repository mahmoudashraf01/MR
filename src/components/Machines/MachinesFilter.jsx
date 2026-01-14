import React, { memo } from 'react';
import { FaFilter, FaDollarSign, FaTruck, FaHandPaper, FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Pickup from '../../assets/pikcup.svg';
import Delivery from '../../assets/delivery.svg';
import { useForm } from "react-hook-form";

const MachinesFilter = ({ onApplyFilters, onResetFilters }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { isValid, isDirty }
    } = useForm({
        defaultValues: {
            price: 0,
            delivery: "pickup",
            availableOnly: false
        },
        mode: "onChange"
    });

    const price = watch("price");
    const delivery = watch("delivery");
    const availableOnly = watch("availableOnly");

    const isApplyDisabled = !isDirty || !isValid;

    const onSubmit = (data) => {
        const minRate = Number(data.price) || 0;
        const maxRate = 500;

        if (onApplyFilters) {
            onApplyFilters({
                minRate,
                maxRate
            });
        }
    };

    const handleReset = () => {
        reset({
            price: 0,
            delivery: "pickup",
            availableOnly: false
        });

        if (onResetFilters) {
            onResetFilters();
        }
    };

    return (
        <aside className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100 sticky top-4 hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <header className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primaryBtn/10 rounded-xl shadow-sm">
                            <FaFilter className="text-primaryBtn text-sm" />
                        </div>
                        <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Filters</h2>
                    </div>
                    <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 group cursor-pointer"
                        aria-label="Close filters"
                        onClick={handleReset}
                    >
                        <IoMdClose className="text-gray-400 group-hover:text-gray-600 text-lg transition-colors" />
                    </button>
                </header>

                <section className="space-y-4">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-primaryBtn/10 rounded-lg">
                            <FaDollarSign className="text-primaryBtn text-sm" />
                        </div>
                        <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">Price Range</h3>
                    </div>
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="500"
                            className="w-full accent-primaryBtn h-2 cursor-pointer rounded-full"
                            aria-label="Price range slider"
                            {...register("price", {
                                required: true,
                                min: 0,
                                max: 500
                            })}
                        />
                        <div className="flex justify-between items-center mt-3">
                            <span className="text-xs text-gray-600 font-semibold">$0</span>
                            <div className="px-3 py-1.5 bg-primaryBtn/10 rounded-lg border-2 border-primaryBtn/20 shadow-sm">
                                <span className="text-sm font-extrabold text-primaryBtn">
                                    ${Number(price || 0).toLocaleString()}
                                </span>
                            </div>
                            <span className="text-xs text-gray-600 font-semibold">$500</span>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 border-t-2 border-gray-100 pt-6">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-primaryBtn/10 rounded-lg">
                            <FaTruck className="text-primaryBtn text-sm" />
                        </div>
                        <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">Delivery Option</h3>
                    </div>

                    <div className="space-y-2">
                        <label className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                            delivery === "pickup"
                                ? "border-primaryBtn bg-primaryBtn/5 shadow-sm"
                                : "border-gray-200 hover:border-primaryBtn/40 hover:bg-gray-50"
                        }`}>
                            <div className="flex items-center gap-2.5">
                                <div className={`p-1.5 rounded-md ${delivery === "pickup" ? "bg-primaryBtn/10" : "bg-gray-100"}`}>
                                    <img src={Pickup} alt="pickup" className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-900 font-semibold block leading-tight">Pick up</span>
                                    <span className="text-xs text-gray-500 leading-tight">Self pickup</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-800 font-bold">Free</span>
                                <input
                                    type="radio"
                                    value="pickup"
                                    className="accent-primaryBtn w-3.5 h-3.5 cursor-pointer"
                                    {...register("delivery")}
                                />
                            </div>
                        </label>

                        <label className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                            delivery === "delivery"
                                ? "border-primaryBtn bg-primaryBtn/5 shadow-sm"
                                : "border-gray-200 hover:border-primaryBtn/40 hover:bg-gray-50"
                        }`}>
                            <div className="flex items-center gap-2.5">
                                <div className={`p-1.5 rounded-md ${delivery === "delivery" ? "bg-primaryBtn/10" : "bg-gray-100"}`}>
                                    <img src={Delivery} alt="delivery" className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="text-xs text-gray-900 font-semibold block leading-tight">Delivery</span>
                                    <span className="text-xs text-gray-500 leading-tight">We deliver</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-800 font-bold">Paid</span>
                                <input
                                    type="radio"
                                    value="delivery"
                                    className="accent-primaryBtn w-3.5 h-3.5 cursor-pointer"
                                    {...register("delivery")}
                                />
                            </div>
                        </label>
                    </div>
                </section>

                <section className="space-y-4 border-t-2 border-gray-100 pt-6">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-primaryBtn/10 rounded-lg">
                            <FaCheckCircle className="text-primaryBtn text-sm" />
                        </div>
                        <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">Availability</h3>
                    </div>

                    <label className={`flex items-center justify-between cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                        availableOnly
                            ? "border-primaryBtn bg-primaryBtn/5"
                            : "border-gray-200 hover:border-primaryBtn/40 hover:bg-gray-50"
                    }`}>
                        <span className="text-xs text-gray-900 font-semibold">Show available only</span>
                        <input
                            type="checkbox"
                            className="accent-primaryBtn w-4 h-4 cursor-pointer"
                            {...register("availableOnly")}
                        />
                    </label>
                </section>

                <footer className="flex items-center gap-3 pt-5 border-t-2 border-gray-100">
                    <button
                        type="submit"
                        disabled={isApplyDisabled}
                        className={`flex-1 bg-primaryBtn text-white py-3 rounded-xl transition-all duration-300 shadow-md text-sm font-extrabold hover:scale-105 active:scale-95 ${
                            isApplyDisabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 hover:shadow-lg cursor-pointer"
                        }`}
                    >
                        Apply Filters
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm font-bold hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        Reset
                    </button>
                </footer>
            </form>
        </aside>
    );
};

export default memo(MachinesFilter);
