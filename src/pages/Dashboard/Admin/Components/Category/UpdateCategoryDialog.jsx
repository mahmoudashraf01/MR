import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Machine from '../../../../../assets/machine2.jpeg';
import { updateCategory, resetUpdateCategory } from '../../../../../slices/Categories/UpdateCateogry';
import { Spinner } from '../../../../../components/ui/spinner';
import DeleteCategoryAlert from './DeleteCategoryAlert';

const UpdateCategoryDialog = ({ open, onOpenChange, category }) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.updateCategory);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (open && category) {
            setImagePreview(category.image || Machine);
            setName(category.name || '');
            setDescription(category.description || '');
            setImage(null);
        }
    }, [open, category]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                onOpenChange(false);
                dispatch(resetUpdateCategory());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success, onOpenChange, dispatch]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleUpdate = (e) => {
        if (e) e.preventDefault();
        if (!category) return;

        const data = {};
        if (image) data.image = image;
        data.name = name;
        data.description = description;

        dispatch(updateCategory({ id: category.id, data }));
    };

    const inputClasses = "flex h-10 w-full rounded-md border border-[#D2D2D2] bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-primaryBtn  disabled:cursor-not-allowed disabled:opacity-50";
    const textareaClasses = "flex min-h-[100px] w-full rounded-md border border-[#D2D2D2] bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-primaryBtn  disabled:cursor-not-allowed disabled:opacity-50";
    const buttonBaseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const buttonOutlineClasses = `${buttonBaseClasses} bg-primaryBtn hover:bg-primaryBtn/90 text-white cursor-pointer font-semibold h-9 px-3`;
    const buttonSecondaryClasses = `w-full rounded-md bg-[#EF5350] text-white font-semibold hover:bg-[#EF5350]/80 cursor-pointer h-9 px-4 py-2`;
    const buttonPrimaryClasses = `w-full rounded-md bg-primaryBtn text-white font-semibold hover:bg-primaryBtn/90 cursor-pointer h-9 px-4 py-2`;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Update Category</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 py-4">
                    {/* Image Section */}
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={imagePreview}
                            alt="Category"
                            className="w-24 h-24 rounded-lg object-cover border"
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <button
                            type="button"
                            className={buttonOutlineClasses}
                            onClick={() => fileInputRef.current.click()}
                        >
                            Update Image
                        </button>
                    </div>

                    {/* Static Fields Section */}
                    <div className="w-full space-y-4 mt-2">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Category Name
                            </label>
                            <input
                                className={inputClasses}
                                placeholder="Enter category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Description
                            </label>
                            <textarea
                                className={textareaClasses}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Feedback Messages */}
                    {success && (
                        <DeleteCategoryAlert
                            alertTitle="Category updated successfully"
                            alertColor='#68BB5FCC'
                            borderColor='#22C55E33'
                            type="success"
                        />
                    )}
                    {error && (
                        <DeleteCategoryAlert
                            alertTitle={typeof error === 'string' ? error : "Failed to update category"}
                            alertColor='#EF5350CC'
                            borderColor='#EF535033'
                            type="error"
                        />
                    )}
                </div>

                <DialogFooter>
                    <div className="flex w-full gap-2 justify-center items-center">
                        <button 
                            type="button" 
                            className={buttonSecondaryClasses} 
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            className={buttonPrimaryClasses} 
                            onClick={handleUpdate} 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex justify-center items-center">
                                    <h1 className='font-semibold'>
                                        Updating..
                                    </h1>
                                </span>
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateCategoryDialog;