import React from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    ScatterChart,
    Scatter,
    Cell
} from "recharts";
import { ChartType } from "./types";

// 🚀 Importamos la interfaz estricta del tema analítico
import { ChartTheme } from "@/lib/chartThemes";

interface Props {
    data: any[];
    type: ChartType;
    xKey: string;
    yKey: string;
    yValue: string;
    xValue : string;
    activeTheme: ChartTheme;
}

const DynamicChart = ({
    data,
    type,
    xKey,
    yKey,
    yValue,
    xValue,
    activeTheme
}: Props) => {

    let chart: React.ReactElement = <></>;

    // Mapeo seguro del acumulado mensual
    const chartData = data.map((item, index) => {
        const cumulativeRevenue = data
            .slice(0, index + 1)
            .reduce((sum, current) => sum + current.revenue, 0);

        return {
            ...item,
            cumulativeRevenue
        };
    });

    const renderTooltip = () => (
        <Tooltip
            contentStyle={{
                backgroundColor: activeTheme.tooltipBg,
                border: `1px solid ${activeTheme.tooltipBorder}`,
                borderRadius: '8px',
                color: '#F7F7F7'
            }}
            labelStyle={{ color: '#F7F7F7', fontWeight: 'bold' }}
            itemStyle={{ color: activeTheme.colors[0] }}
        />
    );

    switch (type) {
        case "bar":
            chart = (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={xKey}
                        stroke={activeTheme.stroke}
                        label={{
                            value: xValue,
                            position: "insideBottom",
                            offset: -5,
                            fill: activeTheme.stroke
                        }}
                    />
                    <YAxis
                        stroke={activeTheme.stroke}
                        label={{
                            value: yValue,
                            angle: -90,
                            position: "insideLeft",
                            fill: activeTheme.stroke
                        }}
                    />
                    {renderTooltip()}
                    <Bar dataKey={yKey} radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-bar-${index}`} fill={activeTheme.colors[index % activeTheme.colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            );
            break;

        case "line":
            chart = (
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={xKey}
                        stroke={activeTheme.stroke}
                        label={{
                            value: xValue,
                            position: "insideBottom",
                            offset: -5,
                            fill: activeTheme.stroke
                        }}
                    />
                    <YAxis
                        stroke={activeTheme.stroke}
                        label={{
                            value: yValue,
                            angle: -90,
                            position: "insideLeft",
                            fill: activeTheme.stroke
                        }}
                    />
                    {renderTooltip()}
                    <Line
                        type="monotone"
                        dataKey={yKey}
                        stroke={activeTheme.colors[0]} // Color principal de la paleta activa
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            );
            break;

        case "area":
            chart = (
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="dynamicAreaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={activeTheme.colors[0]} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={activeTheme.colors[0]} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={xKey}
                        stroke={activeTheme.stroke}
                        label={{
                            value: xValue,
                            position: "insideBottom",
                            offset: -5,
                            fill: activeTheme.stroke
                        }}
                    />
                    <YAxis
                        stroke={activeTheme.stroke}
                        label={{
                            value: yValue,
                            angle: -90,
                            position: "insideLeft",
                            fill: activeTheme.stroke
                        }}
                    />
                    {renderTooltip()}
                    <Area
                        type="monotone"
                        dataKey={yKey}
                        stroke={activeTheme.colors[0]}
                        fill="url(#dynamicAreaGradient)"
                        strokeWidth={2}
                    />
                </AreaChart>
            );
            break;

        case "composed":
            chart = (
                <ComposedChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey={xKey}
                        stroke={activeTheme.stroke}
                        label={{
                            value: xValue,
                            position: "insideBottom",
                            offset: -5,
                            fill: activeTheme.stroke
                        }}
                    />
                    <YAxis
                        stroke={activeTheme.stroke}
                        label={{
                            value: xValue,
                            angle: -90,
                            position: "insideLeft",
                            fill: activeTheme.stroke
                        }}
                    />
                    {renderTooltip()}
                    <Bar dataKey={yKey} radius={[3, 3, 0, 0]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-composed-${index}`} fill={activeTheme.colors[index % activeTheme.colors.length]} />
                        ))}
                    </Bar>
                    <Line
                        type="monotone"
                        dataKey="cumulativeRevenue"
                        stroke={activeTheme.stroke} // Contraste dinámico para la línea acumulada
                        strokeWidth={2.5}
                        dot={false}
                    />
                </ComposedChart>
            );
            break;

        case "scatter":
            chart = (
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="category" dataKey={xKey} stroke={activeTheme.stroke} />
                    <YAxis type="number" dataKey={yKey} stroke={activeTheme.stroke} />
                    {renderTooltip()}
                    <Scatter data={data} fill={activeTheme.colors[0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-scatter-${index}`} fill={activeTheme.colors[index % activeTheme.colors.length]} />
                        ))}
                    </Scatter>
                </ScatterChart>
            );
            break;

        default:
            break;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            {chart}
        </ResponsiveContainer>
    );
};

export default DynamicChart;