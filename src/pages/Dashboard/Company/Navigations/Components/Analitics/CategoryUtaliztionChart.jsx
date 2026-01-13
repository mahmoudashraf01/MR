import { memo, useState } from 'react';
"use client"

import { Pie, PieChart, Sector } from "recharts"

import CancelColorIcon from '../../../../../../assets/cancelColorIcon.svg'
import ActiveColorIcon from '../../../../../../assets/activeColorIcon.svg'
import InUseColorIcon from '../../../../../../assets/inUseColorIcon.svg'
import MaintanceColorIcon from '../../../../../../assets/maintanceColorIcon.svg'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartContainer,
    ChartTooltip,
} from '@/components/ui/chart'

export const description = "A pie chart with a label"

const chartData = [
    { machine: "loaders", Utilization: 275, fill: "var(--color-loaders)" },
    { machine: "cranes", Utilization: 204, fill: "var(--color-cranes)" },
    { machine: "other", Utilization: 187, fill: "var(--color-other)" },
    { machine: "excavators", Utilization: 173, fill: "var(--color-excavators)" },

]

const chartConfig = {
    MachineUtilization: {
        label: "Utilization",
    },
    loaders: {
        label: "Loaders",
        color: "#22C55E",
    },
    cranes: {
        label: "Cranes",
        color: "#146CF9",
    },
    other: {
        label: "Other",
        color: "#EF5350",
    },
    excavators: {
        label: "Excavators",
        color: "#F6C90E",
    },
}


const MachineUtaliztionChart = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const getIcon = (machineType) => {
        switch (machineType) {
            case 'loaders':
                return ActiveColorIcon;
            case 'other':
                return CancelColorIcon;
            case 'cranes':
                return InUseColorIcon;
            case 'excavators':
                return MaintanceColorIcon;
            default:
                return null;
        }
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const machineType = data.machine;
            const color = chartConfig[machineType]?.color || '#000000';
            return (
                <div
                    className="text-white min-w-40 px-3 py-1 rounded-md shadow-lg text-sm font-medium"
                    style={{ backgroundColor: hexToRgba(color, 0.5) }}
                >
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-2'>
                            <img
                                src={getIcon(machineType)}
                                alt=""
                                className='w-2'
                            />
                            <p className='text-navColor'>{`${chartConfig[machineType]?.label || machineType}`}</p>
                        </div>
                        <p className='text-navColor'>{`${data.Utilization}`}</p>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <Card className='grid md:grid-cols-2 grid-cols-1 overflow-hidden justify-center items-center'>
            <div className='flex flex-col justify-strart'>
                <CardHeader className="items-center pb-0">
                    <CardTitle>Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<CustomTooltip />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="Utilization"
                                nameKey="machine"
                                innerRadius={60}
                                strokeWidth={5}
                                activeIndex={activeIndex}
                                onMouseEnter={(_, index) => setActiveIndex(index)}
                                activeShape={({
                                    outerRadius = 0,
                                    ...props
                                }) => (
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 15}
                                        stroke="#ffffff"
                                        strokeWidth={10}
                                    />
                                )}
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </div>

            <div className='flex flex-col justify-center gap-4 px-2'>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={CancelColorIcon} alt="" />
                        <h1 className='text-[14px]'>Other</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>187</h1>
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={ActiveColorIcon} alt="" />
                        <h1 className='text-[14px]'>Loaders</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>275</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={InUseColorIcon} alt="" />
                        <h1 className='text-[14px]'>Cranes</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>204</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={MaintanceColorIcon} alt="" />
                        <h1 className='text-[14px]'>Excavators</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>173</h1>
                </div>
            </div>
        </Card>
    );
};

export default memo(MachineUtaliztionChart);