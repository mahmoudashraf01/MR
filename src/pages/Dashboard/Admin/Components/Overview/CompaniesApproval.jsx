import { memo } from 'react';
import companyImg from '../../../../../assets/machine2.jpeg'

const CompaniesApproval = () => {
    const companies = [
        { id: 1, name: "Company name", date: "Submission date", image: companyImg },
        { id: 2, name: "Company name", date: "Submission date", image: companyImg },
    ]

    return (
        <div className="w-full border border-[#3A86FF26] rounded-2xl p-5 max-w-5xl">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-navColor">
                    Companies Awaiting Approval
                </h2>
                <p className="text-[12px] text-[#16163199] text-muted-foreground">
                    Pending verification requests
                </p>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3">
                {companies.map((company) => (
                    <div
                        key={company.id}
                        className="flex items-center justify-between rounded-xl border border-[#CBD5E1] bg-white px-4 py-3"
                    >
                        {/* Left */}
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                                {company.image && (
                                    <img
                                        src={company.image}
                                        alt={company.name}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Text */}
                            <div>
                                <p className="text-sm font-semibold text-[#0F172A]">
                                    {company.name}
                                </p>
                                <p className="text-[10px] text-[#16163199] text-muted-foreground">
                                    {company.date}
                                </p>
                            </div>
                        </div>

                        {/* Action */}
                        <button className="rounded-md bg-primaryBtn px-4 py-1.5 text-sm font-medium text-white hover:bg-[#2563EB] transition">
                            Review
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(CompaniesApproval);