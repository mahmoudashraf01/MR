import { memo } from 'react';
import React, { useState } from "react";
import { FaFilter, FaDollarSign, FaTruck, FaHandPaper, FaCheckCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Pickup from '../../assets/pikcup.svg';
import Delivery from '../../assets/delivery.svg';

const MachinesFilter = () => {
    const [price, setPrice] = useState(5000);
    const [delivery, setDelivery] = useState("pickup");
    const [availableOnly, setAvailableOnly] = useState(false);

    return (
        <aside className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100 sticky top-4 hover:shadow-xl transition-all duration-300">
            {/* Title */}
            <header className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primaryBtn/10 rounded-xl shadow-sm">
                        <FaFilter className="text-primaryBtn text-sm" />
                    </div>
                    <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Filters</h2>
                </div>
                <button 
                    className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 group"
                    aria-label="Close filters"
                >
                    <IoMdClose className="text-gray-400 group-hover:text-gray-600 text-lg transition-colors" />
                </button>
            </header>

            {/* Price Range */}
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
                        max="10000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full accent-primaryBtn h-2 cursor-pointer rounded-full"
                        aria-label="Price range slider"
                    />
                    <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-600 font-semibold">$0</span>
                        <div className="px-3 py-1.5 bg-primaryBtn/10 rounded-lg border-2 border-primaryBtn/20 shadow-sm">
                            <span className="text-sm font-extrabold text-primaryBtn">${price.toLocaleString()}</span>
                        </div>
                        <span className="text-xs text-gray-600 font-semibold">$10K</span>
                    </div>
                </div>
            </section>

            {/* Delivery Option */}
            <section className="space-y-4 border-t-2 border-gray-100 pt-6">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-primaryBtn/10 rounded-lg">
                        <FaTruck className="text-primaryBtn text-sm" />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">Delivery Option</h3>
                </div>

                <div className="space-y-2">
                    {/* Pick up */}
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
                                name="delivery"
                                value="pickup"
                                checked={delivery === "pickup"}
                                onChange={() => setDelivery("pickup")}
                                className="accent-primaryBtn w-3.5 h-3.5 cursor-pointer"
                            />
                        </div>
                    </label>

                    {/* Delivery */}
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
                                name="delivery"
                                value="delivery"
                                checked={delivery === "delivery"}
                                onChange={() => setDelivery("delivery")}
                                className="accent-primaryBtn w-3.5 h-3.5 cursor-pointer"
                            />
                        </div>
                    </label>
                </div>
            </section>

            {/* Availability */}
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
                        checked={availableOnly}
                        onChange={() => setAvailableOnly(!availableOnly)}
                        className="accent-primaryBtn w-4 h-4 cursor-pointer"
                    />
                </label>
            </section>

            {/* Buttons */}
            <footer className="flex items-center gap-3 pt-5 border-t-2 border-gray-100">
                <button className="flex-1 bg-primaryBtn text-white py-3 rounded-xl hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg text-sm font-extrabold hover:scale-105 active:scale-95">
                    Apply Filters
                </button>
                <button className="px-5 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 text-sm font-bold hover:scale-105 active:scale-95">
                    Reset
                </button>
            </footer>
        </aside>
    );
};

export default memo(MachinesFilter);
