// BookingDialog.jsx
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { createBooking, resetCreateBookingState } from "../../slices/Bookings/CreateBookings";
import { fetchDistanceKm, resetDistance } from "../../slices/Bookings/CalcDistance";
import PikcupIcon from '../../assets/pikcupIcon.svg';
import DeliveryIcon from '../../assets/delivery.svg';
import EmailLocationyIcon from '../../assets/emailLocation.svg';
import { Spinner } from "@/components/ui/spinner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

export default function BookingDialog({ open, onOpenChange, machine }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openSummary, setOpenSummary] = useState(false);
    const [notes, setNotes] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null); // 'pickup' or 'delivery'
    const [showLoginAlert, setShowLoginAlert] = useState(false);

    const dispatch = useDispatch();
    const { token, user } = useSelector((state) => state.saveToken || {});
    const { isLoading, isSuccess, error } = useSelector((state) => state.createBooking || {});
    const { distanceKm, loading: distanceLoading, error: distanceError } = useSelector((state) => state.distance || {});

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

    useEffect(() => {
        // Reset distance when dialog opens/closes
        if (!open) {
            dispatch(resetDistance());
            setSelectedDeliveryOption(null);
            setUserAddress("");
        }
    }, [open, dispatch]);

    const handleCalculateDistance = () => {
        if (userAddress && machine?.company?.address) {
            dispatch(fetchDistanceKm({
                userAddress: userAddress,
                companyAddress: machine.company.address
            }));
        } else if (!userAddress) {
             // Optional: alert user to enter address
        }
    };

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

    const deliveryCost = useMemo(() => {
        if (selectedDeliveryOption === 'delivery' && distanceKm) {
            return distanceKm * 5;
        }
        return 0;
    }, [selectedDeliveryOption, distanceKm]);

    const taxAndFees = 30;
    const subtotal = totalPrice;
    const finalTotal = subtotal + taxAndFees + deliveryCost;

    return (
        <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[60%] w-full bg-white rounded-2xl border border-gray-100 shadow-xl py-px px-0">

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

                    {/* DELIVERY DETAILS */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Delivery Details
                        </h3>
                        <div className="flex gap-1 items-center">
                            <input
                                type="text"
                                placeholder="Enter Address"
                                className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn outline-none"
                                value={userAddress}
                                onChange={(e) => setUserAddress(e.target.value)}
                            />
                            <img src={EmailLocationyIcon} alt="" className="cursor-pointer" />
                        </div>

                        <textarea
                            placeholder="Notes (optional)"
                            className="w-full mt-3 px-3 py-2 rounded-lg border border-gray-300 h-20 focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn outline-none resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>

                    {/* DELIVERY OPTION */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Delivery Option
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedDeliveryOption('pickup');
                                        dispatch(resetDistance());
                                    }}
                                    className={`border-2 flex flex-col justify-center items-center gap-2 py-3 rounded-xl transition-all ${selectedDeliveryOption === 'pickup' ? 'border-primaryBtn text-primaryBtn bg-blue-50' : 'border-gray-300 text-gray-600'}`}
                                >
                                    <img src={PikcupIcon} alt="pikcupIcon" className="w-5" />
                                    <h1>Pick up</h1>
                                    <h1>(Free)</h1>
                                </button>
                                {selectedDeliveryOption === 'pickup' && (
                                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                                        <span className="font-semibold">Address:</span> {machine?.company?.address || "Address not available"}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedDeliveryOption('delivery');
                                        handleCalculateDistance();
                                    }}
                                    disabled={!userAddress}
                                    className={`border-2 flex flex-col justify-center items-center gap-2 py-3 rounded-xl transition-all ${selectedDeliveryOption === 'delivery' ? 'border-primaryBtn text-primaryBtn bg-blue-50' : 'border-gray-300 text-gray-600'} ${!userAddress ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {distanceLoading ? (
                                        <Spinner className="w-5 h-5 text-current" />
                                    ) : (
                                        <img src={DeliveryIcon} alt="pikcupIcon" className="w-5" />
                                    )}
                                    <h1>Delivery </h1>
                                    <h1>(5$/km)</h1>
                                </button>
                                {selectedDeliveryOption === 'delivery' && (
                                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 min-h-[60px]">
                                        {distanceLoading && (
                                            <div className="flex items-center justify-center h-full">
                                                <span>Calculating...</span>
                                            </div>
                                        )}
                                        {distanceError && (
                                            <div className="text-red-500">
                                                Error: {distanceError}
                                            </div>
                                        )}
                                        {!distanceLoading && !distanceError && distanceKm && (
                                            <>
                                                <div className="flex justify-between mb-1">
                                                    <span className="font-semibold">Distance:</span>
                                                    <span>{distanceKm.toFixed(2)} KM</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-semibold">Price:</span>
                                                    <span>${(distanceKm * 5).toFixed(2)}</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="mt-6 select-none border-b border-gray-200 pb-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Order Summary
                        </h3>

                        {/* DURATION */}
                        <div className="flex justify-between text-sm text-gray-700">
                            <span>Duration</span>
                            <span className="font-semibold text-gray-900">
                                {durationDays || 0} days
                            </span>
                        </div>

                        {/* Delivery */}
                        <div className="flex justify-between text-sm text-gray-700 mt-2">
                            <span>Delivery</span>
                            <span className="font-semibold text-gray-900">
                                {deliveryCost > 0 ? `${deliveryCost.toFixed(2)}$` : '--$'}
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
                        <span className="text-secondary">{finalTotal.toFixed(2)}$</span>
                    </div>
                </div>

                {/* FOOTER BUTTON */}
                <DialogFooter className="p-6">
                    <button
                        onClick={() => {
                            if (!token) {
                                setShowLoginAlert(true);
                                return;
                            }
                            const bookingData = {
                                machine_id: machine?.id,
                                owner_company_id: machine?.company?.id,
                                renter_id: user.role === 'renter'? user?.renter?.id :user.role === 'admin'? user?.admin?.id : user.role === 'company'?  user?.company?.id : null,
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
                        className="w-full bg-primaryBtn text-white py-3 rounded-xl font-semibold text-center hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? "Creating..." : "Confirm Booking"}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
            <DialogContent className="sm:max-w-[400px] w-full bg-white rounded-2xl border border-gray-100 shadow-2xl p-6">
                <DialogHeader className="flex flex-col items-center text-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                        <span className="text-2xl">🔒</span>
                    </div>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        Authentication Required
                    </DialogTitle>
                    <DialogDescription className="text-center text-gray-500">
                        You must be logged in to complete your booking. <br />
                        Please sign in to your account to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                        onClick={() => setShowLoginAlert(false)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#EF5350] text-white font-semibold hover:bg-[#EF5350]/90 transition duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => navigate('/auth/login', { state: { from: location.pathname + location.search } })}
                        className="w-full py-2.5 px-4 rounded-xl bg-primaryBtn text-white font-semibold hover:opacity-90 shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </DialogContent>
        </Dialog>
        </>
    );
}
