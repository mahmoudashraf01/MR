import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMachine, resetUpdateMachine } from '../../../../../slices/Machines/UpdateMachine';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import { Spinner } from '../../../../../components/ui/spinner';
import DropDownArrow from '../../../../../assets/minusArrow.svg';
import DropUpArrow from '../../../../../assets/dropUpArrow.svg';

const inputBase = "w-full border rounded-md px-4 py-2 text-sm focus:outline-none border-[#D2D2D2] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]";
const labelBase = "block text-sm font-medium text-navColor mb-1";
const selectBase = "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";

const UpdateMachineDialog = ({ open, onOpenChange, machine, onSuccess }) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.updateMachine);
    const { categories, subCategories } = useSelector((state) => state.categoriesByPage || { categories: [], subCategories: [] }); // Assuming these are available in global state, otherwise might need fetch

    const [formData, setFormData] = useState({});
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [techSpecs, setTechSpecs] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);

    // Success/Error Dialog States
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    useEffect(() => {
        if (machine && open) {
            // Initialize Form Data
            setFormData({
                title: machine.title || '',
                category_id: machine.category_id || machine.category?.id || '',
                sub_category_id: machine.sub_category_id || machine.sub_category?.id || '',
                daily_rate: machine.daily_rate || '',
                weekly_rate: machine.weekly_rate || '',
                monthly_rate: machine.monthly_rate || '',
                deposit: machine.deposit || '',
                transport_rate_per_km: machine.transport_rate_per_km || '',
                year: machine.year || '',
                description: machine.description || '',
                location_city: machine.location_city || '',
                availability_status: machine.availability_status || 'available',
                stock: machine.stock || '',
                is_featured: machine.is_featured ? 'featured' : 'not_featured', // Map boolean to select value
            });

            // Initialize Images
            if (Array.isArray(machine.images)) {
                setExistingImages(machine.images.map((img, idx) => ({
                    id: img.id || idx,
                    url: typeof img === 'string' ? img : img.url || img.file || ''
                })));
            } else {
                setExistingImages([]);
            }
            setNewImages([]);
            setDeletedImageIds([]);

            // Initialize Tech Specs
            let specs = [];
            if (Array.isArray(machine.technical_specifications)) {
                specs = machine.technical_specifications.map(spec => {
                    if (typeof spec === 'object') {
                        const keys = Object.keys(spec);
                        if (keys.includes('key') && keys.includes('value')) {
                            return { key: spec.key, value: spec.value };
                        }
                        if (keys.length === 1) {
                            return { key: keys[0], value: spec[keys[0]] };
                        }
                    }
                    return { key: '', value: '' };
                });
            } else if (typeof machine.technical_specifications === 'object' && machine.technical_specifications !== null) {
                specs = Object.entries(machine.technical_specifications).map(([key, value]) => ({ key, value }));
            }
            setTechSpecs(specs);
        }
    }, [machine, open]);

    useEffect(() => {
        if (success) {
            onOpenChange(false);
            setShowSuccessDialog(true);
            dispatch(resetUpdateMachine());
            if (onSuccess) onSuccess();
        }
        if (error) {
            onOpenChange(false);
            setShowErrorDialog(true);
            dispatch(resetUpdateMachine());
        }
    }, [success, error, onOpenChange, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const bumpNumber = (field, delta) => {
        const current = Number(formData[field] || 0);
        const next = current + delta;
        setFormData(prev => ({ ...prev, [field]: String(next) }));
    };

    // Image Handling
    const handleImageUpload = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setNewImages(prev => [...prev, ...filesArray]);
        }
    };

    const removeNewImage = (index) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (id) => {
        setExistingImages(prev => prev.filter(img => img.id !== id));
        setDeletedImageIds(prev => [...prev, id]);
    };

    // Tech Specs Handling
    const addTechSpec = () => {
        setTechSpecs(prev => [...prev, { key: '', value: '' }]);
    };

    const removeTechSpec = (index) => {
        setTechSpecs(prev => prev.filter((_, i) => i !== index));
    };

    const handleTechSpecChange = (index, field, value) => {
        const newSpecs = [...techSpecs];
        newSpecs[index][field] = value;
        setTechSpecs(newSpecs);
    };

    const handleSubmit = () => {
        if (!machine || !machine.id) {
            console.error("Machine ID is missing");
            return;
        }
        const submissionData = new FormData();

        // Append basic fields
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                if (key === 'is_featured') {
                    submissionData.append(key, formData[key] === 'featured' ? '1' : '0');
                } else {
                    submissionData.append(key, formData[key]);
                }
            }
        });

        // Append Tech Specs
        const validSpecs = techSpecs.filter(spec => spec.key.trim() !== '');
        validSpecs.forEach((spec, index) => {
            submissionData.append(`technical_specifications[${index}]`, JSON.stringify({ [spec.key]: spec.value }));
        });

        // Append Images
        newImages.forEach((file) => {
            submissionData.append("images[]", file);
        });

        deletedImageIds.forEach(id => {
            submissionData.append("deleted_images[]", id);
        });

        dispatch(updateMachine({ id: machine.id, formData: submissionData }));
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="bg-white sm:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl p-0 gap-0 outline-none">
                    <DialogHeader className="p-6 border-b border-gray-100 bg-white shrink-0">
                        <DialogTitle className="text-xl font-bold text-gray-800">Update Machine</DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Basic Information */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">Basic Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelBase}>Machine Title</label>
                                    <input
                                        name="title"
                                        value={formData.title || ''}
                                        onChange={handleInputChange}
                                        className={inputBase}
                                        placeholder="Enter machine title"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className={labelBase}>Category</label>
                                        <select
                                            name="category_id"
                                            value={formData.category_id || ''}
                                            onChange={handleInputChange}
                                            className={selectBase}
                                        >
                                            <option value="">Select Category</option>
                                            {categories?.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={DropDownArrow} alt="arrow" className="absolute right-3 top-9 w-4 h-4 pointer-events-none" />
                                    </div>

                                    <div className="relative">
                                        <label className={labelBase}>Subcategory</label>
                                        <select
                                            name="sub_category_id"
                                            value={formData.sub_category_id || ''}
                                            onChange={handleInputChange}
                                            className={selectBase}
                                        >
                                            <option value="">Select Subcategory</option>
                                            {subCategories?.map((sub) => (
                                                <option key={sub.id} value={sub.id}>
                                                    {sub.name}
                                                </option>
                                            ))}
                                        </select>
                                        <img src={DropDownArrow} alt="arrow" className="absolute right-3 top-9 w-4 h-4 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelBase}>Year of Manufacturing</label>
                                        <div className="relative">
                                            <input
                                                name="year"
                                                type="number"
                                                value={formData.year || ''}
                                                onChange={handleInputChange}
                                                className={`${inputBase} pr-8`}
                                                placeholder="2025"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("year", 1)} />
                                                <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("year", -1)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className={labelBase}>Availability Status</label>
                                        <select
                                            name="availability_status"
                                            value={formData.availability_status || ''}
                                            onChange={handleInputChange}
                                            className={selectBase}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="available">Available</option>
                                            <option value="rented">Rented</option>
                                            <option value="maintenance">Maintenance</option>
                                        </select>
                                        <img src={DropDownArrow} alt="arrow" className="absolute right-3 top-9 w-4 h-4 pointer-events-none" />
                                    </div>

                                    <div>
                                        <label className={labelBase}>Location City</label>
                                        <input
                                            name="location_city"
                                            value={formData.location_city || ''}
                                            onChange={handleInputChange}
                                            className={inputBase}
                                            placeholder="Enter city"
                                        />
                                    </div>

                                    <div className="relative">
                                        <label className={labelBase}>Featured</label>
                                        <select
                                            name="is_featured"
                                            value={formData.is_featured || ''}
                                            onChange={handleInputChange}
                                            className={selectBase}
                                        >
                                            <option value="">Select Featured Option</option>
                                            <option value="featured">Featured</option>
                                            <option value="not_featured">Not featured</option>
                                        </select>
                                        <img src={DropDownArrow} alt="arrow" className="absolute right-3 top-9 w-4 h-4 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Enter description"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-3 bg-white"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Pricing & Stock */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">Pricing & Stock</h3>
                            <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelBase}>Daily Rate ($)</label>
                                    <div className="relative">
                                        <input
                                            name="daily_rate"
                                            type="number"
                                            value={formData.daily_rate || ''}
                                            onChange={handleInputChange}
                                            className={`${inputBase} pr-8`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("daily_rate", 1)} />
                                            <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("daily_rate", -1)} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Weekly Rate ($)</label>
                                    <div className="relative">
                                        <input
                                            name="weekly_rate"
                                            type="number"
                                            value={formData.weekly_rate || ''}
                                            onChange={handleInputChange}
                                            className={`${inputBase} pr-8`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("weekly_rate", 1)} />
                                            <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("weekly_rate", -1)} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Monthly Rate ($)</label>
                                    <div className="relative">
                                        <input
                                            name="monthly_rate"
                                            type="number"
                                            value={formData.monthly_rate || ''}
                                            onChange={handleInputChange}
                                            className={`${inputBase} pr-8`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("monthly_rate", 1)} />
                                            <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("monthly_rate", -1)} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Deposit ($)</label>
                                    <div className="relative">
                                        <input
                                            name="deposit"
                                            type="number"
                                            value={formData.deposit || ''}
                                            onChange={handleInputChange}
                                            className={`${inputBase} pr-8`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("deposit", 1)} />
                                            <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("deposit", -1)} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Transport Rate Per(KM) ($)</label>
                                    <div className="relative">
                                        <input
                                            name="transport_rate_per_km"
                                            type="number"
                                            value={formData.transport_rate_per_km || ''}
                                            onChange={handleInputChange}
                                            className={`${inputBase} pr-8`}
                                            placeholder="0.00"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("transport_rate_per_km", 1)} />
                                            <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("transport_rate_per_km", -1)} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelBase}>Stock Quantity</label>
                                    <div className="relative">
                                        <input
                                            name="stock"
                                            type="number"
                                            value={formData.stock || ''}
                                            onChange={handleInputChange}
                                            className={`${inputBase} pr-8`}
                                            placeholder="1"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                            <img src={DropUpArrow} alt="increase" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("stock", 1)} />
                                            <img src={DropDownArrow} alt="decrease" className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => bumpNumber("stock", -1)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Images Section */}
                        <section>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">Images</h3>
                            <div className="flex flex-wrap gap-4">
                                {existingImages.map((img) => (
                                    <div key={img.id} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                                        <img src={img.url} alt="Existing" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeExistingImage(img.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}

                                {newImages.map((file, idx) => (
                                    <div key={`new-${idx}`} className="relative w-24 h-24 border rounded-md overflow-hidden group">
                                        <img src={URL.createObjectURL(file)} alt="New" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeNewImage(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTimes size={12} />
                                        </button>
                                    </div>
                                ))}

                                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primaryBtn hover:text-primaryBtn transition-colors">
                                    <FaPlus size={24} />
                                    <span className="text-xs mt-1">Add Image</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            </div>
                        </section>

                        {/* Technical Specs Section */}
                        <section>
                            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-700">Technical Specifications</h3>
                                <button
                                    type="button"
                                    onClick={addTechSpec}
                                    className="px-4 py-2 bg-primaryBtn text-white rounded-md text-sm hover:bg-primaryBtn/90"
                                >
                                    Add Spec
                                </button>
                            </div>

                            <div className="space-y-4">
                                {techSpecs.map((spec, index) => (
                                    <div key={index} className="flex gap-4 items-center">
                                        <div className="flex-1">
                                            <input
                                                value={spec.key}
                                                onChange={(e) => handleTechSpecChange(index, 'key', e.target.value)}
                                                className={inputBase}
                                                placeholder="Key (e.g. Engine)"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                value={spec.value}
                                                onChange={(e) => handleTechSpecChange(index, 'value', e.target.value)}
                                                className={inputBase}
                                                placeholder="Value (e.g. V8)"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeTechSpec(index)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                                {techSpecs.length === 0 && <p className="text-sm text-gray-500 italic">No technical specifications added.</p>}
                            </div>
                        </section>
                    </div>

                    <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="px-6 py-2 rounded-lg cursor-pointer border bg-[#EF5350] text-white font-medium hover:bg-[#EF5350]/90 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 rounded-lg cursor-pointer bg-primaryBtn text-white font-medium hover:bg-primaryBtn/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading && <Spinner className="w-4 h-4 text-white" />}
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="bg-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-primaryBtn">Success</DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-4">
                        <p>Machine updated successfully!</p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button onClick={() => setShowSuccessDialog(false)} className="sm:w-40 cursor-pointer bg-primaryBtn hover:bg-primaryBtn/90 text-white">
                            OK
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Failure Dialog */}
            <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <DialogContent className="bg-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-red-600">Error</DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-4">
                        <p>{typeof error === 'string' ? error : "Failed to update machine. Please try again."}</p>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button onClick={() => setShowErrorDialog(false)} variant="destructive" className="sm:w-40 cursor-pointer bg-[#EF5350] text-white">
                            OK
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateMachineDialog;
