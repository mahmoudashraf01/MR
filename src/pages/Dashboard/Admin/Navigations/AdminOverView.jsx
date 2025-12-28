import { memo } from 'react';
import ActiveBookingsIcon from '../../../../assets/activeBookinsIcon.svg';
import VerifiedCompaniesIcon from '../../../../assets/verifiedCompaniesIcon.svg';
import UnderMaintanceIcon from '../../../../assets/underMaintanceIcon.svg';
import AddMachineIcon from '../../../../assets/addMachineIcon.svg';
import ViewBookingsIcon from '../../../../assets/viewBookingsIcon.svg';
import TotalCompaniesIcon from '../../../../assets/totalCompaniesIcon.svg';
import TotalMachinesIcon from '../../../../assets/totalMachinesIcon.svg';
import ManageIcon from '../../../../assets/manageIcon.svg';
import IncreaseArrow from '../../../../assets/increaseArrow.svg';
import DecreaseArrow from '../../../../assets/decreaseArrow.svg';
import DropDownArrow from '../../../../assets/minusArrow.svg';
import AdminMonthlyRevenue from '../Components/Overview/AdminMonthlyRevenue';
import AdminMachineUtilization from '../Components/Overview/AdminMachineUtilization';
import AdminProgressBar from '../Components/Overview/AdminProgressBar';
import CardInfo from '../../Components/CardInfo';
import CompaniesApproval from '../Components/Overview/CompaniesApproval';


const labelBase = "block text-sm font-medium text-navColor mb-1";

const selectBase =
  "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";



const AdminOverView = () => {
  return (
    <div className="flex flex-col gap-10 p-6 bg-white border border-[#B2B2B2] rounded-[40px]  min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of platform performance and recent activities
        </p>
      </div>

      {/*Cards Review*/}
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4'>

        <CardInfo
          cardColor={'#F6C90E1A'}
          cardBorder={'#F6C90E33'}
          cardTitle={'Total Companies'}
          conentNumber={'10'}
          contentIcon={TotalCompaniesIcon}
          footerIcon={IncreaseArrow}
          footerNumber={'+12'}
          footerNumColor={'#22C55E'}
          footerConent={'last month'}
        />

        <CardInfo
          cardColor={'#3A86FF33'}
          cardBorder={'#22C55E33'}
          cardTitle={'Verified Companies'}
          conentNumber={'8'}
          contentIcon={VerifiedCompaniesIcon}
          footerIcon={IncreaseArrow}
          footerNumber={'+12'}
          footerNumColor={'#22C55E'}
          footerConent={'last month'}
        />

        <CardInfo
          cardColor={'#22C55E1A'}
          cardBorder={'#22C55E33'}
          cardTitle={'Active Bookings'}
          conentNumber={'10'}
          contentIcon={ActiveBookingsIcon}
          footerIcon={IncreaseArrow}
          footerNumber={'+12'}
          footerNumColor={'#22C55E'}
          footerConent={'last month'}
        />

        <CardInfo
          cardColor={'#EDEEFC'}
          cardBorder={'#8A38F533'}
          cardTitle={'Total MAchines'}
          conentNumber={'1'}
          contentIcon={TotalMachinesIcon}
          footerIcon={DecreaseArrow}
          footerNumber={'-12'}
          footerNumColor={'#EF5350'}
          footerConent={'last month'}
        />

      </div>

      {/* Filters Bar */}
      <div className='w-full bg-primary border border-[#D2D2D2] rounded-2xl'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 p-5'>
          <div className="relative w-full">
            <select className={selectBase}>
              <option>Today</option>
            </select>
            <img
              src={DropDownArrow}
              alt="arrow"
              className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
            />
          </div>

          <div className="relative w-full">
            <select className={selectBase}>
              <option>This Weak</option>
            </select>
            <img
              src={DropDownArrow}
              alt="arrow"
              className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
            />
          </div>

          <div className="relative w-full">
            <select className={selectBase}>
              <option>This Month</option>
            </select>
            <img
              src={DropDownArrow}
              alt="arrow"
              className="absolute right-3 top-3 w-4 h-4 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className='grid xl:grid-cols-2 grid-cols-1 gap-5'>
        <AdminMonthlyRevenue />
        <AdminMachineUtilization />
      </div>

      <CompaniesApproval />
    </div>
  );
};

export default memo(AdminOverView);