import { memo, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import DropDownArrow from "../../../../../assets/minusArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../../slices/GetAllCategoriesByPage";
import { createCategory } from "../../../../../slices/Categories/CreateCategory";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const inputBase =
    "w-full bg-white border rounded-md px-4 py-2 text-sm focus:outline-none border-[#D2D2D2]";

const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none border-[#D2D2D2] bg-white";

const CategoryDialog = ({ open, onOpenChange }) => {
    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.categoriesByPage
    );

    const { loading: createLoading } = useSelector(
        (state) => state.createCategory
    );

    /* =======================
       Local state
    ======================= */
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("active");

    const [showSuccess, setShowSuccess] = useState(false);
    const [createdCategory, setCreatedCategory] = useState(null);

    /* =======================
       Form
    ======================= */
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({ mode: "onChange" });

    /* =======================
       Effects
    ======================= */
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    /* =======================
       Handlers
    ======================= */
    const handleAddImage = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            description: data.description,
            isActive: status === "active",
            images, // زي ما هي (لو form-data الـ thunk بيظبطها)
        };

        console.log("Payload sent:", payload);

        const res = await dispatch(createCategory(payload));

        if (createCategory.fulfilled.match(res)) {
            console.log("Create category response:", res.payload);

            // 👇 الاسم جاي من data.name
            console.log("Category name:", res.payload?.data?.name);

            setCreatedCategory(res.payload.data);
            reset();
            setImages([]);
            setStatus("active");

            onOpenChange(false);   // اقفل dialog الأساسي
            setShowSuccess(true);  // افتح success dialog
        } else {
            console.error("Create category failed:", res);
        }
    };


    /* =======================
       UI
    ======================= */
    return (
        <>
            {/* ============ CREATE CATEGORY DIALOG ============ */}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="bg-[#F4F5F7] w-[400px] rounded-2xl px-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="flex justify-center items-center mb-6">
                            <DialogTitle>Add Category</DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-5 px-6 py-6">
                            {/* IMAGE */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="text-blue-500 text-sm hover:underline"
                            >
                                Add Image
                            </button>

                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                multiple
                                onChange={handleAddImage}
                            />

                            {images.length > 0 && (
                                <div className="flex gap-3 overflow-x-auto">
                                    {images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.preview}
                                            className="w-20 h-20 rounded-md object-cover border"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* CATEGORY */}
                            <input
                                {...register("name", { required: true })}
                                placeholder="Category Name"
                                className={`${inputBase}`}
                            />

                            {/* DESCRIPTION */}
                            <textarea
                                {...register("description", { required: true })}
                                rows={3}
                                placeholder="Description"
                                className={inputBase}
                            />

                            {/* STATUS */}
                            <div>
                                <p className="font-medium mb-2">Status</p>
                                <div className="flex gap-6">
                                    <label className="flex gap-2">
                                        <input
                                            type="radio"
                                            checked={status === "active"}
                                            onChange={() => setStatus("active")}
                                        />
                                        Active
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            type="radio"
                                            checked={status === "inactive"}
                                            onChange={() => setStatus("inactive")}
                                        />
                                        Inactive
                                    </label>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="grid grid-cols-2 gap-3 px-6 py-4">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="bg-red-500 text-white py-2 rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={!isValid || createLoading}
                                className={`py-2 rounded-md text-white ${createLoading
                                    ? "bg-blue-300"
                                    : isValid
                                        ? "bg-primaryBtn cursor-pointer hover:bg-blue-500"
                                        : "bg-blue-300"
                                    }`}
                            >
                                {createLoading ? "Saving..." : "Save"}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ============ SUCCESS DIALOG ============ */}
            <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                <DialogContent className="bg-white w-[360px] rounded-2xl text-center p-8">
                    <h2 className="text-xl font-semibold mb-3 animate-pulse">
                        🎉 Category created successfully
                    </h2>

                    {createdCategory && (
                        <p className="text-sm text-gray-500 mb-6">
                            {createdCategory.name}
                        </p>
                    )}

                    <button
                        onClick={() => setShowSuccess(false)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
                    >
                        Done
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default memo(CategoryDialog);
