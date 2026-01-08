import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Machine from "../../../../../assets/machine2.jpeg";

const CategoyDetailsDialog = ({ open, onOpenChange, category }) => {
    if (!category) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] sm:max-w-2xl max-h-[90vh] rounded-2xl p-0 flex flex-col overflow-hidden">
                <DialogHeader className="p-6 border-b border-[#D3D3D3] shrink-0">
                    <DialogTitle className="text-xl font-bold">Category Details</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6 overflow-y-auto mr-1">
                    {/* Category Info */}
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <img
                                src={category.image || Machine}
                                alt={category.name}
                                className="w-24 h-24 rounded-lg object-cover border"
                            />
                            <div className="space-y-2 flex-1">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">{category.name}</h2>
                                    <span className={`px-3 py-1 text-xs rounded-full text-white ${category.is_active ? "bg-[#68BB5FCC]" : "bg-[#EF5350CC]"}`}>
                                        {category.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">ID: {category.id}</p>
                                <p className="text-gray-700 text-sm">{category.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subcategories */}
                    <div className="border-t border-[#D3D3D3] pt-4">
                        <h3 className="text-lg font-semibold mb-4">Subcategories</h3>

                        {category.sub_categories && category.sub_categories.length > 0 ? (
                            <div className="grid gap-4">
                                {category.sub_categories.map((sub) => (
                                    <div key={sub.id} className="bg-gray-50 p-4 rounded-lg border border-[#D3D3D3] flex gap-4">
                                        <img
                                            src={sub.image || Machine}
                                            alt={sub.name}
                                            className="w-16 h-16 rounded-md object-cover border"
                                        />
                                        <div className="space-y-1 flex-1">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium">{sub.name}</h4>
                                                <span className={`px-2 py-0.5 text-[10px] rounded-full text-white h-fit ${sub.is_active ? "bg-[#68BB5FCC]" : "bg-[#EF5350CC]"}`}>
                                                    {sub.is_active ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">ID: {sub.id}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2">{sub.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-[#D3D3D3]">
                                There is no subcategory related to this category.
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CategoyDetailsDialog;
