import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import MachinePlaceholder from '../../../../../../assets/machine2.jpeg';
import CompanyPlaceholder from '../../../../../../assets/CompaniesIcon.svg';

const DetailRow = ({ label, value, isStatus, className = "" }) => (
    <div className={`flex justify-between items-center py-2 border-b border-gray-100 last:border-0 ${className}`}>
        <span className="text-sm font-medium text-gray-500">{label}</span>
        {isStatus ? (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${value === 'available' ? 'bg-[#68BB5FCC] text-white' : 'bg-[#EF5350CC] text-white'}`}>
                {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'Unknown'}
            </span>
        ) : (
            <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%] break-words">{value || "N/A"}</span>
        )}
    </div>
);

const getTechnicalSpecRows = (technical_specifications) => {
    const toArray = (value) => {
        if (value === undefined || value === null) return [];
        if (Array.isArray(value)) return value;
        if (typeof value === "string") {
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [parsed];
            } catch {
                return [];
            }
        }
        if (typeof value === "object") return [value];
        return [];
    };

    const rawItems = toArray(technical_specifications);
    const objects = [];

    rawItems.forEach((item) => {
        if (item === undefined || item === null) return;

        if (typeof item === "string") {
            try {
                const parsed = JSON.parse(item);
                if (Array.isArray(parsed)) {
                    parsed.forEach((inner) => {
                        if (inner && typeof inner === "object" && !Array.isArray(inner)) objects.push(inner);
                    });
                } else if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                    objects.push(parsed);
                }
            } catch {
                null;
            }
            return;
        }

        if (typeof item === "object" && !Array.isArray(item)) {
            objects.push(item);
        }
    });

    const rows = [];
    objects.forEach((obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            const displayValue =
                value === undefined || value === null
                    ? ""
                    : typeof value === "string" || typeof value === "number" || typeof value === "boolean"
                        ? String(value)
                        : JSON.stringify(value);
            rows.push({ key, value: displayValue });
        });
    });

    return rows.filter((r) => r.key && r.value);
};

const MachinesDetailsDialog = ({ open, onOpenChange, machine }) => {
    if (!machine) return null;

    const companyData = machine.company;
    const technicalSpecRows = getTechnicalSpecRows(machine.technical_specifications);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] sm:max-w-xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl p-0 gap-0 outline-none">
                <DialogHeader className="p-6 border-b border-[#D3D3D3] bg-white shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-800">Machine Details</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* Machine Header */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm flex items-start gap-5">
                        <img
                            src={machine.images?.[0] || MachinePlaceholder}
                            alt={machine.title}
                            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="space-y-1 flex-1">
                            <h2 className="text-xl font-bold text-gray-900">{machine.title}</h2>
                            <p className="text-sm text-gray-500 line-clamp-2">{machine.description}</p>
                            <div className="flex gap-2 mt-2">
                                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-600`}>
                                    {machine.category?.name}
                                </span>
                                {machine.sub_category && (
                                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-lg bg-purple-50 text-purple-600`}>
                                        {machine.sub_category.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery (if more than 1 image) */}
                    {machine.images && machine.images.length > 1 && (
                        <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Gallery</h3>
                            <div className="grid grid-cols-4 gap-2">
                                {machine.images.map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`${machine.title} ${index + 1}`} 
                                        className="w-full h-20 object-cover rounded-md border border-gray-100"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Pricing Details */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Pricing Information</h3>
                        <div className="space-y-1">
                            <DetailRow label="Daily Rate" value={`$${machine.daily_rate}`} />
                            <DetailRow label="Weekly Rate" value={`$${machine.weekly_rate}`} />
                            <DetailRow label="Monthly Rate" value={`$${machine.monthly_rate}`} />
                            <DetailRow label="Deposit" value={machine.deposit ? `$${machine.deposit}` : "None"} />
                            <DetailRow label="Transport (per km)" value={machine.transport_rate_per_km ? `$${machine.transport_rate_per_km}` : "N/A"} />
                        </div>
                    </div>

                    {/* Machine Specifications */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Machine Specifications</h3>
                        <div className="space-y-1">
                            <DetailRow label="ID" value={machine.id} />
                            <DetailRow label="Year" value={machine.year} />
                            <DetailRow label="Stock" value={machine.stock} />
                            <DetailRow label="Availability Status" value={machine.availability_status} isStatus />
                            <DetailRow label="Location" value={machine.location_city} />
                            <DetailRow label="Featured" value={machine.is_featured ? "Yes" : "No"} />
                            {technicalSpecRows.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                     <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">Technical Specs</h4>
                                     <div className="overflow-hidden rounded-lg border border-gray-100">
                                        <table className="w-full border-collapse">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">Specification</th>
                                                    <th className="text-left text-xs font-semibold text-gray-500 px-3 py-2">Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {technicalSpecRows.map((row, idx) => (
                                                    <tr key={`${row.key}-${idx}`} className="border-t border-gray-100">
                                                        <td className="px-3 py-2 text-sm font-medium text-gray-700 align-top">
                                                            {row.key}
                                                        </td>
                                                        <td className="px-3 py-2 text-sm text-gray-600 break-words">
                                                            {row.value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                     </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full Description */}
                    <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider border-b border-gray-100 pb-2">Description</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {machine.description}
                        </p>
                    </div>

                    {/* Company Details */}
                    {companyData && (
                        <div className="bg-white p-5 rounded-xl border border-[#D3D3D3] shadow-sm">
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Owner Information</h3>
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
                                <DetailRow label="Address" value={`${companyData.address}, ${companyData.city}, ${companyData.region}`} />
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MachinesDetailsDialog;
