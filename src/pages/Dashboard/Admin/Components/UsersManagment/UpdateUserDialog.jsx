import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatus, resetUpdateUser } from '../../../../../slices/UsersManagment/UpdateUser';
import { Spinner } from '../../../../../components/ui/spinner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const UpdateUserDialog = ({ user, open, onOpenChange }) => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector((state) => state.updateUser);

    // Form state
    const [formData, setFormData] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    useEffect(() => {
        if (user) {
            // Initial form data based on user role
            const initialData = {
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                role: user.role || 'renter',
            };

            if (user.role === 'company' && user.company) {
                Object.assign(initialData, {
                    company_name: user.company.company_name || '',
                    contact_person: user.company.contact_person || '',
                    phone: user.company.phone || '',
                    city: user.company.city || '',
                    region: user.company.region || '',
                    address: user.company.address || '',
                    postalcode: user.company.postalcode || '',
                    house_number: user.company.house_number || '',
                    tax_id: user.company.tax_id || '',
                    verified: user.company.verified ? true : false,
                });
            }
            setFormData(initialData);
        }
    }, [user]);

    useEffect(() => {
        if (success) {
            setShowSuccessAlert(true);
            setShowErrorAlert(false);
            onOpenChange(false);
        }
        if (error) {
            setShowErrorAlert(true);
            setShowSuccessAlert(false);
            onOpenChange(false);
        }
    }, [success, error, onOpenChange]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else if (name === 'verified') {
            // Special handling for verified select
            setFormData(prev => ({ ...prev, [name]: value === 'true' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        dispatch(updateUserStatus({ id: user.id, ...formData }));
    };

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
        dispatch(resetUpdateUser());
    };

    // Determine fields to show based on role (renter/admin vs company)
    const isCompany = formData.role === 'company';

    if (showSuccessAlert || showErrorAlert) {
        return (
            <Dialog open={true} onOpenChange={handleCloseAlert}>
                <DialogContent className="sm:max-w-sm bg-white p-6 rounded-lg shadow-xl text-center space-y-4 outline-none">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{showSuccessAlert ? 'Success' : 'Error'}</DialogTitle>
                    </DialogHeader>
                    <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full ${showSuccessAlert ? 'bg-primaryBtn/20' : 'bg-[#EF5350]/20'}`}>
                        {showSuccessAlert ? (
                            <svg className="w-6 h-6 text-primaryBtn " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        ) : (
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{showSuccessAlert ? 'Success!' : 'Error'}</h3>
                    <p className="text-sm text-gray-500">{showSuccessAlert ? 'User updated successfully.' : (error?.message || 'Failed to update user.')}</p>
                    <button
                        onClick={handleCloseAlert}
                        className={`w-full cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${showSuccessAlert ? 'bg-primaryBtn hover:bg-primaryBtn/90' : 'bg-[#EF5350] hover:bg-[#EF5350]/90'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
                    >
                        OK
                    </button>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white sm:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl p-0 gap-0 outline-none">
                <DialogHeader className="p-6 border-b border-gray-100 bg-white shrink-0">
                    <DialogTitle className="text-xl font-bold text-gray-800">Update User</DialogTitle>
                </DialogHeader>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* User Profile Section */}
                    <section>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">Profile Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role</label>
                                <select
                                    name="role"
                                    value={formData.role || 'renter'}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all bg-white"
                                >
                                    <option value="renter">Renter</option>
                                    <option value="company">Company</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Company Details Section - Only if role is company */}
                    {isCompany && (
                        <section>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">Company Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Contact Person</label>
                                    <input
                                        type="text"
                                        name="contact_person"
                                        value={formData.contact_person || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Tax ID</label>
                                    <input
                                        type="text"
                                        name="tax_id"
                                        value={formData.tax_id || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Region</label>
                                    <input
                                        type="text"
                                        name="region"
                                        value={formData.region || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalcode"
                                        value={formData.postalcode || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">House Number</label>
                                    <input
                                        type="text"
                                        name="house_number"
                                        value={formData.house_number || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Verification Status</label>
                                    <select
                                        name="verified"
                                        value={formData.verified?.toString()}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primaryBtn focus:ring-2 focus:ring-primaryBtn/20 outline-none transition-all bg-white"
                                    >
                                        <option value="true">Verified</option>
                                        <option value="false">Non-Verified</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Company Image</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primaryBtn/10 file:text-primaryBtn hover:file:bg-primaryBtn/20"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer */}
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
    );
};

export default UpdateUserDialog;