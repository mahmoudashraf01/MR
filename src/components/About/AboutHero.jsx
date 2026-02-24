import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import HeavyMachine2 from '../../assets/machine7.jpeg'
const AboutHero = () => {
    const { t } = useTranslation('about');
    return (<div className="relative h-[500px] w-full flex flex-col items-center justify-center overflow-hidden">
        <img
            src={HeavyMachine2}
            alt="hero"
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A2540B2]/70"></div>
        <div className='flex flex-col justify-center items-center relative px-4'>
            <div className='text-center flex flex-col justify-center items-center relative text-primary text-[50px] font-bold drop-shadow-2xl max-sm:text-3xl my-8 leading-tight space-y-2'>
                <h1 className='tracking-tight'>
                    {t('about_hero.title_part1')}
                </h1>
                <h1 className='text-secondary tracking-tight'>{t('about_hero.title_part2')}</h1>
            </div>
            <div className='w-full max-w-3xl flex justify-center items-center px-4 mt-4'>
                <p className='text-center text-primary text-base md:text-[20px] leading-relaxed font-normal'>{t('about_hero.subtitle')}</p>
            </div>
            <div className='flex flex-wrap justify-center gap-4 my-8'>
                <button className='bg-primaryBtn px-6 py-3 md:w-[260px] sm:w-auto md:h-[46px] rounded-lg text-primary font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90'>
                    {t('about_hero.find_equipment_button')}
                </button>
                <button className='bg-secondary px-6 py-3 md:w-[260px] sm:w-auto md:h-[46px] rounded-lg text-gray-900 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:opacity-90'>
                    {t('about_hero.list_machines_button')}
                </button>
            </div>
        </div>
    </div>
    );
};

export default memo(AboutHero);