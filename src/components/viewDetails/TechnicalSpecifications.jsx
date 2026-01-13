import { memo } from "react";
import { useSelector } from "react-redux";

const TechnicalSpecifications = () => {
    const { data: machine } = useSelector((state) => state.machineBokkingDetails);

    let specs = machine?.technical_specifications || [];
    console.log("Technical Specifications:", specs);

    // Parse if it's a string
    if (typeof specs === 'string') {
        try {
            specs = JSON.parse(specs);
        } catch (e) {
            console.error("Failed to parse technical_specifications", e);
            specs = [];
        }
    }

    // Ensure specs is always an array to prevent "flatMap is not a function" error
    if (!Array.isArray(specs)) {
        if (typeof specs === 'object' && specs !== null) {
            // If it's a single object (and not null), wrap it in an array
            specs = [specs];
        } else {
            // If it's neither array nor object, default to empty array
            specs = [];
        }
    }

    if (!specs || specs.length === 0) {
        return (
            <div className="w-full flex flex-col gap-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-navColor">
                        Technical Specifications
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Detailed technical information about this machine
                    </p>
                </div>
                <div className="p-4 text-gray-500 bg-gray-50 rounded-md border border-gray-200">
                    No techincal specifications for this machine in the whole section
                </div>
            </div>
        );
    }

    // Flatten array of objects into [key, value] pairs
    // Handle cases where items in the array are JSON strings
    const specEntries = specs.flatMap(item => {
        let specObj = item;
        
        // If the item is a string, try to parse it
        if (typeof item === 'string') {
            try {
                specObj = JSON.parse(item);
            } catch (e) {
                console.warn("Skipping invalid spec item:", item);
                return [];
            }
        }

        // Now extract entries if it's a valid object
        if (typeof specObj === 'object' && specObj !== null) {
            return Object.entries(specObj);
        }
        return [];
    });

    return (
        <div className="w-full flex flex-col gap-6">

            {/* Title Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-semibold text-navColor">
                    Technical Specifications
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Detailed technical information about this machine
                </p>
            </div>

            {/* Table Section */}
            <div className="border border-gray-300 rounded-md overflow-hidden">
                {specEntries.map(([label, value], index) => (
                    <SpecificationRow key={index} label={label} value={value} />
                ))}
            </div>

            {/* Notes Box */}
            <div className="border border-gray-300 rounded-md p-6 bg-white shadow-sm">
                <h3 className="font-semibold text-navColor mb-2">Specification Notes</h3>
                <p className="text-sm text-gray-600">
                    {machine.specification_notes || "no specifiction notes"}
                </p>
            </div>
        </div>
    );
};

// Reusable Row Component
const SpecificationRow = ({ label, value }) => (
    <div className="grid grid-cols-2 bg-[#0A254014] even:bg-white border-b border-gray-300 last:border-b-0 px-4 py-3 text-sm">
        <span className="font-medium text-navColor">{label}</span>
        <span className="text-gray-600">{value}</span>
    </div>
);

export default memo(TechnicalSpecifications);
