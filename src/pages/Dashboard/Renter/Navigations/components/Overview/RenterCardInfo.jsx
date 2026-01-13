import { memo } from 'react';

const CardInfo = ({
    cardColor,
    cardBorder,
    cardTitle,
    conentNumber,
    contentIcon,
}) => {
    return (
        <div className={`flex h-40 flex-col justify-center gap-4 border border-[${cardBorder}] rounded-2xl p-4 bg-[${cardColor}]`}>
            <h1>{cardTitle}</h1>
            <div className='flex justify-between items-center'>
                <h1>{conentNumber}</h1>
                <img src={contentIcon} alt="" />
            </div>
        </div>
    );
};

export default memo(CardInfo);