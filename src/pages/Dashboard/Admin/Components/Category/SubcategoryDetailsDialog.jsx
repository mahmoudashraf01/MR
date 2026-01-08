import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Machine from "../../../../../assets/machine2.jpeg";
import { fetchCategoryById, clearSelectedCategory } from '../../../../../slices/GetAllCategoriesByPage';
import { Spinner } from '../../../../../components/ui/spinner';

const SubcategoryDetailsDialog = ({ open, onOpenChange, subcategory }) => {
    const dispatch = useDispatch();
    const { selectedCategory, loading, error } = useSelector((state) => state.categoriesByPage);

    useEffect(() => {
        // Try to get ID from category_id OR nested category object
        const id = subcategory?.category_id || subcategory?.category?.id;
        
        if (open && id) {
            dispatch(fetchCategoryById(id));
        } else {
            dispatch(clearSelectedCategory());
        }
    }, [open, subcategory, dispatch]);

    if (!subcategory) return null;

    // Use selectedCategory from Redux if available, otherwise fallback to subcategory.category
    const parentCategory = selectedCategory || subcategory.category;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] sm:max-w-2xl max-h-[90vh] rounded-2xl p-0 flex flex-col overflow-hidden">
                <DialogHeader className="p-6 border-b border-[#D3D3D3] shrink-0">
                    <DialogTitle className="text-xl font-bold">Subcategory Details</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6 overflow-y-auto mr-1">
                    {/* Subcategory Info */}
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start">
                            <img
                                src={subcategory.image || Machine}
                                alt={subcategory.name}
                                className="w-24 h-24 rounded-lg object-cover border"
                            />
                            <div className="space-y-2 flex-1">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">{subcategory.name}</h2>
                                    <span className={`px-3 py-1 text-xs rounded-full text-white ${subcategory.is_active ? "bg-[#68BB5FCC]" : "bg-[#EF5350CC]"}`}>
                                        {subcategory.is_active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">ID: {subcategory.id}</p>
                                <p className="text-gray-700 text-sm">{subcategory.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Category Parent */}
                    <div className="border-t border-[#D3D3D3] pt-4">
                        <h3 className="text-lg font-semibold mb-4">Category Parent</h3>

                        {loading ? (
                            <div className="flex justify-center py-4">
                                <Spinner className="w-6 h-6 text-primaryBtn" />
                            </div>
                        ) : error ? (
                            <div className="text-center py-4 text-red-500 bg-red-50 rounded-lg border border-red-200">
                                Failed to load parent category
                            </div>
                        ) : parentCategory ? (
                            <div className="bg-gray-50 p-4 rounded-lg border border-[#D3D3D3] flex gap-4">
                                <img
                                    src={parentCategory.image || Machine}
                                    alt={parentCategory.name}
                                    className="w-16 h-16 rounded-md object-cover border"
                                />
                                <div className="space-y-1 flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium">{parentCategory.name}</h4>
                                        <span className={`px-2 py-0.5 text-[10px] rounded-full text-white h-fit ${parentCategory.is_active ? "bg-[#68BB5FCC]" : "bg-[#EF5350CC]"}`}>
                                            {parentCategory.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">ID: {parentCategory.id}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2">{parentCategory.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-[#D3D3D3]">
                                There is no category parent related to this subcategory.
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubcategoryDetailsDialog;