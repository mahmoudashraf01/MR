import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import SearchContainer from './SearchContainer';
import HeavyMachine2 from '../../assets/machine6.jpeg'

const Hero = () => {
    const { t } = useTranslation('landing');

    return (
        <div className="relative lg:h-[800px] h-[1000px] max-xs:h-[1200px] w-full flex items-center justify-center overflow-hidden">
            <img
                src={HeavyMachine2}
                alt="hero"
                className="absolute top-0 left-0 w-full h-full object-cover object-center scale-105 animate-[zoom_20s_ease-in-out_infinite]"
            />

            <div className="absolute inset-0 bg-[#0A25408C]/90"></div>
            <div className='flex flex-col justify-center items-center relative gap-6 px-4 z-10'>
                <div className='text-center leading-tight flex flex-col justify-center items-center relative text-primary text-[50px] max-md:text-[30px] font-bold drop-shadow-2xl max-sm:text-2xl my-8 space-y-2 animate-[fadeInUp_0.8s_ease-out]'>
                    <h1 className='tracking-tight'>
                        {t('hero.title_part1')} <span className='text-secondary animate-[pulse_3s_ease-in-out_infinite]'>{t('hero.title_highlight')}</span>
                    </h1>
                    <h1 className='text-secondary tracking-tight'>{t('hero.title_part2')}</h1>
                </div>
                <div className='w-full max-w-3xl flex justify-center items-center px-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]'>
                    <p className='text-center text-primary text-base sm:text-lg md:text-[20px] leading-relaxed font-normal'>
                        {t('hero.subtitle')}
                    </p>
                </div>
                <div className='w-full max-w-6xl px-4 animate-[fadeInUp_0.8s_ease-out_0.4s_both]'>
                    <SearchContainer />
                </div>
                <div className='flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-4 animate-[fadeInUp_0.8s_ease-out_0.6s_both]'>
                    <div className='flex justify-center items-center gap-2.5 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-default group'>
                        <div className='w-2.5 h-2.5 bg-secondary rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300'></div>
                        <p className='text-primary md:text-xl max-sm:text-sm font-medium'>{t('hero.stats_machines')}</p>
                    </div>
                    <div className='flex justify-center items-center gap-2.5 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-default group'>
                        <div className='w-2.5 h-2.5 bg-secondary rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300'></div>
                        <p className='text-primary md:text-xl max-sm:text-sm font-medium'>{t('hero.stats_suppliers')}</p>
                    </div>
                    <div className='flex justify-center items-center gap-2.5 px-5 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-default group'>
                        <div className='w-2.5 h-2.5 bg-secondary rounded-full shadow-sm group-hover:scale-125 transition-transform duration-300'></div>
                        <p className='text-primary md:text-xl max-sm:text-sm font-medium'>{t('hero.stats_support')}</p>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes zoom {
                    0%, 100% { transform: scale(1.05); }
                    50% { transform: scale(1.1); }
                }
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default memo(Hero);
