import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../../../slices/Auth/UpdateProfile';
import defaultProfile from '../../../../../../assets/contact.jpeg';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../../../../components/ui/dialog';

const UpdateCompanyDialog = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.updateProfile || {});
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    contact_person: '',
    tax_id: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalcode: '',
    house_number: '',
    region: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        company_name: user.company?.company_name || '',
        contact_person: user.company?.contact_person || '',
        tax_id: user.company?.tax_id || '',
        phone: user.company?.phone || '',
        email: user.email || '',
        address: user.company?.address || '',
        city: user.company?.city || '',
        postalcode: user.company?.postalcode || '',
        house_number: user.company?.house_number || '',
        region: user.company?.region || '',
      });
      setImagePreview(user.company?.image || defaultProfile);
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (!loading && (success || error)) {
      onClose();
    }
  }, [loading, success, error, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (selectedImage) {
      data.append('image', selectedImage);
    }
    dispatch(updateProfile(data));
  };

  const isDirty = () => {
    if (selectedImage) return true;
    if (!user) return false;

    return (
      formData.first_name !== (user.first_name || '') ||
      formData.last_name !== (user.last_name || '') ||
      formData.company_name !== (user.company?.company_name || '') ||
      formData.contact_person !== (user.company?.contact_person || '') ||
      formData.tax_id !== (user.company?.tax_id || '') ||
      formData.phone !== (user.company?.phone || '') ||
      formData.email !== (user.email || '') ||
      formData.address !== (user.company?.address || '') ||
      formData.city !== (user.company?.city || '') ||
      formData.postalcode !== (user.company?.postalcode || '') ||
      formData.house_number !== (user.company?.house_number || '') ||
      formData.region !== (user.company?.region || '')
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white md:max-w-3xl max-h-[90vh] flex flex-col p-8 rounded-[40px] overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Update Company Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center mb-8 shrink-0">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 relative">
            <img
              src={imagePreview}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-primaryBtn font-medium hover:underline"
          >
            Update Image
          </button>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full overflow-y-auto px-2 grow">
          <div>
            <label className="block text-sm text-gray-600 mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Contact Person</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">House Number</label>
            <input
              type="text"
              name="house_number"
              value={formData.house_number}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Region</label>
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Tax ID</label>
            <input
              type="text"
              name="tax_id"
              value={formData.tax_id}
              onChange={handleChange}
              className="w-full border focus:outline-primaryBtn border-[#D2D2D2] rounded-md px-4 py-2 bg-white"
            />
          </div>
        </div>

        <DialogFooter className="mt-8 grid grid-cols-2 md:px-20 justify-between items-center gap-4 shrink-0">
          <button
            type="button"
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer flex items-center justify-center"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-6 py-2 bg-primaryBtn text-white rounded-md transition cursor-pointer flex items-center justify-center gap-2 ${
              (!isDirty() || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primaryBtn/90'
            }`}
            onClick={handleUpdate}
            disabled={!isDirty() || loading}
          >
            {loading ? 'Updating Profile...' : 'Update Profile'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCompanyDialog;
