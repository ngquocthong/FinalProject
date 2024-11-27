import React, { PureComponent } from "react";
import { Icon } from "@iconify/react"
import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "18-24",
        uv: 31.47,
        pv: 2400,
        fill: "#8884d8",
    },
    {
        name: "25-29",
        uv: 26.69,
        pv: 4567,
        fill: "#83a6ed",
    },
    {
        name: "30-34",
        uv: 15.69,
        pv: 1398,
        fill: "#8dd1e1",
    },
    {
        name: "35-39",
        uv: 8.22,
        pv: 9800,
        fill: "#82ca9d",
    },
    {
        name: "40-49",
        uv: 8.63,
        pv: 3908,
        fill: "#a4de6c",
    },
    {
        name: "50+",
        uv: 2.63,
        pv: 4800,
        fill: "#d0ed57",
    },
    {
        name: "unknow",
        uv: 6.67,
        pv: 4800,
        fill: "#ffc658",
    },
];

const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
};

const CountChart = () => {
    return (
        <div className="bg-popover rounded-xl size-full p-4">
            <div className="flex-between">
                <h1>Tour Type</h1>
                <Icon icon="ri:more-fill" width="32" height="32" className="text-foreground/50"/>
            </div>
            <div className="">
                {/* <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="10%"
                        outerRadius="80%"
                        barSize={10}
                        data={data}
                    >
                        <RadialBar
                            minAngle={15}
                            label={{ position: "insideStart", fill: "#fff" }}
                            background
                            clockWise
                            dataKey="uv"
                        />
                        <Legend
                            iconSize={10}
                            layout="vertical"
                            verticalAlign="middle"
                            wrapperStyle={style}
                        />
                    </RadialBarChart>
                </ResponsiveContainer> */}
            </div>
            <div className="flex justify-center gap-16">
                <div className="">
                    <div className="size-5 bg-"></div>
                </div>
            </div>
        </div>
    );
};

export default CountChart;