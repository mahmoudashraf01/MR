import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TechnicalSpecifications from './TechnicalSpecifications';
import MachineMoreImages from './MachineMoreImages';

const Machineinfo = () => {
    const { data: machine } = useSelector((state) => state.machineBokkingDetails);
    const [activeTab, setActiveTab] = useState("specs");
    const [animating, setAnimating] = useState(false);

    const hasImages = machine?.images && machine.images.length > 0;

    useEffect(() => {
        if (!hasImages && activeTab === "photos") {
            setActiveTab("specs");
        }
    }, [hasImages, activeTab]);

    const handleTabChange = (tab) => {
        if (tab === activeTab) return;

        setAnimating(true);

        setTimeout(() => {
            setActiveTab(tab);
            setAnimating(false);
        }, 600);
    };

    return (
        <div className='w-full flex flex-col rounded-md shadow-2xl bg-white p-4 md:p-8'>

            {/* Tabs */}
            <div className='flex gap-5 max-sm:justify-between  pb-3'>
                <button
                    onClick={() => handleTabChange("specs")}
                    className={`text-base  font-medium pb-2 ${activeTab === "specs"
                        ? "text-navColor border-b-2 transition-colors duration-150 border-secondary"
                        : "text-[#0A254066] hover:text-navColor"
                        }`}
                >
                    Specifications
                </button>

                {hasImages && (
                    <button
                        onClick={() => handleTabChange("photos")}
                        className={`text-base font-medium pb-2 ${activeTab === "photos"
                            ? "text-navColor border-b-2 transition-colors duration-150 border-secondary"
                            : "text-[#0A254066] hover:text-navColor"
                            }`}
                    >
                        Photos/Gallery
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="relative overflow-hidden mt-5">

                <div className={
                    `
        ${animating ? "slide-exit-active" : "slide-enter-active"}
        `
                }>
                    {activeTab === "specs" && <TechnicalSpecifications />}
                    {activeTab === "photos" && hasImages && <MachineMoreImages />}
                </div>

            </div>
        </div>
    );
};

export default memo(Machineinfo);
