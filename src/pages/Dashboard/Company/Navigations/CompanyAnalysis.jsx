import { memo } from 'react';
import CardInfo from '../../Components/CardInfo';
import ActiveBookingsIcon from '../../../../assets/activeBookinsIcon.svg';
import greendDollarIcon from '../../../../assets/greenDollarIcon.svg';
import yellowDollarIcon from '../../../../assets/yellowDoollarIcon.svg';
import blueDollarIcon from '../../../../assets/blueDollarIcon.svg';
import IncreaseArrow from '../../../../assets/increaseArrow.svg';
import DecreaseArrow from '../../../../assets/decreaseArrow.svg';
import DropDownArrow from '../../../../assets/minusArrow.svg';
import FilterIcon from '../../../../assets/filterIcon.svg';
import CompanyCardInfo from './Components/OverView/CompanyCardInfo';
import AdminMonthlyRevenue from '../../Admin/Components/Overview/AdminMonthlyRevenue';
import MonthlyRevenueChart from './Components/OverView/MonthlyRevenueChart';
import CategoryUtaliztionChart from './Components/Analitics/CategoryUtaliztionChart';
import ProgressBar from './Components/OverView/ProgressBar';

const selectBase =
    "w-full border rounded-md px-4 py-2 text-sm focus:outline-none appearance-none text-[#9CA3AF] border-[#D2D2D2] bg-white";


const CompanyAnalysis = () => {
    return (
        <div className="flex flex-col gap-5 p-6 bg-white min-h-screen rounded-[40px]  border border-[#B2B2B2]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className='flex flex-col justify-center lg:items-start items-center'>
                    <h1 className="text-2xl font-semibold">Revenue</h1>
                    <p className="text-gray-500 text-center text-sm">
                        Complete financial overview
                    </p>
                </div>
            </div>

            {/*Cards Review*/}
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 pb-10'>

                {/* Total Revenue */}
                <CompanyCardInfo
                    cardTitle={'Total Revenue'}
                    conentNumber={'$695K'}
                    contentIcon={greendDollarIcon}
                    footerIcon={IncreaseArrow}
                    footerNumber={'+12'}
                    footerNumColor={'#22C55E'}
                    footerConent={'last month'}
                />

                {/* This Month */}
                <CompanyCardInfo
                    cardTitle={'This Month'}
                    conentNumber={'$332K'}
                    contentIcon={blueDollarIcon}
                    footerIcon={IncreaseArrow}
                    footerNumber={'+12'}
                    footerNumColor={'#22C55E'}
                    footerConent={'last month'}
                />

                {/* Revenue Growth */}
                <CompanyCardInfo
                    cardTitle={'Revenue Growth'}
                    conentNumber={'6.5%'}
                    contentIcon={yellowDollarIcon}
                    footerIcon={DecreaseArrow}
                    footerNumber={'-12'}
                    footerNumColor={'#EF5350'}
                    footerConent={'last month'}
                />

                {/* Average booking */}
                <CompanyCardInfo
                    cardTitle={'Average booking'}
                    conentNumber={'0.25'}
                    contentIcon={ActiveBookingsIcon}
                    footerIcon={IncreaseArrow}
                    footerNumber={'+12'}
                    footerNumColor={'#22C55E'}
                    footerConent={'last month'}
                />

            </div>

            {/* Filters Bar */}
            <div className='w-full bg-primary border border-[#D2D2D2] rounded-2xl'>
                <div className='grid lg:grid-cols-[0.2fr_1fr_1fr_1fr] grid-cols-1 gap-5 p-5'>
                    <div className='flex justify-start items-center gap-2'>
                        <img src={FilterIcon} alt="" />
                        <h1>Filters</h1>
                    </div>
                    <div className="relative w-full flex ">
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
                <MonthlyRevenueChart />
                <CategoryUtaliztionChart />
            </div>

            <div className='flex flex-col gap-4 border border-[#3A86FF26] p-5 rounded-2xl'>
                <div className='flex flex-col gap-2 border-b border-[#E5E5EF]'>
                    <h1 className='text-[20px] font-semibold'>Top Revenue by Machine</h1>
                    <p className="text-[12px] text-gray-500">Revenue trend over time</p>
                </div>
                <div className='flex gap-2'>
                    <h1 className='text-[12px] text-[#615E8399]'>Forklifts</h1>
                    <ProgressBar progressIndecator={20} />
                    <h1 className='text-[12px] text-[#615E8399]'>12</h1>
                </div>
                <div className='flex gap-2'>
                    <h1 className='text-[12px] text-[#615E8399]'>Loaders</h1>
                    <ProgressBar progressIndecator={30} />
                    <h1 className='text-[12px] text-[#615E8399]'>15</h1>
                </div>
                <div className='flex gap-2'>
                    <h1 className='text-[12px] text-[#615E8399]'>Cranes</h1>
                    <ProgressBar progressIndecator={10} />
                    <h1 className='text-[12px] text-[#615E8399]'>10</h1>
                </div>
                <div className='flex gap-2'>
                    <h1 className='text-[12px] text-[#615E8399]'>Excavators</h1>
                    <ProgressBar progressIndecator={40} />
                    <h1 className='text-[12px] text-[#615E8399]'>30</h1>
                </div>
            </div>
        </div>
    );
};

export default memo(CompanyAnalysis);