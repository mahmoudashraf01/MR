import { memo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

const inputBase =
    "w-full bg-white border rounded-md px-4 py-2 text-sm focus:outline-none border-[#D2D2D2] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]";


const CategoryDialog = ({ open, onOpenChange }) => {
    const fileInputRef = useRef(null)
    const [images, setImages] = useState([])
    const [status, setStatus] = useState("active")

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange" })

    const handleAddImage = (e) => {
        const files = Array.from(e.target.files)
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }))
        setImages((prev) => [...prev, ...newImages])
    }

    const onSubmit = (data) => {
        console.log({
            ...data,
            status,
            images,
        })
        onOpenChange(false)
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#F4F5F7] w-[400px]  rounded-2xl px-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="flex justify-center items-center mb-6 text-center">
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>

                    <div className="flex justify-center items-start flex-col gap-5 px-6 py-6">
                        {/* IMAGE */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="mb-4 text-blue-500 text-sm hover:underline cursor-pointer"
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

                        {/* NAME */}
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
                            className={`${inputBase}`}
                        />

                        {/* STATUS */}
                        <div className="flex flex-col gap-5">
                            <h1 className="font-medium">Status</h1>
                            <div className="flex gap-6 mb-2">
                                <label className="flex gap-2">
                                    <input
                                        type="radio"
                                        checked={status === "active"}
                                        onChange={() => setStatus("active")}
                                    /> 
                                   <p className="text-[14px] text-[#9CA3AF]">
                                    Active
                                   </p>
                                </label>
                                <label className="flex gap-2">
                                    <input
                                        type="radio"
                                        checked={status === "inactive"}
                                        onChange={() => setStatus("inactive")}
                                    />
                                    <p className="text-[14px] text-[#9CA3AF]"> 
                                    Inactive
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <DialogFooter className="grid grid-cols-2 px-6 py-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 bg-red-500 text-white py-2 rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`flex-1 py-2 rounded-md text-white font-medium transition
                ${isValid ? "bg-blue-500" : "bg-blue-300 cursor-not-allowed"}
              `}
                        >
                            Save
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default memo(CategoryDialog)
