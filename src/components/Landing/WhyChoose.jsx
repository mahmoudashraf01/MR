import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBolt } from "react-icons/fa";
import Verify from '../../assets/verifyVector.svg';
import VerifyGreen from '../../assets/verifyVectorGreen.svg';
import Equipment from '../../assets/equipment.svg';

const WhyChoose = () => {
    const { t } = useTranslation('landing');
    return (
        <div className="w-full py-20 px-6 bg-equipmentBg flex flex-col items-center text-center">
            {/* Title */}
            <div className="mb-12 max-w-3xl">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">{t('why_choose.title')}</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    {t('why_choose.subtitle')}
                </p>
            </div>

            {/* Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
                {/* Card 1 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center w-full border border-gray-100">
                    <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center text-2xl mb-4">
                        <img src={Verify} alt="" className="w-7 h-7" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 mb-3">{t('why_choose.card1_title')}</h3>
                    <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                        {t('why_choose.card1_desc')}
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center w-full border border-gray-100">
                    <div className="w-14 h-14 rounded-xl bg-[#F6C90E33] flex items-center justify-center text-2xl mb-4">
                        <FaBolt className="text-secondary" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 mb-3">{t('why_choose.card2_title')}</h3>
                    <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                        {t('why_choose.card2_desc')}
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center w-full border border-gray-100">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-2xl mb-4">
                        <img src={Equipment} alt="" className="w-7 h-7" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 mb-3">{t('why_choose.card3_title')}</h3>
                    <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                        {t('why_choose.card3_desc')}
                    </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center w-full border border-gray-100">
                    <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-2xl mb-4">
                        <img src={VerifyGreen} alt="" className="w-7 h-7" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 mb-3">{t('why_choose.card4_title')}</h3>
                    <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
                        {t('why_choose.card4_desc')}
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="w-full max-w-5xl mt-20 grid grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold text-primaryBtn mb-2">1000+</h3>
                    <p className="text-gray-700 text-base">{t('why_choose.stats_machines')}</p>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold text-primaryBtn mb-2">500+</h3>
                    <p className="text-gray-700 text-base">{t('why_choose.stats_suppliers')}</p>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold text-primaryBtn mb-2">50K+</h3>
                    <p className="text-gray-700 text-base">{t('why_choose.stats_rentals')}</p>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold text-primaryBtn mb-2">24/7</h3>
                    <p className="text-gray-700 text-base">{t('why_choose.stats_support')}</p>
                </div>
            </div>
        </div>
    );
};

export default memo(WhyChoose);