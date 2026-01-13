import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CompanyPlaceholder from '../../../../assets/CompaniesIcon.svg';

const DetailRow = ({ label, value, isStatus, className = "" }) => (
    <div className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-0 ${className}`}>
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {isStatus ? (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${value === true || value === 'verified' ? 'bg-[#68BB5FCC] text-white' : 'bg-[#EF5350CC] text-white'}`}>
                {value === true ? "Verified" : value === false ? "Non-Verified" : value}
            </span>
        ) : (
            <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%] wrap-break-words">{value || "N/A"}</span>
        )}
    </div>
);

const AdminCompanyDetailsDialog = ({ open, onOpenChange, company }) => {
    if (!company) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] sm:max-w-xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl p-0 gap-0 outline-none">
                <DialogHeader className="p-6 border-b border-[#D3D3D3] bg-white shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-800">Company Details</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* Company Header */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm flex items-start gap-5">
                        <img
                            src={company.image || CompanyPlaceholder}
                            alt={company.company_name}
                            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="space-y-1 flex-1">
                            <h2 className="text-xl font-bold text-gray-900">{company.company_name}</h2>
                            <p className="text-sm text-gray-500">{company.city || "Unknown Location"}</p>
                             <div className="mt-2">
                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-lg ${company.verified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {company.verified ? "Verified Business" : "Verification Pending"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Contact Information</h3>
                        <div className="space-y-1">
                            <DetailRow label="Contact Person" value={company.contact_person} />
                            <DetailRow label="Phone" value={company.phone} />
                            <DetailRow label="Email" value={company.email} />
                        </div>
                    </div>

                    {/* Location Details */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Location</h3>
                        <div className="space-y-1">
                            <DetailRow label="Address" value={company.address} />
                            <DetailRow label="House Number" value={company.house_number || company.houseNumber} />
                            <DetailRow label="Postal Code" value={company.postalcode || company.postalCode} />
                            <DetailRow label="City" value={company.city} />
                            <DetailRow label="Region" value={company.region} />
                        </div>
                    </div>

                    {/* Business Details */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Business Details</h3>
                        <div className="space-y-1">
                            <DetailRow label="Company ID" value={company.id} />
                            <DetailRow label="Tax ID" value={company.tax_id || company.taxId} />
                            <DetailRow label="Verification Status" value={company.verified} isStatus />
                            <DetailRow label="Created At" value={company.created_at ? new Date(company.created_at).toLocaleDateString() : "N/A"} />
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AdminCompanyDetailsDialog;
