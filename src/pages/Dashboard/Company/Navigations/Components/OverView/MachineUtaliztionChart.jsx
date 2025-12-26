import { memo } from 'react';
"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart,Sector } from "recharts"

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
    ChartTooltipContent,
} from '@/components/ui/chart'

export const description = "A pie chart with a label"

const chartData = [
    { browser: "chrome", Utilization: 275, fill: "var(--color-chrome)" },
    { browser: "safari", Utilization: 204, fill: "var(--color-safari)" },
    { browser: "firefox", Utilization: 187, fill: "var(--color-firefox)" },
    { browser: "edge", Utilization: 173, fill: "var(--color-edge)" },

]

const chartConfig = {
    MachineUtilization: {
        label: "Utilization",
    },
    chrome: {
        label: "Chrome",
        color: "#22C55E",
    },
    safari: {
        label: "Safari",
        color: "#146CF9",
    },
    firefox: {
        label: "Firefox",
        color: "#EF5350",
    },
    edge: {
        label: "Edge",
        color: "#F6C90E",
    },
}


const MachineUtaliztionChart = () => {
    return (
        <Card className='grid md:grid-cols-2 grid-cols-1 overflow-hidden justify-center items-center'>
            <div className='flex flex-col justify-strart'>
                <CardHeader className="items-center pb-0">
                    <CardTitle>Pie Chart - Donut Active</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="Utilization"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                                activeIndex={0}
                                activeShape={({
                                    outerRadius = 0,
                                    ...props
                                }) => (
                                    <Sector {...props} outerRadius={outerRadius + 10} />
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
                        <h1 className='text-[14px]'>Canceld</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>187</h1>
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={ActiveColorIcon} alt="" />
                        <h1 className='text-[14px]'>Active</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>275</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={InUseColorIcon} alt="" />
                        <h1 className='text-[14px]'>In Use</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>204</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-2'>
                        <img src={MaintanceColorIcon} alt="" />
                        <h1 className='text-[14px]'>Maintenance</h1>
                    </div>
                    <h1 className='text-[14px] text-[#9291A5]'>173</h1>
                </div>
            </div>
        </Card>
    );
};

export default memo(MachineUtaliztionChart);