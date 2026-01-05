import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import DropDownArrow from '../../../../../assets/dropdownArrow.svg';
import TrashIcon from '../../../../../assets/trashIcon.svg';
import EditIcon from '../../../../../assets/editIcon.svg';
import EyeIcon from '../../../../../assets/eyeIcon.svg';
import Machine from '../../../../../assets/machine2.jpeg';
import { fetchCategories } from '../../../../../slices/GetAllCategoriesByPage';
import SubCategoryDialog from './SubCategoryDialog';
import SkeletonTable from '../../Skeletons/SkeletonTable';


const columns = [
    { key: "description", label: "Description" },
    { key: "subcategory_name", label: "Subcategory Name" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];


const SubCategoryTable = () => {
    const dispatch = useDispatch();
    const { categories, subCategories, loading } = useSelector((state) => state.categoriesByPage);
    const [activeColumn, setActiveColumn] = useState("subcategory_name");
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div>
            {/* Table title */}
            <div className='flex max-md:flex-col gap-5 justify-between items-center py-5'>
                <h1 className='text-[24px] font-semibold'>Sub Categories Table</h1>
                <button 
                    onClick={() => { setOpenDialog(true) }}
                    className='bg-primaryBtn p-3 rounded-xl w-55 max-md:w-full text-[18px] text-white font-semibold hover:bg-blue-500'>
                    Add Subcategery
                </button>
                <SubCategoryDialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                />
            </div>

            {/* Mobile Column Menu */}
            <div className="relative mb-3 lg:hidden">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="border border-[#D2D2D2] rounded-md px-4 py-2 w-full flex justify-between"
                >
                    Columns
                    {menuOpen ? <AiOutlineClose className="w-4 h-4" /> : <AiOutlineMenu className="w-4 h-4" />}
                </button>

                {menuOpen && (
                    <div className="absolute animate-fade-in duration-300 z-10 bg-white border rounded-md w-full mt-2">
                        {columns.map((col) => (
                            <button
                                key={col.key}
                                onClick={() => {
                                    setActiveColumn(col.key);
                                    setMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm
                     ${activeColumn === col.key
                                        ? "text-primaryBtn font-medium bg-blue-50"
                                        : "text-gray-700"
                                    }`}
                            >
                                {col.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border-b border-[#D2D2D2]  overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-[#F8FAFB] shadow">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium">
                                Subcategory Image
                            </th>

                            {/* Mobile Dynamic Column */}
                            <th
                                className={`px-4 py-3 text-sm text-left font-medium lg:hidden transition-all duration-300 ease-in-out
                     ${activeColumn !== "subcategory"
                                        ? "text-primaryBtn"
                                        : ""
                                    }`}
                            >
                                {columns.find((c) => c.key === activeColumn)?.label}
                            </th>

                            {/* Desktop Columns */}
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Subcategory Name</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Description</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Status</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody className='w-full'>
                        {loading ? (
                            <SkeletonTable rows={5} />
                        ) : subCategories?.map((subcategory) => (
                            <tr key={subCategories.id} className="border-t border-gray-300">
                                {/* Title */}
                                {/* Title */}
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img
                                        src={subcategory.image || Machine}
                                        alt={subcategory.name}
                                        className="w-8 h-8 rounded-md object-cover"
                                    />
                                </td>

                                {/* Mobile Dynamic Cell */}
                                <td className=" px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">

                                    {activeColumn === "subcategory_name" && (
                                        <span className="text-gray-500 text-sm">
                                            {subcategory.name}
                                        </span>
                                    )}

                                    {activeColumn === "description" && (
                                        <div className='flex w-35'>
                                            <span className="line-clamp-2 text-gray-500 text-sm">
                                                {subcategory.description}
                                            </span>
                                        </div>
                                    )}

                                    {activeColumn === "status" && (
                                        <button className={`w-25 h-7 text-xs rounded-full
                                        ${subcategory.is_active ? "bg-[#68BB5FCC]" : "bg-[#EF5350CC]"}
                                        `}>
                                            <h1
                                                className=' px-5 py-1 text-xs rounded-full text-white'
                                            >
                                                {subcategory.is_active ? "Active" : "Inactive"}
                                            </h1>
                                        </button>
                                    )}

                                    {activeColumn === "actions" && (
                                        <div className="flex gap-3">
                                            <img src={TrashIcon} alt="delete" className="w-4 h-4" />
                                            <img src={EditIcon} alt="edit" className="w-4 h-4" />
                                            <img src={EyeIcon} alt="view" className="w-4 h-4" />
                                        </div>
                                    )}
                                </td>

                                {/* Desktop Cells */}
                                <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                    <span className="text-gray-500 text-sm">
                                        {subcategory.name}
                                    </span>

                                </td>
                                <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                    {activeColumn === "description" && (
                                        <div className='flex w-30'>
                                            <span className="line-clamp-2 text-gray-500 text-sm">
                                                {subcategory.description}
                                            </span>
                                        </div>
                                    )}
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3">
                                    <span className="px-3 py-1 text-xs rounded-full bg-[#68BB5FCC] text-white">
                                        Active
                                    </span>
                                </td>
                                <td className="hidden lg:table-cell px-4 py-3">
                                    <div className="flex gap-3">
                                        <img src={TrashIcon} alt="delete" className="w-4 h-4" />
                                        <img src={EditIcon} alt="edit" className="w-4 h-4" />
                                        <img src={EyeIcon} alt="view" className="w-4 h-4" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(SubCategoryTable);
