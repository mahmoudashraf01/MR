import { memo } from 'react';
import Phone from '../../assets/phone.svg';
import Email from '../../assets/email.svg';
import WorkingHours from '../../assets/Group.svg';

const ContactSection = () => {
    return (
        <div className="w-full bg-equipmentBg py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT CARD - CONTACT SUPPORT FORM */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Contact Support
                    </h2>

                    <p className="text-gray-600 text-base mb-8 leading-relaxed">
                        We're here to help with anything related to rentals, machine listings,
                        delivery arrangements, and account issues.
                    </p>

                    {/* FORM */}
                    <div className="flex flex-col gap-5">

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">Email</label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">
                                Your Company <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your company"
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Please describe your issue in details..."
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm resize-none"
                            />
                        </div>

                        <button className="bg-primaryBtn text-white py-3 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg font-medium mt-2">
                            Send to support
                        </button>
                    </div>
                </div>

                {/* RIGHT CARD - CONTACT INFO */}
                <div className="bg-white p-8 rounded-2xl shadow-lg h-fit border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Contact Information
                    </h2>

                    {/* Phone */}
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                        <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center shrink-0">
                            <img src={Phone} alt="phone" className='w-7 h-7' />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                            <p className="text-gray-600 text-sm">+00000000000000000</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 py-6 border-b border-gray-200">
                        <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center shrink-0">
                            <img src={Email} alt="email" className='w-7 h-7' />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                            <p className="text-primaryBtn text-sm font-medium">support@machinerentals.com</p>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4 pt-6">
                        <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center shrink-0">
                            <img src={WorkingHours} alt="working hours" className='w-7 h-7' />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                            <p className="text-gray-600 text-sm">24/7</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default memo(ContactSection);