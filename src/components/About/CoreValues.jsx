import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaShieldAlt, FaBolt, FaThLarge, FaHeadset } from "react-icons/fa";
import Verify from '../../assets/verifyVector.svg';
import Support from '../../assets/supportVector.svg';
import Transperancy from '../../assets/transperancyVector.svg';
import Efficiency from '../../assets/efficencyVector.svg';


const CoreValues = () => {
    const { t } = useTranslation('about');
    return (
        <div className="w-full py-16 px-6 bg-gray-50 flex flex-col items-center text-center">
            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900">{t('core_values.title')}</h2>
            <p className="text-gray-600 mt-2 max-w-2xl leading-relaxed">
                {t('core_values.subtitle')}
            </p>


            {/* Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-xl border-t border-primaryBtn shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                        <img src={Verify} alt="" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('core_values.ease_title')}</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('core_values.ease_description')}
                    </p>
                </div>


                {/* Card 2 */}
                <div className="bg-white p-6 rounded-xl border-t border-yellow-500 shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-500 flex items-center justify-center text-2xl">
                        <FaBolt />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('core_values.trust_title')}</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('core_values.trust_description')}
                    </p>
                </div>


                {/* Card 3 */}
                <div className="bg-white p-6 rounded-xl border-t border-[#1B9C85] shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                         <img src={Transperancy} alt="" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('core_values.transparency_title')}</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('core_values.transparency_description')}
                    </p>
                </div>


                {/* Card 4 */}
                <div className="bg-white p-6 rounded-xl border-t border-[#1B9C85] shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-2xl">
                         <img src={Efficiency} alt="" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('core_values.reliable_support_title')}</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('core_values.reliable_support_description')}
                    </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white p-6 rounded-xl border-t border-primaryBtn shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">
                         <img src={Verify} alt="" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('core_values.variety_title')}</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('core_values.variety_description')}
                    </p>
                </div>
                {/* Card 6 */}
                <div className="bg-white p-6 rounded-xl border-t border-yellow-500 shadow-sm flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-lg bg-[#F6C90E40] flex items-center justify-center text-2xl">
                        <img src={Support} alt="" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">{t('core_values.support_title')}</h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                        {t('core_values.support_description')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default memo(CoreValues);