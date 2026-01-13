import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DetailRow = ({ label, value }) => {
    if (value === null || value === undefined || value === '') return null;
    return (
        <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm font-medium text-gray-500 col-span-1">{label}</span>
            <span className="text-sm text-gray-900 col-span-2 font-medium break-words">{value}</span>
        </div>
    );
};

const Section = ({ title, children }) => {
    return (
        <div className="mb-6 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-base font-semibold text-primaryBtn mb-3 border-b border-gray-200 pb-2">{title}</h3>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
};

const BookingDetailsDialog = ({ open, onOpenChange, booking }) => {
    if (!booking) return null;

    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            return new Date(dateString).toLocaleDateString('en-US', { dateStyle: 'long' });
        } catch (e) {
            return dateString;
        }
    };

    const formatCurrency = (amount) => {
        if (!amount) return null;
        return `$${Number(amount).toLocaleString()}`;
    };

    const formatBoolean = (val) => val ? 'Yes' : 'No';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white sm:max-w-3xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl p-0 outline-none">
                <DialogHeader className="p-6 border-b border-gray-100 bg-white shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-800">Booking Details #{booking.id}</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    {/* Booking Info Section */}
                    <Section title="Booking Information">
                        <DetailRow label="Status" value={booking.status} />
                        <DetailRow label="Start Date" value={formatDate(booking.start_date)} />
                        <DetailRow label="End Date" value={formatDate(booking.end_date)} />
                        <DetailRow label="Total Cost" value={booking.total_cost ? `$${booking.total_cost}` : null} />
                        <DetailRow label="Deposit Paid Amount" value={booking.deposit_paid_amount ? `$${booking.deposit_paid_amount}` : null} />
                        <DetailRow label="Is Deposit Paid" value={booking.is_deposit_paid !== null ? formatBoolean(booking.is_deposit_paid) : null} />
                        <DetailRow label="Notes" value={booking.notes} />
                        <DetailRow label="Created At" value={formatDate(booking.created_at)} />
                        <DetailRow label="Updated At" value={formatDate(booking.updated_at)} />
                    </Section>

                    {/* Machine Info Section */}
                    {booking.machine && (
                        <Section title="Machine Information">
                            <DetailRow label="Title" value={booking.machine.title} />
                            <DetailRow label="Stock" value={booking.machine.stock} />
                            <DetailRow label="Year" value={booking.machine.year} />
                            <DetailRow label="Description" value={booking.machine.description} />
                            <DetailRow label="Daily Rate" value={formatCurrency(booking.machine.daily_rate)} />
                            <DetailRow label="Weekly Rate" value={formatCurrency(booking.machine.weekly_rate)} />
                            <DetailRow label="Monthly Rate" value={formatCurrency(booking.machine.monthly_rate)} />
                            <DetailRow label="Deposit" value={formatCurrency(booking.machine.deposit)} />
                            <DetailRow label="Transport Rate / KM" value={booking.machine.transport_rate_per_km ? formatCurrency(booking.machine.transport_rate_per_km) : null} />
                            <DetailRow label="Location" value={booking.machine.location_city} />
                            <DetailRow label="Availability" value={booking.machine.availability_status} />
                            <DetailRow label="Featured" value={booking.machine.is_featured !== null ? formatBoolean(booking.machine.is_featured) : null} />
                            
                            {booking.machine.technical_specifications && (
                                <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-sm font-medium text-gray-500 col-span-1">Tech Specs</span>
                                    <span className="text-sm text-gray-900 col-span-2 font-medium break-words">
                                        {JSON.stringify(booking.machine.technical_specifications)}
                                    </span>
                                </div>
                            )}

                             {booking.machine.images && booking.machine.images.length > 0 && (
                                <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-sm font-medium text-gray-500 col-span-1">Images</span>
                                    <div className="text-sm text-gray-900 col-span-2 font-medium break-words flex gap-2 flex-wrap">
                                        {booking.machine.images.map((img, idx) => (
                                            <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">Image {idx + 1}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Section>
                    )}

                    {/* Owner Company Section */}
                    {booking.owner_company && (
                        <Section title="Owner Company">
                            <DetailRow label="Company Name" value={booking.owner_company.company_name} />
                            <DetailRow label="Contact Person" value={booking.owner_company.contact_person} />
                            <DetailRow label="Phone" value={booking.owner_company.phone} />
                            <DetailRow label="Email" value={booking.owner_company.email} />
                            <DetailRow label="City" value={booking.owner_company.city} />
                            <DetailRow label="Region" value={booking.owner_company.region} />
                            <DetailRow label="Address" value={booking.owner_company.address} />
                            <DetailRow label="Postal Code" value={booking.owner_company.postalcode} />
                            <DetailRow label="House Number" value={booking.owner_company.house_number} />
                            <DetailRow label="Tax ID" value={booking.owner_company.tax_id} />
                            <DetailRow label="Verified" value={booking.owner_company.verified !== null ? formatBoolean(booking.owner_company.verified) : null} />
                        </Section>
                    )}

                    {/* Company Renter Section */}
                    {booking.company_renter && (
                        <Section title="Company Renter">
                            <DetailRow label="Company Name" value={booking.company_renter.company_name} />
                            <DetailRow label="Contact Person" value={booking.company_renter.contact_person} />
                            <DetailRow label="Phone" value={booking.company_renter.phone} />
                            <DetailRow label="City" value={booking.company_renter.city} />
                        </Section>
                    )}

                    {/* Renter Section */}
                    {booking.renter && (
                        <Section title="Renter">
                            <DetailRow label="Name" value={booking.renter.name} />
                            <DetailRow label="Contact Person" value={booking.renter.contact_person} />
                            <DetailRow label="Phone" value={booking.renter.phone} />
                            <DetailRow label="City" value={booking.renter.city} />
                            <DetailRow label="Region" value={booking.renter.region} />
                        </Section>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDetailsDialog;
