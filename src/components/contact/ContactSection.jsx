import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Phone from '../../assets/phone.svg';
import Email from '../../assets/email.svg';
import WorkingHours from '../../assets/Group.svg';

const ContactSection = () => {
    const { t } = useTranslation('contact');
    return (
        <div className="w-full bg-equipmentBg py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT CARD - CONTACT SUPPORT FORM */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {t('contact_section.support_title')}
                    </h2>

                    <p className="text-gray-600 text-base mb-8 leading-relaxed">
                        {t('contact_section.support_subtitle')}
                    </p>

                    {/* FORM */}
                    <div className="flex flex-col gap-5">

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">{t('contact_section.full_name')}</label>
                            <input
                                type="text"
                                placeholder={t('contact_section.full_name_placeholder')}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">{t('contact_section.email')}</label>
                            <input
                                type="text"
                                placeholder={t('contact_section.email_placeholder')}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">
                                {t('contact_section.company')} <span className="text-gray-400 font-normal">{t('contact_section.company_optional')}</span>
                            </label>
                            <input
                                type="text"
                                placeholder={t('contact_section.company_placeholder')}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-800 mb-2 block">{t('contact_section.message')}</label>
                            <textarea
                                rows={4}
                                placeholder={t('contact_section.message_placeholder')}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primaryBtn focus:border-primaryBtn transition-all text-sm resize-none"
                            />
                        </div>

                        <button className="bg-primaryBtn text-white py-3 rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg font-medium mt-2">
                            {t('contact_section.send_button')}
                        </button>
                    </div>
                </div>

                {/* RIGHT CARD - CONTACT INFO */}
                <div className="bg-white p-8 rounded-2xl shadow-lg h-fit border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t('contact_section.info_title')}
                    </h2>

                    {/* Phone */}
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                        <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center shrink-0">
                            <img src={Phone} alt="phone" className='w-7 h-7' />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{t('contact_section.phone_support')}</h3>
                            <p className="text-gray-600 text-sm">+00000000000000000</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 py-6 border-b border-gray-200">
                        <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center shrink-0">
                            <img src={Email} alt="email" className='w-7 h-7' />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{t('contact_section.email_support')}</h3>
                            <p className="text-primaryBtn text-sm font-medium">support@machinerentals.com</p>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4 pt-6">
                        <div className="w-14 h-14 rounded-xl bg-[#1F6FEB1C] flex items-center justify-center shrink-0">
                            <img src={WorkingHours} alt="working hours" className='w-7 h-7' />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{t('contact_section.working_hours')}</h3>
                            <p className="text-gray-600 text-sm">{t('contact_section.working_hours_value')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default memo(ContactSection);