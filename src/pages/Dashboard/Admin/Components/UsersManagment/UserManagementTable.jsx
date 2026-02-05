import { memo, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../../slices/UsersManagment/ListUsers';
import { deleteUser, resetDeleteUser } from '../../../../../slices/UsersManagment/DeleteUsers';
import { updateUserStatus, resetUpdateUser } from '../../../../../slices/UsersManagment/UpdateUser';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import TrashIcon from '../../../../../assets/trashIcon.svg';
import EditIcon from '../../../../../assets/editIcon.svg';
import EyeIcon from '../../../../../assets/eyeIcon.svg';
import UserPlaceholder from '../../../../../assets/userIcon.svg';
import { FaArrowRight } from 'react-icons/fa';
import SkeletonTable from '../../Skeletons/SkeletonTable';
import UserDetailsDialog from './UserDetailsDialog';
import UpdateUserDialog from './UpdateUserDialog';
import DeleteCategoryAlert from '../Category/DeleteCategoryAlert';
import { Spinner } from '../../../../../components/ui/spinner';

const columns = [
    { key: "full_name", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
];

const UserManagmentTable = ({ filters }) => {
    const dispatch = useDispatch();
    const { users, loading, totalPages } = useSelector((state) => state.listUsers);
    const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector((state) => state.deleteUser);
    const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.updateUser);
    const tableRef = useRef(null);

    const [activeColumn, setActiveColumn] = useState("full_name");
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);
    const [activeStatusId, setActiveStatusId] = useState(null);

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
                setUpdatingId(null);
                setActiveStatusId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (updateError) {
            const timer = setTimeout(() => {
                dispatch(resetUpdateUser());
                setUpdatingId(null);
                setActiveStatusId(null);
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

    const handleViewClick = (user) => {
        setSelectedUser(user);
        setViewDialogOpen(true);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditDialogOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeletingId(id);
        dispatch(deleteUser(id));
    };

    const handleStatusClick = (id) => {
        if (activeStatusId === id) {
            setActiveStatusId(null);
        } else {
            setActiveStatusId(id);
        }
    };

    const handleStatusUpdate = (id, newStatus) => {
        setUpdatingId(id);
        dispatch(updateUserStatus({ id, is_active: newStatus }));
    };

    const uniqueUsers = users?.filter((user, index, self) =>
        index === self.findIndex((u) => u.id === user.id)
    ) || [];

    const renderPaginationButtons = () => {
        const buttons = [];

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
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, currentPage + 1);

            if (currentPage === 1) {
                endPage = 3;
            } else if (currentPage === totalPages) {
                startPage = totalPages - 2;
            }

            if (startPage > 1) {
                buttons.push(createButton(1));
                if (startPage > 2) {
                    buttons.push(<span key="ellipsis-start" className='px-2 text-xs text-gray-400 font-medium'>...</span>);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(createButton(i));
            }

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
            {/* Dialogs */}
            <UserDetailsDialog
                user={selectedUser}
                open={viewDialogOpen}
                onOpenChange={setViewDialogOpen}
            />

            <UpdateUserDialog
                user={selectedUser}
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}
            />

            {/* Alert for Delete */}
            {deleteSuccess && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle="User deleted successfully"
                        alertColor='#68BB5FCC'
                        borderColor='#22C55E33'
                        type="success"
                    />
                </div>
            )}
            {deleteError && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle={typeof deleteError === 'string' ? deleteError : "Failed to delete user"}
                        alertColor='#EF5350CC'
                        borderColor='#EF535033'
                        type="error"
                    />
                </div>
            )}
            {updateSuccess && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle="User status updated successfully"
                        alertColor='#68BB5FCC'
                        borderColor='#22C55E33'
                        type="success"
                    />
                </div>
            )}
            {updateError && (
                <div className="mb-4">
                    <DeleteCategoryAlert
                        alertTitle={typeof updateError === 'string' ? updateError : "Failed to update user status"}
                        alertColor='#EF5350CC'
                        borderColor='#EF535033'
                        type="error"
                    />
                </div>
            )}

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
            <div className="bg-white rounded-lg overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-[#D2D2D2]/5 shadow">
                        <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium">
                                Full Name
                            </th>

                            {/* Mobile Dynamic Column */}
                            <th
                                className={`px-4 py-3 text-sm text-left font-medium lg:hidden transition-all duration-300 ease-in-out
                     ${activeColumn !== "full_name"
                                        ? "text-blue-600"
                                        : ""
                                    }`}
                            >
                                {columns.find((c) => c.key === activeColumn)?.label}
                            </th>

                            {/* Desktop Columns */}
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Email</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Role</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Status</th>
                            <th className="hidden lg:table-cell text-sm font-medium px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <SkeletonTable rows={8} />
                        ) : (
                            uniqueUsers.map((user) => (
                                <tr key={user.id} className="border-t border-gray-300 hover:bg-blue-50 transition-colors">
                                    {/* Full Name & Image */}
                                    <td className="px-4 py-3 flex items-center gap-3">
                                        <img src={user.image || UserPlaceholder} alt={user.full_name} className="w-8 h-8 rounded-full object-cover" />
                                        <span className="text-sm font-medium">
                                            {user.full_name}
                                        </span>
                                    </td>

                                    {/* Mobile Dynamic Cell */}
                                    <td className="px-4 py-3 lg:hidden transition-all duration-300 ease-in-out">
                                        {activeColumn === "email" && (
                                            <span className="text-gray-500 text-sm">
                                                {user.email || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "role" && (
                                            <span className="text-gray-500 text-sm capitalize">
                                                {user.role || "N/A"}
                                            </span>
                                        )}

                                        {activeColumn === "status" && (
                                            <div className="relative inline-block">
                                                <button
                                                    onClick={() => handleStatusClick(user.id)}
                                                    className={`w-30 h-8 text-xs rounded-xl ${user.is_active ? "bg-primaryBtn" : "bg-[#EF5350CC]"}`}
                                                    disabled={updateLoading && updatingId === user.id}
                                                >
                                                    {updateLoading && updatingId === user.id ? (
                                                        <Spinner className="mx-auto text-white w-4 h-4" />
                                                    ) : (
                                                        <h1 className='px-5 py-1 text-xs rounded-full text-white'>
                                                            {user.is_active ? "Active" : "Inactive"}
                                                        </h1>
                                                    )}
                                                </button>
                                                {activeStatusId === user.id && (
                                                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                                                        <button
                                                            onClick={() => handleStatusUpdate(user.id, !user.is_active)}
                                                            className="w-full px-4 py-2 text-xs text-left hover:bg-gray-50 text-gray-700"
                                                        >
                                                            {user.is_active ? "Inactive" : "Active"}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {activeColumn === "actions" && (
                                            <div className="flex gap-3 items-center">
                                                {deleteLoading && deletingId === user.id ? (
                                                    <Spinner />
                                                ) : (
                                                    <img
                                                        src={TrashIcon}
                                                        alt="delete"
                                                        className="w-4 h-4 cursor-pointer"
                                                        onClick={() => handleDeleteClick(user.id)}
                                                    />
                                                )}
                                                <img
                                                    src={EditIcon}
                                                    alt="edit"
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => handleEditClick(user)}
                                                />
                                                <img
                                                    src={EyeIcon}
                                                    alt="view"
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => handleViewClick(user)}
                                                />
                                            </div>
                                        )}
                                    </td>

                                    {/* Desktop Cells */}
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500">
                                        {user.email || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3 text-gray-500 capitalize">
                                        {user.role || "N/A"}
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => handleStatusClick(user.id)}
                                                className={`w-30 h-8 text-xs rounded-xl ${user.is_active ? "bg-[#68BB5FCC]" : "bg-[#EF5350CC]"}`}
                                                disabled={updateLoading && updatingId === user.id}
                                            >
                                                {updateLoading && updatingId === user.id ? (
                                                    <Spinner className="mx-auto text-white w-4 h-4" />
                                                ) : (
                                                    <h1 className='px-5 py-1 text-xs rounded-md text-white'>
                                                        {user.is_active ? "Active" : "Inactive"}
                                                    </h1>
                                                )}
                                            </button>
                                            {activeStatusId === user.id && (
                                                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                                                    <button
                                                        onClick={() => handleStatusUpdate(user.id, !user.is_active)}
                                                        className="w-full px-4 py-2 text-xs text-left hover:bg-gray-50 text-gray-700"
                                                    >
                                                        {user.is_active ? "Inactive" : "Active"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="hidden lg:table-cell px-4 py-3">
                                        <div className="flex gap-3 items-center">
                                            {deleteLoading && deletingId === user.id ? (
                                                <Spinner className="w-4 h-4" />
                                            ) : (
                                                <img
                                                    src={TrashIcon}
                                                    alt="delete"
                                                    className="w-4 h-4 cursor-pointer"
                                                    onClick={() => handleDeleteClick(user.id)}
                                                />
                                            )}
                                            <img
                                                src={EditIcon}
                                                alt="edit"
                                                className="w-4 h-4 cursor-pointer"
                                                onClick={() => handleEditClick(user)}
                                            />
                                            <img
                                                src={EyeIcon}
                                                alt="view"
                                                className="w-4 h-4 cursor-pointer"
                                                onClick={() => handleViewClick(user)}
                                            />
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

export default memo(UserManagmentTable);
