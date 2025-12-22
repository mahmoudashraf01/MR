// BookingDialog.jsx
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, resetCreateBookingState } from "../../slices/Bookings/CreateBookings";
import DropDownArrow from '../../assets/dropdownArrow.svg';
import PikcupIcon from '../../assets/pikcupIcon.svg';
import DeliveryIcon from '../../assets/delivery.svg';
import EmailLocationyIcon from '../../assets/emailLocation.svg';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

export default function BookingDialog({ open, onOpenChange, machine }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openSummary, setOpenSummary] = useState(false);
    const [notes, setNotes] = useState("");

    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.saveToken || {});
    const { isLoading, isSuccess, error } = useSelector((state) => state.createBooking || {});

    useEffect(() => {
        if (isSuccess) {
            alert("Booking confirmed successfully!");
            dispatch(resetCreateBookingState());
            onOpenChange(false);
        }
        if (error) {
            alert("Failed to create booking: " + error);
            dispatch(resetCreateBookingState());
        }
    }, [isSuccess, error, dispatch, onOpenChange]);

    // ============================
    //   CALCULATE DAYS DIFFERENCE
    // ============================
    const durationDays = useMemo(() => {
        if (!startDate || !endDate) return 0;
        const s = new Date(startDate);
        const e = new Date(endDate);

        const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    }, [startDate, endDate]);

    // ============================
    //   PRICE CALCULATION
    // ============================
    const totalPrice = useMemo(() => {
        if (!durationDays || durationDays <= 0) return 0;

        const dailyRate = Number(machine?.daily_rate) || 0;
        const weeklyRate = Number(machine?.weekly_rate) || 0;
        const monthlyRate = Number(machine?.monthly_rate) || 0;

        if (durationDays < 7) {
            return durationDays * dailyRate;
        } else {
            // Calculate months
            const months = Math.floor(durationDays / 30);
            let remainingDays = durationDays % 30;

            // Calculate weeks from remaining days
            const weeks = Math.floor(remainingDays / 7);
            remainingDays = remainingDays % 7;

            // Total price
            const price = (months * monthlyRate) + (weeks * weeklyRate) + (remainingDays * dailyRate);
            return price;
        }
    }, [durationDays, machine]);

    const taxAndFees = 30;
    const subtotal = totalPrice;
    const finalTotal = subtotal + taxAndFees;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className=" bg-white rounded-2xl border border-gray-100 shadow-xl py-px px-0">

                <div className="max-h-[75vh] overflow-y-auto p-6 my-3 md:p-8">

                    {/* HEADER */}
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            Book This Machine
                        </DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            Select your rental dates to get started
                        </DialogDescription>
                    </DialogHeader>

                    {/* SELECTED PERIOD */}
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Selected Period
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn outline-none"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-gray-500">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn outline-none"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* DELIVERY OPTION */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Delivery Option
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="border-2 flex flex-col justify-center items-center gap-2 border-primaryBtn text-primaryBtn font-semibold py-3 rounded-xl">
                                <img src={PikcupIcon} alt="pikcupIcon" className="w-5" />
                                <h1>Pick up</h1>
                                <h1>(Free)</h1>
                            </button>

                            <button className="border-2 flex flex-col justify-center items-center gap-2 border-gray-300 text-gray-600 py-3 rounded-xl">
                                <img src={DeliveryIcon} alt="pikcupIcon" className="w-5" />
                                <h1>Delivery </h1>
                                <h1>($)</h1>

                            </button>
                        </div>
                    </div>

                    {/* DELIVERY DETAILS */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Delivery Details
                        </h3>
                        <div className="flex gap-1">
                            <input
                                type="text"
                                placeholder="Enter Address"
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn outline-none"
                            />
                            <img src={EmailLocationyIcon} alt="" />
                        </div>

                        <textarea
                            placeholder="Notes (optional)"
                            className="w-full mt-3 px-3 py-2 rounded-lg border border-gray-300 h-20 focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn outline-none resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="mt-6 select-none border-b border-gray-200 pb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Order Summary
                        </h3>

                        {/* DROPDOWN HEADER */}

                        <div
                            onClick={() => setOpenSummary(!openSummary)}
                            className="flex justify-between items-center text-sm text-gray-700 font-medium cursor-pointer py-2"
                        >
                            <span>Machines</span>
                            <div className="flex gap-2">
                                <h1 className="">Items</h1>
                                <span
                                    className={`transform transition-transform duration-300 ${openSummary
                                        ? "rotate-0"
                                        : "rotate-180"
                                        }`}
                                >
                                    <img src={DropDownArrow} alt="" />
                                </span>
                            </div>
                        </div>

                        {/* DROPDOWN CONTENT */}
                        <div
                            className={`transition-all duration-300 overflow-hidden ${openSummary ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="text-xs flex flex-col gap-2 text-gray-500 ml-1 mb-3 leading-relaxed">
                                <div className="flex justify-between">
                                    <h1>Machine 1</h1>
                                    <h1>50$</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Machine 2</h1>
                                    <h1>80$$</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Machine 3</h1>
                                    <h1>70$</h1>
                                </div>
                                <div className="flex justify-between">
                                    <h1>Machine 4</h1>
                                    <h1>120$</h1>
                                </div>
                            </div>
                        </div>

                        {/* DURATION */}
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Duration</span>
                            <span className="font-semibold text-gray-900">
                                {durationDays || 0} days
                            </span>
                        </div>

                        {/* TAX */}
                        <div className="flex justify-between text-sm text-gray-700 mt-2">
                            <span>Tax & Fees</span>
                            <span className="font-semibold text-gray-900">
                                {taxAndFees}$
                            </span>
                        </div>

                        {/* SUBTOTAL */}
                        <div className="flex justify-between text-sm text-gray-700 mt-2">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-900">
                                {subtotal}$
                            </span>
                        </div>

                    </div>
                    {/* TOTAL PRICE */}
                    <div className="flex justify-between text-lg font-semibold mt-4 text-gray-900">
                        <span>Total Price</span>
                        <span className="text-secondary">{finalTotal}$</span>
                    </div>
                </div>

                {/* FOOTER BUTTON */}
                <DialogFooter className="p-6">
                    <button
                        onClick={() => {
                            const bookingData = {
                                machine_id: machine?.id,
                                owner_company_id: machine?.company?.id,
                                renter_id: user?.id,
                                start_date: startDate,
                                end_date: endDate,
                                notes: notes,
                                quantity: 1,
                                deposit_paid_amount: finalTotal,
                                is_deposit_paid: true
                            };
                            dispatch(createBooking(bookingData));
                        }}
                        disabled={!startDate || !endDate || isLoading}
                        className="w-full bg-primaryBtn text-white py-3 rounded-xl font-semibold text-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Creating..." : "Confirm Booking"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
