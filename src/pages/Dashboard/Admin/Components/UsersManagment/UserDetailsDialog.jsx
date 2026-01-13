import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UserPlaceholder from '../../../../../assets/userIcon.svg';
import CompanyPlaceholder from '../../../../../assets/CompaniesIcon.svg';

const DetailRow = ({ label, value, isStatus, isVerified, className = "" }) => (
    <div className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-0 ${className}`}>
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {isStatus ? (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${value ? 'bg-[#68BB5FCC] text-white' : 'bg-[#EF5350CC] text-white'}`}>
                {value ? 'Active' : 'Inactive'}
            </span>
        ) : isVerified !== undefined ? (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isVerified ? 'bg-[#68BB5FCC] text-white' : 'bg-[#EF5350CC] text-white'}`}>
                {value}
            </span>
        ) : (
            <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%] wrap-break-words">{value || "N/A"}</span>
        )}
    </div>
);

const UserDetailsDialog = ({ open, onOpenChange, user }) => {
    if (!user) return null;

    const isCompany = user.role === "company";
    const companyData = user.company;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] sm:max-w-xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl p-0 gap-0 outline-none">
                <DialogHeader className="p-6 border-b border-[#D3D3D3] bg-white shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-800">User Details</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* User Profile Header */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm flex items-center gap-5">
                        <img
                            src={user.image || UserPlaceholder}
                            alt={user.full_name}
                            className="w-20 h-20 rounded-full object-cover border border-gray-200"
                        />
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-900">{user.full_name}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-lg capitalize ${user.role === 'company' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Basic Information</h3>
                        <div className="space-y-1">
                            <DetailRow label="ID" value={user.id} />
                            <DetailRow label="Full Name" value={user.full_name} />
                            <DetailRow label="Email" value={user.email} />
                            <DetailRow label="Role" value={user.role} />
                            <DetailRow label="Account Status" value={user.is_active} isStatus />
                            <DetailRow
                                label="Email Verified At"
                                value={user.email_verified_at || "Not Verified"}
                                isVerified={!!user.email_verified_at}
                            />
                            <DetailRow label="Created At" value={user.created_at} />
                        </div>
                    </div>

                    {/* Company Details */}
                    {isCompany && companyData && (
                        <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Information</h3>
                                {companyData.image ? (
                                    <img src={companyData.image} alt="Company Logo" className="w-8 h-8 rounded-md object-cover border" />
                                ) : (
                                    <img src={CompanyPlaceholder} alt="Company Placeholder" className="w-8 h-8 opacity-50" />
                                )}
                            </div>

                            <div className="space-y-1">
                                <DetailRow label="Company Name" value={companyData.company_name} />
                                <DetailRow label="Contact Person" value={companyData.contact_person} />
                                <DetailRow label="Phone" value={companyData.phone} />
                                <DetailRow label="Tax ID" value={companyData.tax_id} />
                                <DetailRow
                                    label="Verification Status"
                                    value={companyData.verified ? "Verified" : "Not Verified"}
                                    isVerified={companyData.verified}
                                />

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase">Address Details</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                                        <DetailRow label="City" value={companyData.city} />
                                        <DetailRow label="Region" value={companyData.region} />
                                        <DetailRow label="Address" value={companyData.address} className="sm:col-span-2" />
                                        <DetailRow label="Postal Code" value={companyData.postalcode} />
                                        <DetailRow label="House Number" value={companyData.house_number} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsDialog;
