import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUsers } from "react-icons/fi";
import { PiBasketballBold } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import Excavator from '../../assets/excavator.svg';


const Impact = () => {
    const { t } = useTranslation('about');
    return (
        <div className="w-full py-16 px-6 bg-gray-50 flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900">{t('impact.title')}</h2>
            <p className="text-gray-600 mt-2 max-w-2xl leading-relaxed">
                {t('impact.subtitle')}
            </p>

            {/* Cards */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                        <img src={Excavator} alt="" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-primaryBtn">1000+</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('impact.machines_available')}
                    </p>
                </div>


                {/* Card 2 */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-500 flex items-center justify-center text-2xl">
                        <FiUsers />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-yellow-500">500+</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('impact.verified_companies')}
                    </p>
                </div>


                {/* Card 3 */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-[#1B9C8540] text-[#1B9C85] flex items-center justify-center text-2xl">
                        <PiBasketballBold />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#1B9C85]">30+</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('impact.serving_regions')}
                    </p>
                </div>


                {/* Card 4 */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg  bg-[#F5AE2940] text-[#F5AE29] flex items-center justify-center text-2xl">
                        <CiStar />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#F5AE29]">R4.8/5</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('impact.average_rating')}
                    </p>
                </div>
            </div>
            <div className='py-10 text-[#2E3A4599] leading-relaxed '>
                <p>{t('impact.join_message')}</p>
            </div>
        </div>
    );
};

export default memo(Impact);