import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ResponsiveContainer, BarChart, Bar, LineChart, Line,
    AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts"
import { Loader2, X, GripVertical, RefreshCw } from "lucide-react"
import { WidgetConfig, MetricConfig } from "./types"

interface Props {
    widget: WidgetConfig
    metric: MetricConfig
    onRemove: (id: string) => void
}

const TOOLTIP_STYLE = {
    backgroundColor: '#0F0F0F',
    border: '1px solid #D6A354',
    borderRadius: '6px',
    color: '#F7F7F7',
    fontSize: 12,
}

export default function WidgetCard({ widget, metric, onRemove }: Props) {
    const { data = [], isLoading, isError, refetch } = useQuery({
        queryKey: [metric.queryKey || metric.key, widget.id],
        queryFn: metric.queryFn,
        retry: 1,
        staleTime: 1000 * 60 * 5,
    })

    // Algoritmo Dinámico: Deducción de llaves
    let xKey = metric.xKey
    let yKey = metric.yKey

    if (data && data.length > 0) {
        const firstItem = data[0]
        const keys = Object.keys(firstItem)
        const numericKey = keys.find(k => typeof firstItem[k] === 'number' || !isNaN(Number(firstItem[k])))
        const categoricalKey = keys.find(k => k !== numericKey)
        xKey = categoricalKey || keys[0]
        yKey = numericKey || keys[1]
    }

    const renderChart = () => {
        if (isLoading) return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="animate-spin text-[#D6A354]" size={24} />
            </div>
        )
        if (isError || !data.length) return (
            <div className="flex flex-col items-center justify-center h-full gap-2">
                <p className="text-xs text-[#555]">Sin datos disponibles</p>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-1 text-xs text-[#D6A354] hover:opacity-70 transition-opacity"
                >
                    <RefreshCw size={12} /> Reintentar
                </button>
            </div>
        )

        const commonAxis = {
            stroke: '#444',
            tick: { fill: '#666', fontSize: 10 },
        }
        const commonTooltip = (
            <Tooltip contentStyle={TOOLTIP_STYLE} itemStyle={{ color: '#F7F7F7' }} cursor={{ fill: '#ffffff08' }} />
        )

        switch (widget.chartType) {
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                            <XAxis dataKey={xKey} {...commonAxis} />
                            <YAxis {...commonAxis} />
                            {commonTooltip}
                            <Bar dataKey={yKey} fill={widget.color} radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                )

            case 'line':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                            <XAxis dataKey={xKey} {...commonAxis} />
                            <YAxis {...commonAxis} />
                            {commonTooltip}
                            <Line
                                type="monotone" dataKey={yKey}
                                stroke={widget.color} strokeWidth={2}
                                dot={{ fill: widget.color, r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )

            case 'area':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id={`grad-${widget.id}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={widget.color} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={widget.color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                            <XAxis dataKey={xKey} {...commonAxis} />
                            <YAxis {...commonAxis} />
                            {commonTooltip}
                            <Area
                                type="monotone" dataKey={yKey}
                                stroke={widget.color} strokeWidth={2}
                                fill={`url(#grad-${widget.id})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )
            default:
                return null
        }
    }

    return (
        <Card className="bg-[#1F1F1F] border-[#2A2A2A] border h-full flex flex-col group shadow-md">
            <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <GripVertical size={14} className="text-[#333] flex-shrink-0 cursor-grab" />
                        <CardTitle className="text-sm font-medium text-[#F7F7F7] truncate">
                            {widget.title}
                        </CardTitle>
                    </div>
                    <button
                        onClick={() => onRemove(widget.id)}
                        className="text-[#444] hover:text-[#E24B4A] transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                        aria-label="Eliminar widget"
                    >
                        <X size={14} />
                    </button>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 ml-5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: widget.color }} />
                    <p className="text-xs text-[#555] truncate">{metric.label}</p>
                    <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full ml-auto flex-shrink-0 uppercase"
                        style={{ background: `${widget.color}22`, color: widget.color }}
                    >
                        {widget.chartType}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="flex-1 px-4 pb-4">
                <div className="h-[180px]">
                    {renderChart()}
                </div>
            </CardContent>
        </Card>
    )
}