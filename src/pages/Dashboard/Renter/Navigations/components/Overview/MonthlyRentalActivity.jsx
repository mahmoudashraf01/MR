"use client"

import { memo } from 'react';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"

const chartData = [
    { month: "January", desktop: 10 },
    { month: "February", desktop: 30 },
    { month: "March", desktop: 22 },
    { month: "April", desktop: 50 },
    { month: "May", desktop: 22 },
    { month: "June", desktop: 35 },
]

const chartConfig = {
    desktop: {
        label: "Revnue",
        color: "#146CF9",
    },
}

const maxValue = Math.max(...chartData.map(d => d.desktop));
const step = 10;

const yTicks = Array.from(
    { length: Math.ceil(maxValue / step) + 1 },
    (_, i) => i * step
);

const MonthlyRentalActivity = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>monthly rental activity</CardTitle>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <YAxis
                            domain={[0, maxValue]}
                            allowDecimals={false}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            ticks={yTicks}
                            axisLine={false}
                            tickLine={false}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Line
                            dataKey="desktop"
                            type="linear"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default memo(MonthlyRentalActivity);