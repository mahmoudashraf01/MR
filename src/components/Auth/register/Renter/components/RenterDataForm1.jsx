import { memo } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../../../../../assets/userIcon.svg';
import EmailIcon from '../../../../../assets/emailIcon.svg';
import phoneIcon from '../../../../../assets/phoneIcon.svg';
import LockIcon from '../../../../../assets/lockIcon.svg';

const RenterDataForm1 = () => {
  return (
    <div className="w-full animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your Basic Info
        </h2>
        <p className="text-gray-600">
          Please enter your personal details to set up your account.
        </p>
      </div>

      <form className="space-y-5">

        <div className="flex flex-col gap-2 font-medium">
          <h1>Full Name</h1>
          <div className="relative group">
            <img src={UserIcon} alt="userIcon" className='absolute left-4 top-1/2 -translate-y-1/2 transition-colors' />
            <input
              placeholder="Enter your name"
              className='w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <h1>Email Address</h1>
          <div className="relative group">
            <img src={EmailIcon} alt="userIcon" className='absolute left-4 top-1/2 -translate-y-1/2 transition-colors' />
            <input
              placeholder="Enter your email address"
              className='w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <h1>Phone Number</h1>
          <div className="relative group">
            <img src={phoneIcon} alt="userIcon" className='absolute left-4 top-1/2 -translate-y-1/2 transition-colors' />
            <input
              placeholder="Enter your phone number"
              className='w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <h1>Contact Person</h1>
          <div className="relative group">
            <img src={phoneIcon} alt="userIcon" className='absolute left-4 top-1/2 -translate-y-1/2 transition-colors' />
            <input
              placeholder="Enter your contact person"
              className='w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <h1>Passowrd</h1>
          <div className="relative group">
            <img src={LockIcon} alt="userIcon" className='absolute left-4 top-1/2 -translate-y-1/2 transition-colors' />
            <input
              placeholder="Enter your Passowrd number"
              className='w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 font-medium">
          <h1>Confirm Passowrd</h1>
          <div className="relative group">
            <img src={LockIcon} alt="userIcon" className='absolute left-4 top-1/2 -translate-y-1/2 transition-colors' />
            <input
              placeholder="Confirm your Passowrd number"
              className='w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition border-gray-200 focus:border-primaryBtn'
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-5">
          <button
            type="button"
            onClick={() => navigate('/companyForm1')}
            className="text-primaryBtn w-full underline hover:underline-offset-0 bg-white py-3.5 rounded-xl hover:bg-[#bad6ff] font-semibold"
          >
            Back
          </button>
          <Link to="/renterForm2" className="w-full">
            <button
              type="submit"
              className="w-full bg-primaryBtn text-white py-3.5 rounded-xl hover:opacity-90 transition shadow-lg"
            >
              Next
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default memo(RenterDataForm1);