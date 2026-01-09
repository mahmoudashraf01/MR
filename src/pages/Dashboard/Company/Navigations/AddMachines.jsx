import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Machine from '../../../../assets/machine3.jpeg'
import DropDownArrow from '../../../../assets/minusArrow.svg';
import DropUpArrow from '../../../../assets/dropUpArrow.svg';
import { fetchCategories } from '../../../../slices/Categories/GetAllCategoriesByPage';
import { createMachine, resetCreateMachine } from '../../../../slices/Machines/CreateMachine';
import { Dialog, DialogContent } from "@/components/ui/dialog";


const inputBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none border-[#D2D2D2] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]";

const labelBase = "block text-sm font-medium text-navColor mb-1";

const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";

const AddMachines = () => {
    const dispatch = useDispatch();
    const { categories, subCategories } = useSelector((state) => state.categoriesByPage);
    const { user } = useSelector((state) => state.saveToken || {});
    const { loading: createLoading, success: createSuccess, error: createError } = useSelector((state) => state.createMachine);

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [specRows, setSpecRows] = useState([]);
    const [resultOpen, setResultOpen] = useState(false);
    const [resultType, setResultType] = useState("success");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        getValues,
        formState: { isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            category_id: "",
            sub_category_id: "",
            daily_rate: "",
            weekly_rate: "",
            monthly_rate: "",
            deposit: "",
            transport_rate_per_km: "",
            year: "",
            description: "",
            location_city: "",
            availability_status: "",
            is_featured: "",
            stock: "",
        },
    });

    const selectedCategoryId = watch("category_id");
    const selectedSubcategoryId = watch("subcategory_id");

    // const subCategories = useMemo(() => {
    //     if (!selectedCategoryId) return [];
    //     return allSubCategories?.filter((sub) => String(sub.category_id) === String(selectedCategoryId)) || [];
    // }, [allSubCategories, selectedCategoryId]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // useEffect(() => {
    //     setValue("sub_category_id", "");
    // }, [selectedCategoryId, setValue]);

    useEffect(() => {
        if (createSuccess) {
            setResultType("success");
            setResultOpen(true);
        }
    }, [createSuccess]);

    useEffect(() => {
        if (createError) {
            setResultType("error");
            setResultOpen(true);
        }
    }, [createError]);

    const bumpNumber = (field, delta) => {
        const current = Number(getValues(field) || 0);
        const next = current + delta;
        setValue(field, String(next), { shouldValidate: true, shouldDirty: true });
    };

    const handlePickImage = () => {
        fileInputRef.current?.click();
    };

    const handleAddImage = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setImages((prev) => [...prev, { file, preview }]);
        e.target.value = "";
    };

    const clearImages = () => {
        images.forEach((img) => {
            try {
                URL.revokeObjectURL(img.preview);
            } catch {
                null;
            }
        });
        setImages([]);
    };

    const handleCancel = () => {
        reset();
        setBrand("");
        setModel("");
        setSpecRows([]);
        clearImages();
        dispatch(resetCreateMachine());
    };

    const handleAddSpecRow = () => {
        setSpecRows((prev) => [...prev, { key: "", value: "" }]);
    };

    const handleSpecRowChange = (index, field, value) => {
        setSpecRows((prev) =>
            prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
        );
    };

    const onSubmit = async (values) => {
        const specObject = {};
        if (brand.trim()) specObject.brand = brand.trim();
        if (model.trim()) specObject.model = model.trim();
        specRows.forEach((row) => {
            const key = (row.key || "").trim();
            const value = (row.value || "").trim();
            if (!key || !value) return;
            specObject[key] = value;
        });

        const technical_specifications = Object.keys(specObject).length > 0 ? [specObject] : undefined;
        const companyId = user?.company?.id || user?.company_id || user?.companyId;

        const payload = {
            ...values,
            company_id: companyId,
            is_featured: values.is_featured === "featured",
            technical_specifications,
            images: images.map((img) => img.file),
        };

        const result = await dispatch(createMachine(payload));

        if (createMachine.fulfilled.match(result)) {
            reset();
            setBrand("");
            setModel("");
            setSpecRows([]);
            clearImages();
        }
    };

    const handleResultOpenChange = (open) => {
        setResultOpen(open);
        if (!open) {
            dispatch(resetCreateMachine());
        }
    };

    return (
        <div className="flex flex-col bg-white border border-[#D2D2D2] rounded-[40px] shadow gap-5">
            <div className="min-h-screen mx-auto p-6 w-full">
                <div className="mb-6 flex flex-col justify-center lg:items-start items-center gap-3">
                    <h1 className="text-2xl font-semibold">Add New Machine</h1>
                    <p className="text-sm text-gray-500 text-center">
                        Fill in the details to add a new machine to your inventory
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="order-1 lg:order-2 flex flex-col items-center text-center">
                            <h3 className="font-medium mb-4">Machine Images</h3>

                            <div className="w-full max-w-[360px] overflow-x-auto">
                                <div className="flex gap-3 pb-2">
                                    {images.length > 0 ? (
                                        images.map((img, idx) => (
                                            <img
                                                key={idx}
                                                src={img.preview}
                                                alt="machine"
                                                className="w-20 h-20 rounded-md object-cover border border-gray-200"
                                            />
                                        ))
                                    ) : (
                                        <img
                                            src={Machine}
                                            alt="machine"
                                            className="w-20 h-20 rounded-md object-cover border border-gray-200"
                                        />
                                    )}
                                </div>
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleAddImage}
                            />

                            <button
                                type="button"
                                onClick={handlePickImage}
                                className="mt-4 px-5 py-2 bg-primaryBtn text-white rounded-md"
                            >
                                Add Image
                            </button>
                        </div>

                        <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
                            <div>
                                <h3 className="font-semibold mb-4">Basic Information</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className={labelBase}>Machine Title</label>
                                        <input
                                            {...register("title", { required: true })}
                                            className={inputBase}
                                            placeholder="Enter machine title"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label className={labelBase}>Category</label>
                                            <select
                                                {...register("category_id", { required: true })}
                                                className={selectBase}
                                            >
                                                <option value="">Select Category</option>
                                                {categories?.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <img
                                                src={DropDownArrow}
                                                alt="arrow"
                                                className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className={labelBase}>Subcategory</label>
                                            <select
                                                {...register("sub_category_id", { required: true })}
                                                className={selectBase}
                                            >
                                                <option value="">Select Subcategory</option>
                                                {subCategories?.map((sub) => (
                                                    <option key={sub.id} value={sub.id}>
                                                        {sub.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <img
                                                src={DropDownArrow}
                                                alt="arrow"
                                                className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelBase}>Year of Manufacturing</label>
                                            <div className="relative">
                                                <input
                                                    {...register("year", { required: true })}
                                                    className={`${inputBase} pr-8`}
                                                    type="number"
                                                    placeholder="2025"
                                                />
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                    <img
                                                        src={DropUpArrow}
                                                        alt="increase"
                                                        className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                        onClick={() => bumpNumber("year", 1)}
                                                    />
                                                    <img
                                                        src={DropDownArrow}
                                                        alt="decrease"
                                                        className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                        onClick={() => bumpNumber("year", -1)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <label className={labelBase}>Availability Status</label>
                                            <select
                                                {...register("availability_status", { required: true })}
                                                className={selectBase}
                                            >
                                                <option value="">Select Status</option>
                                                <option value="available">Available</option>
                                                <option value="rented">Rented</option>
                                                <option value="maintance">Maintance</option>
                                            </select>
                                            <img
                                                src={DropDownArrow}
                                                alt="arrow"
                                                className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                            />
                                        </div>

                                        <div>
                                            <label className={labelBase}>Location City</label>
                                            <input
                                                {...register("location_city", { required: true })}
                                                className={inputBase}
                                                placeholder="Enter city"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label className={labelBase}>Featured</label>
                                            <select
                                                {...register("is_featured", { required: true })}
                                                className={selectBase}
                                            >
                                                <option value="">Select Featured Option</option>
                                                <option value="featured">Featured</option>
                                                <option value="not_featured">Not featured</option>
                                            </select>
                                            <img
                                                src={DropDownArrow}
                                                alt="arrow"
                                                className="absolute right-3 top-9 w-4 h-4 pointer-events-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <label className={labelBase}>Description</label>
                                    <textarea
                                        {...register("description", { required: true })}
                                        rows={2}
                                        type="text"
                                        placeholder="Enter description"
                                        className="w-full border border-[#D2D2D2] focus:outline-none rounded-xl px-4 py-7 bg-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">Pricing & Stock</h3>

                                <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelBase}>Daily Rate ($)</label>
                                        <div className="relative">
                                            <input
                                                {...register("daily_rate", { required: true })}
                                                className={`${inputBase} pr-8`}
                                                type="number"
                                                placeholder="0.00"
                                                step="1"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("daily_rate", 1)}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("daily_rate", -1)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelBase}>Weekly Rate ($)</label>
                                        <div className="relative">
                                            <input
                                                {...register("weekly_rate", { required: true })}
                                                className={`${inputBase} pr-8`}
                                                type="number"
                                                placeholder="0.00"
                                                step="1"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("weekly_rate", 1)}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("weekly_rate", -1)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelBase}>Monthly Rate ($)</label>
                                        <div className="relative">
                                            <input
                                                {...register("monthly_rate", { required: true })}
                                                className={`${inputBase} pr-8`}
                                                type="number"
                                                placeholder="0.00"
                                                step="1"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("monthly_rate", 1)}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("monthly_rate", -1)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelBase}>Deposit ($)</label>
                                        <div className="relative">
                                            <input
                                                {...register("deposit", { required: true })}
                                                className={`${inputBase} pr-8`}
                                                type="number"
                                                placeholder="0.00"
                                                step="1"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("deposit", 1)}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("deposit", -1)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelBase}>Transport Rate Per(KM) ($)</label>
                                        <div className="relative">
                                            <input
                                                {...register("transport_rate_per_km", { required: true })}
                                                className={`${inputBase} pr-8`}
                                                type="number"
                                                placeholder="0.00"
                                                step="1"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("transport_rate_per_km", 1)}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("transport_rate_per_km", -1)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelBase}>Stock Quantity</label>
                                        <div className="relative">
                                            <input
                                                {...register("stock", { required: true })}
                                                className={`${inputBase} pr-8`}
                                                type="number"
                                                placeholder="1"
                                                step="1"
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                                                <img
                                                    src={DropUpArrow}
                                                    alt="increase"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("stock", 1)}
                                                />
                                                <img
                                                    src={DropDownArrow}
                                                    alt="decrease"
                                                    className="w-3 h-3 cursor-pointer hover:opacity-70"
                                                    onClick={() => bumpNumber("stock", -1)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col px-6 justify-center mt-8'>
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold mb-4">Specifications</h3>
                            <button
                                type="button"
                                onClick={handleAddSpecRow}
                                className="px-4 py-2 bg-primaryBtn text-white rounded-md text-sm"
                            >
                                Add Specification
                            </button>
                        </div>

                        <div className="max-md:w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelBase}>Brand</label>
                                <input
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className={inputBase}
                                    placeholder="Enter Brand"
                                />
                            </div>

                            <div>
                                <label className={labelBase}>Model</label>
                                <input
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                    className={inputBase}
                                    placeholder="Enter Model"
                                />
                            </div>
                        </div>

                        {specRows.length > 0 && (
                            <div className="mt-4 space-y-4">
                                {specRows.map((row, idx) => (
                                    <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelBase}>Specification</label>
                                            <input
                                                value={row.key}
                                                onChange={(e) => handleSpecRowChange(idx, "key", e.target.value)}
                                                className={inputBase}
                                                placeholder="e.g. power"
                                            />
                                        </div>
                                        <div>
                                            <label className={labelBase}>Value</label>
                                            <input
                                                value={row.value}
                                                onChange={(e) => handleSpecRowChange(idx, "value", e.target.value)}
                                                className={inputBase}
                                                placeholder="e.g. 400 HP"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='lg:flex flex-col items-end'>
                            <div className="my-5 flex max-sm:flex-col justify-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-57 max-sm:w-full py-2 bg-red-500 text-white rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isValid || createLoading}
                                    className="w-57 max-sm:w-full py-2 bg-primaryBtn text-white rounded-md disabled:opacity-60"
                                >
                                    {createLoading ? "Saving.." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <Dialog open={resultOpen} onOpenChange={handleResultOpenChange}>
                    <DialogContent className="bg-white w-[360px] rounded-2xl text-center p-8">
                        {resultType === "success" ? (
                            <>
                                <h2 className="text-xl font-semibold mb-3">
                                    Machine created successfully
                                </h2>
                                <button
                                    onClick={() => handleResultOpenChange(false)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition"
                                >
                                    Done
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-3 text-red-500">
                                    Failed to create machine
                                </h2>
                                <p className="text-sm text-gray-500 mb-6">
                                    {typeof createError === "string" ? createError : "Please try again later."}
                                </p>
                                <button
                                    onClick={() => handleResultOpenChange(false)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default memo(AddMachines);
