import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TbBrandFacebook } from 'react-icons/tb';
import { FaInstagram } from 'react-icons/fa';
import { TbBrandLinkedin } from 'react-icons/tb';
import Logo from '../assets/logo2.svg';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation('landing');
    return (
        <div className='flex justify-center items-center flex-col w-full bg-navColor px-6 md:px-10 py-12'>
            <div className='border-b-2 border-primaryBtn py-8 w-full max-w-7xl'>
                <div className='grid gap-8 lg:grid-cols-[1fr_1.5fr] w-full'>
                    <div className='flex flex-col gap-5 lg:items-start items-center'>
                        <div className='flex items-center gap-2.5'>
                            <NavLink to='/' className='hover:opacity-80 transition-opacity'>
                                <img src={Logo} alt="Logo" className='h-10' />
                            </NavLink>
                        </div>
                        <p className='text-[16px] lg:text-start leading-relaxed text-center font-normal text-[#FFFFFFCC] max-w-md'>{t('footer.description')}</p>
                    </div>
                    <div className='flex w-full lg:justify-center justify-between gap-12 md:gap-20'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary text-[18px] font-semibold mb-1'>{t('footer.quick_links')}</h1>
                            <NavLink to='/' className='text-[16px] text-gray-400 hover:text-secondary transition-colors'>{t('footer.home')}</NavLink>
                            <NavLink to='/about' className='text-[16px] text-gray-400 hover:text-secondary transition-colors'>{t('footer.about')}</NavLink>
                            <NavLink to='/contact' className='text-[16px] text-gray-400 hover:text-secondary transition-colors'>{t('footer.contact_us')}</NavLink>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>{t('footer.help_center')}</p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-primary text-[18px] font-semibold mb-1'>{t('footer.machines')}</h1>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>{t('footer.excavators')}</p>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>{t('footer.cranes')}</p>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>{t('footer.bulldozers')}</p>
                            <p className='text-[16px] text-gray-400 hover:text-secondary transition-colors cursor-pointer'>{t('footer.loaders')}</p>
                        </div>
                        <div className='flex justify-center'>
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-[18px] text-primary font-semibold mb-1'>{t('footer.follow_us')}</h1>
                                <div className='grid grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 items-center gap-2.5'>
                                    <a href='#' className='flex justify-center items-center text-primary bg-primaryBtn w-[50px] h-[50px] rounded-full hover:bg-primaryBtn/80 transition-all duration-200 shadow-md hover:shadow-lg'>
                                        <TbBrandFacebook className='text-xl' />
                                    </a>
                                    <a href='#' className='flex justify-center items-center text-primary bg-primaryBtn w-[50px] h-[50px] rounded-full hover:bg-primaryBtn/80 transition-all duration-200 shadow-md hover:shadow-lg'>
                                        <FaInstagram className='text-xl' />
                                    </a>
                                    <a href='#' className='flex justify-center items-center text-primary bg-primaryBtn w-[50px] h-[50px] rounded-full hover:bg-primaryBtn/80 transition-all duration-200 shadow-md hover:shadow-lg'>
                                        <TbBrandLinkedin className='text-xl' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid gap-4 lg:grid-cols-[3.2fr_1.1fr] my-6 w-full max-w-7xl'>
                <p className='text-gray-400 text-sm text-center lg:text-left'>{t('footer.rights')}</p>
                <div className='flex justify-center lg:justify-end items-center gap-4 flex-wrap'>
                    <p className='text-gray-400 text-sm hover:text-secondary transition-colors cursor-pointer'>{t('footer.privacy_policy')}</p>
                    <p className='text-gray-400 text-sm hover:text-secondary transition-colors cursor-pointer'>{t('footer.terms_of_service')}</p>
                    <p className='text-gray-400 text-sm hover:text-secondary transition-colors cursor-pointer'>{t('footer.cookie_policy')}</p>
                </div>
            </div>
        </div>
    );
};

export default memo(Footer);
