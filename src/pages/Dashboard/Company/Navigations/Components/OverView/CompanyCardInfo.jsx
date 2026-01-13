import { memo } from 'react';

const CompanyCardInfo = ({
    cardTitle,
    conentNumber,
    contentIcon,
    footerIcon,
    footerConent,
    footerNumber,
    footerNumColor,
}) => {
    return (
        <div className={`flex flex-col gap-4 border border-[#D2D2D2] rounded-2xl p-4 bg-white shadow-md hover:shadow-lg`}>
            <h1>{cardTitle}</h1>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold'>{conentNumber}</h1>
                <img src={contentIcon} alt="" />
            </div>
            <div className='flex'>
                <img src={footerIcon}
                    alt="IncreaseArrow"
                    className='w-3'
                />
                <span className={`text-[12px] text-[${footerNumColor}]`}>{footerNumber}%</span>
                <h1 className={`text-[12px] text-[#0A254099]`}>
                    {footerConent}
                </h1>
            </div>
        </div>
    );
};

export default memo(CompanyCardInfo);