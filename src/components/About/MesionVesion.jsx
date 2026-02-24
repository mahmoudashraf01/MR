import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye } from "react-icons/fa";
import groupVector from '../../assets/groupVector.svg';

const MesionVesion = () => {
    const { t } = useTranslation('about');
    return (
        <div className="w-full flex flex-col lg:flex-row gap-6 items-center justify-center p-6">

            {/* Mission Card */}
            <div className="w-full lg:flex md:flex gap-4 lg:w-1/2 bg-white rounded-2xl shadow-md p-6 shadow-gray-400 ">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center mb-4">
                    <img src={groupVector} alt="" className='w-6 h-6' />
                </div>

                <div className=''>
                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('mission_vision.mission_title')}</h2>

                    {/* Subtitle */}
                    <p className="text-gray-600 mb-4">
                        {t('mission_vision.mission_subtitle')}
                    </p>

                    <hr className="my-4 text-[#2E3A4533]" />

                    <p className="text-[#2E3A4599] text-sm">
                        {t('mission_vision.mission_description')}
                    </p>
                </div>
            </div>

            {/* Vision Card */}
            <div className="w-full lg:flex md:flex  gap-4 lg:w-1/2 bg-white rounded-2xl shadow-md p-6 shadow-gray-400">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                    <FaEye className="text-white text-xl" />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('mission_vision.vision_title')}</h2>

                    <p className="text-gray-600 mb-4">
                        {t('mission_vision.vision_subtitle')}
                    </p>

                    <hr className="my-4 text-[#2E3A4533]" />

                    <p className="text-[#2E3A4599] text-sm">
                        {t('mission_vision.vision_description')}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default memo(MesionVesion);