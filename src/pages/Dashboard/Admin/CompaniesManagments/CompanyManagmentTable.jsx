import { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../slices/UsersManagment/ListUsers';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import TrashIcon from '../../../../assets/trashIcon.svg';
import EditIcon from '../../../../assets/editIcon.svg';
import EyeIcon from '../../../../assets/eyeIcon.svg';
import Machine from '../../../../assets/machine2.jpeg';
import CompanyIcon from '../../../../assets/CompaniesIcon.svg';
import SkeletonTable from '../Skeletons/SkeletonTable';
import AdminCompanyDetailsDialog from './AdminCompanyDetailsDialog';
import UpdateUserDialog from '../Components/UsersManagment/UpdateUserDialog';
import { deleteUser, resetDeleteUser } from '../../../../slices/UsersManagment/DeleteUsers';
import { resetUpdateUser } from '../../../../slices/UsersManagment/UpdateUser';
import DeleteCategoryAlert from '../Components/Category/DeleteCategoryAlert';
import { Spinner } from '../../../../components/ui/spinner';


const columns = [
    { key: "city", label: "City" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];
const CompanyManagmentTable = ({ filters }) => {
    const dispatch = useDispatch();
    const { users, loading, totalPages } = useSelector((state) => state.listUsers);
    const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteUser);
    const { success: updateSuccess, error: updateError } = useSelector((state) => state.updateUser);
    const tableRef = useRef(null);

    const [activeColumn, setActiveColumn] = useState("city");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem("company_city_current_page", String(currentPage));
    }, [currentPage]);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, ...filters }));
    }, [dispatch, currentPage, filters]);

    useEffect(() => {
        if (deleteSuccess) {
            dispatch(fetchUsers({ page: currentPage, ...filters }));
            const timer = setTimeout(() => {
                dispatch(resetDeleteUser());
                setDeletingId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (deleteError) {
            const timer = setTimeout(() => {
                dispatch(resetDeleteUser());
                setDeletingId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [deleteSuccess, deleteError, dispatch, currentPage, filters]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch(fetchUsers({ page: currentPage, ...filters }));
            const timer = setTimeout(() => {
                dispatch(resetUpdateUser());
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (updateError) {
            const timer = setTimeout(() => {
                dispatch(resetUpdateUser());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [updateSuccess, updateError, dispatch, currentPage, filters]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const companies =
        users?.map((user) => user.company).filter((company) => !!company) || [];

    const uniqueCompanies = companies.filter((company, index, self) =>
        index === self.findIndex((c) => c.id === company.id)
    );

    const statusFilter = filters?.verified;

    const filteredCompanies =
        statusFilter === 1
            ? uniqueCompanies.filter((company) => company.verified)
            : statusFilter === 0
                ? uniqueCompanies.filter((company) => !company.verified)
                : uniqueCompanies;

    const handleDeleteClick = (company) => {
        if (!company?.user_id) return;
        setDeletingId(company.user_id);
        dispatch(deleteUser(company.user_id));
    };

    const handleEditClick = (company) => {
        if (!company?.user_id) return;
        const userForCompany = users?.find((u) => u.id === company.user_id) || null;
        if (!userForCompany) return;
        setSelectedUser(userForCompany);
        setEditDialogOpen(true);
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        // Helper function to create button
        const createButton = (pageNum) => (
            <button
                key={`page-${pageNum}`}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ${pageNum === currentPage ? 'bg-primaryBtn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                aria-label={`Page ${pageNum}`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
            >
                {pageNum}
            </button>
        );

        if (totalPages <= 4) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(createButton(i));
            }
        } else {
            // Logic for more than 4 pages
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, currentPage + 1);

            if (currentPage === 1) {
                endPage = 3;
            } else if (currentPage === totalPages) {
                startPage = totalPages - 2;
            }

            // Always show first page if not in range
            if (startPage > 1) {
                buttons.push(createButton(1));
                if (startPage > 2) {
                    buttons.push(<span key="ellipsis-start" className='px-2 text-xs text-gray-400 font-medium'>...</span>);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(createButton(i));
            }

            // Always show last page if not in range
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    buttons.push(<span key="ellipsis-end" className='px-2 text-xs text-gray-400 font-medium'>...</span>);
                }
                buttons.push(createButton(totalPages));
            }
        }
        return buttons;
    };
    return (
        <div ref={tableRef}>
            {deleteSuccess && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle="Company deleted successfully"
                        alertColor='#68BB5FCC'
                        borderColor='#22C55E33'
                        type="success"
                    />
                </div>
            )}
            {deleteError && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle={typeof deleteError === 'string' ? deleteError : "Failed to delete company"}
                        alertColor='#EF5350CC'
                        borderColor='#EF535033'
                        type="error"
                    />
                </div>
            )}
            <AdminCompanyDetailsDialog
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
                company={selectedCompany}
            />
            <UpdateUserDialog
                user={selectedUser}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
                hideVerifiedField={true}
            />
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
            <div className="bg-white rounded-lg  overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-[#D2D2D2]/5 shadow">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium">
                                Company Name
                            </th>

                            {/* Mobile Dynamic Column */}
                            <th
                                className={`px-4 py-3 text-sm text-left font-medium lg:hidden transition-all duration-300 ease-in-out
                     ${activeColumn !== "category"
                                        ? "text-blue-600"
                                        : ""
                                    }`}
                            >
                                {columns.find((c) => c.key === activeColumn)?.label}
                            </th>

                            {/* Desktop Columns */}
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">City</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Phone</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Status</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <SkeletonTable rows={8} />
                        ) : (
                            filteredCompanies.map((company) => (
                                <tr key={company.id} className="border-t border-gray-300 hover:bg-blue-50 transition-colors">
                                    {/* Company Name & Image */}
                                    <td className="px-4 py-3 flex items-center w-60 gap-3">
                                        <img src={company.image || CompanyIcon} alt={company.company_name} className="w-8 h-8 rounded-md" />
                                        <span className="truncate text-sm font-medium">
                                            {company.company_name}
                                        </span>
                                    </td>

                                    {/* Mobile Dynamic Cell */}
                                    <td className="px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">
                                        {activeColumn === "city" && (
                                            <span className="text-gray-500 text-sm">
                                                {company.city || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "phone" && (
                                            <span className="text-gray-500 text-sm">
                                                {company.phone || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "status" && (
                                            <button className={`w-30 h-8 text-xs rounded-xl
                                        ${company.verified ? "bg-primaryBtn" : "bg-[#EF5350CC]"}`}>
                                                <h1
                                                    className=' px-5 py-1 text-xs rounded-full text-white'
                                                >
                                                    {company.verified ? "Verified" : "Non-Verified"}
                                                </h1>
                                            </button>
                                        )}

                                        {activeColumn === "actions" && (
                                            <div className="flex gap-3 items-center">
                                                {deleteLoading && deletingId === company.user_id ? (
                                                    <Spinner className="w-4 h-4" />
                                                ) : (
                                                    <img
                                                        src={TrashIcon}
                                                        alt="delete"
                                                        className="w-4 h-4 cursor-pointer"
                                                        onClick={() => handleDeleteClick(company)}
                                                    />
                                                )}
                                                <img
                                                    src={EditIcon}
                                                    alt="edit"
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => handleEditClick(company)}
                                                />
                                                <button
                                                    onClick={() => {
                                                        setSelectedCompany(company);
                                                        setViewDialogOpen(true);
                                                    }}
                                                    className="hover:scale-110 transition-transform cursor-pointer"
                                                >
                                                    <img src={EyeIcon} alt="view" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                    {/* Desktop Cells */}
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {company.city || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {company.phone || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <button className={`w-30 h-8 text-xs rounded-xl
                                        ${company.verified ? "bg-primaryBtn" : "bg-[#EF5350CC]"}`}>
                                            <h1
                                                className=' px-5 py-1 text-xs rounded-md text-white'
                                            >
                                                {company.verified ? "Verified" : "Non-Verified"}
                                            </h1>
                                        </button>
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <div className="flex gap-3 items-center">
                                            {deleteLoading && deletingId === company.user_id ? (
                                                <Spinner className="w-4 h-4" />
                                            ) : (
                                                <img
                                                    src={TrashIcon}
                                                    alt="delete"
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => handleDeleteClick(company)}
                                                />
                                            )}
                                            <img
                                                src={EditIcon}
                                                alt="edit"
                                                className="w-4 h-4 cursor-pointer"
                                                onClick={() => handleEditClick(company)}
                                            />
                                            <button
                                                onClick={() => {
                                                    setSelectedCompany(company);
                                                    setViewDialogOpen(true);
                                                }}
                                                className="hover:scale-110 transition-transform cursor-pointer"
                                            >
                                                <img src={EyeIcon} alt="view" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-end pt-5'>
                {/* Pagination */}
                <nav className='flex justify-center items-center gap-1.5 mt-8 bg-white p-3 rounded-xl shadow-sm border border-gray-100' aria-label="Pagination">
                    <button
                        className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                        onClick={() => {
                            const newPage = Math.max(1, currentPage - 1);
                            handlePageChange(newPage);
                        }}
                    >
                        Previous
                    </button>

                    {totalPages <= 3 ? (
                        Array.from({ length: totalPages }).map((_, idx) => {
                            const pageNum = idx + 1;
                            const isActive = pageNum === currentPage;
                            return (
                                <button
                                    key={`page-${pageNum}`}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-primaryBtn text-white shadow-sm' : 'border cursor-pointer border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                    aria-label={`Page ${pageNum}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    {pageNum}
                                </button>
                            );
                        })
                    ) : (
                        <>
                            {[1, 2, 3].map((pageNum) => {
                                const isActive = pageNum === currentPage;
                                return (
                                    <button
                                        key={`page-${pageNum}`}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-2 rounded-lg text-xs font-semibold ${isActive ? 'bg-primaryBtn text-white shadow-sm' : 'border cursor-pointer border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                        aria-label={`Page ${pageNum}`}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <span className='px-2 text-xs text-gray-400 font-medium' aria-hidden="true">...</span>

                            <button
                                key={`page-${totalPages}`}
                                onClick={() => handlePageChange(totalPages)}
                                className={`px-3 py-2 rounded-lg text-xs font-semibold ${totalPages === currentPage ? 'bg-primaryBtn text-white shadow-sm' : 'border cursor-pointer border-gray-200 text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5'}`}
                                aria-label={`Page ${totalPages}`}
                                aria-current={totalPages === currentPage ? 'page' : undefined}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                    <button
                        className='px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-primaryBtn hover:text-primaryBtn hover:bg-primaryBtn/5 disabled:opacity-50 transition-all duration-200 font-semibold flex items-center gap-1.5 disabled:cursor-not-allowed cursor-pointer'
                        aria-label="Next page"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                            const newPage = Math.min(totalPages, currentPage + 1);
                            handlePageChange(newPage);
                        }}
                    >
                        Next
                        <FaArrowRight className='text-xs' />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default memo(CompanyManagmentTable);
