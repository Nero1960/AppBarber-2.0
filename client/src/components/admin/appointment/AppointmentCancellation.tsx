import { getCancellationReasonsData, getStatusData } from "@/api/ReportApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useRef, useState, useCallback, useEffect } from "react"

// 🚀 Importamos las herramientas del gráfico dinámico
import ChartSelector from "@/components/admin/charts/ChartSelector"
import DynamicChart from "@/components/admin/charts/DynamicChart"
import { ChartType } from "@/components/admin/charts/types"

type renderCustomizedLabelType = {
    cx: number, cy: number, midAngle: number,
    innerRadius: number, outerRadius: number, percent: number
}

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#D6A354']
const RADIAN = Math.PI / 180
const MIN_WIDTH = 300
const MAX_WIDTH_RATIO = 0.75 // máximo 75% del contenedor padre

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: renderCustomizedLabelType) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
        <text x={x} y={y} fill="white" fontSize={12} fontWeight="bold" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {percent > 0 ? `${(percent * 100).toFixed(0)}%` : ''}
        </text>
    )
}

export default function AppointmentCancellation() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [pieWidth, setPieWidth] = useState<number | null>(null) // null = 50% por defecto
    const isDragging = useRef(false)
    const startX = useRef(0)
    const startWidth = useRef(0)

    // 🚀 INTERACTIVIDAD: Estado para rastrear qué rebanada del pastel tiene el mouse encima
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    // 🚀 NUEVO ESTADO: Tipo de diagrama seleccionado para los motivos de cancelación
    const [chartType, setChartType] = useState<ChartType>("bar")

    // 🚀 Objeto de tema provisional interno para satisfacer los tipos de DynamicChart sin heredar del padre
    const defaultTheme = {
        colors: ["#D6A354"],
        stroke: "#F7F7F7",
        tooltipBg: "#0F0F0F",
        tooltipBorder: "#D6A354"
    };

    const { data: statusData = [] } = useQuery({
        queryKey: ['appointmentCancellationReason'],
        queryFn: getStatusData,
        retry: false,
        enabled: true
    })

    const { data: cancellationReasons = [] } = useQuery({
        queryKey: ['cancellationReasons'],
        queryFn: getCancellationReasonsData,
        retry: false,
        enabled: true
    })

    const totalAppointments = statusData.reduce((sum, item) => sum + item.value, 0)
    const cancelledAppointments = statusData.find(item => item.name === 'cancelled')?.value || 0
    const cancellationRate = totalAppointments > 0
        ? ((cancelledAppointments / totalAppointments) * 100).toFixed(2)
        : "0.00"

    // Handlers interactivos para el efecto hover del Pie
    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index)
    }

    const onPieLeave = () => {
        setActiveIndex(null)
    }

    // Reset al cambiar tamaño de ventana
    useEffect(() => {
        const handleWindowResize = () => setPieWidth(null)
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        isDragging.current = true
        startX.current = e.clientX
        const container = containerRef.current
        if (!container) return
        startWidth.current = container.offsetWidth / 2
    }, [])

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return
        const containerWidth = containerRef.current.offsetWidth
        const delta = e.clientX - startX.current
        const newWidth = Math.min(
            Math.max(startWidth.current + delta, MIN_WIDTH),
            containerWidth * MAX_WIDTH_RATIO
        )
        setPieWidth(newWidth)
    }, [])

    const onMouseUp = useCallback(() => {
        isDragging.current = false
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseMove, onMouseUp])

    // Touch support para mobile
    const onTouchStart = useCallback((e: React.TouchEvent) => {
        isDragging.current = true
        startX.current = e.touches[0].clientX
        const container = containerRef.current
        if (!container) return
        startWidth.current = pieWidth ?? container.offsetWidth / 2
    }, [pieWidth])

    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging.current || !containerRef.current) return
        const containerWidth = containerRef.current.offsetWidth
        const delta = e.touches[0].clientX - startX.current
        const newWidth = Math.min(
            Math.max(startWidth.current + delta, MIN_WIDTH),
            containerWidth * MAX_WIDTH_RATIO
        )
        setPieWidth(newWidth)
    }, [])

    const onTouchEnd = useCallback(() => {
        isDragging.current = false
    }, [])

    useEffect(() => {
        window.addEventListener('touchmove', onTouchMove)
        window.addEventListener('touchend', onTouchEnd)
        return () => {
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onTouchEnd)
        }
    }, [onTouchMove, onTouchEnd])

    return (
        <div className="flex flex-col gap-4 mb-10">
            {/* Summary Card */}
            <Card className="bg-[#1F1F1F] border-none">
                <CardHeader>
                    <CardTitle className="text-[#D6A354] text-2xl font-bold">
                        Resumen de Citas Canceladas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0F0F0F] rounded-lg">
                            <p className="text-[#F7F7F7] text-sm">Total de Citas</p>
                            <p className="text-[#D6A354] text-3xl font-bold">{totalAppointments}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0F0F0F] rounded-lg">
                            <p className="text-[#F7F7F7] text-sm">Citas Canceladas</p>
                            <p className="text-[#D6A354] text-3xl font-bold">{cancelledAppointments}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0F0F0F] rounded-lg">
                            <p className="text-[#F7F7F7] text-sm">Tasa de Cancelación</p>
                            <p className="text-[#D6A354] text-3xl font-bold">{cancellationRate}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Gráficas resizeable */}
            <div
                ref={containerRef}
                className="flex flex-col md:flex-row gap-0 relative"
                style={{ userSelect: isDragging.current ? 'none' : 'auto' }}
            >
                {/* Pie Chart Card */}
                <div
                    style={{
                        width: pieWidth ? `${pieWidth}px` : '50%',
                        minWidth: `${MIN_WIDTH}px`,
                        transition: isDragging.current ? 'none' : 'width 0.1s ease',
                        flexShrink: 0
                    }}
                    className="w-full md:w-auto"
                >
                    <Card className="bg-[#1F1F1F] border-none h-full">
                        <CardHeader>
                            <CardTitle className="text-[#D6A354] text-xl font-bold">
                                Estado de las Citas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        {/* 🚀 Adición de Tooltip premium para el gráfico circular */}
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0F0F0F', border: '1px solid #D6A354', borderRadius: '6px', color: '#F7F7F7' }}
                                            itemStyle={{ color: '#D6A354' }}
                                        />
                                        <Pie
                                            data={statusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={80}
                                            innerRadius={45} // 🚀 Convertido a Donut Chart sutil (estética premium)
                                            dataKey="value"
                                            onMouseEnter={onPieEnter}
                                            onMouseLeave={onPieLeave}
                                            cursor="pointer"
                                        >
                                            {statusData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} 
                                                    // 🚀 INTERACTIVIDAD: Si el mouse está encima de este índice, se expande 6px hacia afuera
                                                    stroke={index === activeIndex ? '#FFFFFF' : '#1F1F1F'}
                                                    strokeWidth={index === activeIndex ? 3 : 1}
                                                    style={{
                                                        transform: index === activeIndex ? 'scale(1.03)' : 'scale(1)',
                                                        transformOrigin: 'center',
                                                        transition: 'all 0.2s ease-out'
                                                    }}
                                                />
                                            ))}
                                        </Pie>
                                        <Legend formatter={(value) => <span className="text-xs text-gray-300 capitalize">{value}</span>} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Handle de resize */}
                <div
                    className="hidden md:flex items-center justify-center w-4 cursor-col-resize flex-shrink-0 group"
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    title="Arrastra para redimensionar"
                >
                    <div className="w-1 h-16 rounded-full bg-[#D6A354] opacity-40 group-hover:opacity-100 group-hover:h-24 transition-all duration-200" />
                </div>

                {/* Bar Chart Card - Convertido a Gráfico Seleccionable Dinámico */}
                <div className="flex-1 min-w-0">
                    <Card className="bg-[#1F1F1F] border-none h-full flex flex-col justify-between">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-[#D6A354] text-xl font-bold">
                                Motivos de Cancelación
                            </CardTitle>
                            <ChartSelector value={chartType} onChange={setChartType} allowedTypes={["bar", "line", "area"]} />
                        </CardHeader>
                        
                        <CardContent className="flex-1">
                            <div className="w-full h-[300px]">
                                <DynamicChart
                                    data={cancellationReasons}
                                    type={chartType}
                                    xKey="reason"
                                    yKey="count"
                                    xValue="Motivo"
                                    yValue="Veces cancelada"
                                    activeTheme={defaultTheme}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}