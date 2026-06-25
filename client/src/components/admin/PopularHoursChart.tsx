import { getPeakHours } from "@/api/ReportApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTime } from "@/utils/formatTime"
import { useQuery } from "@tanstack/react-query"
import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'

const PALETTE = ['#D6A354', '#E8BC7A', '#B8893A', '#F0C878', '#A0722A', '#C9A060', '#8C5E1E', '#F5D49A', '#7A4E14', '#E0AA66', '#6B3F0E']

type Shift = 'all' | 'morning' | 'afternoon' | 'night'

function getShift(hour: number): 'morning' | 'afternoon' | 'night' {
    if (hour >= 6 && hour < 13) return 'morning'
    if (hour >= 13 && hour < 18) return 'afternoon'
    return 'night'
}

const FILTERS: { key: Shift; label: string; icon: string }[] = [
    { key: 'all', label: 'Todo el día', icon: '🕐' },
    { key: 'morning', label: 'Mañana', icon: '🌤' },
    { key: 'afternoon', label: 'Tarde', icon: '☁️' },
    { key: 'night', label: 'Noche', icon: '🌙' },
]

// Slice activo expandido (Recharts activeShape)
const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
    return (
        <g>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 12}
                startAngle={startAngle} endAngle={endAngle} fill={fill}
                stroke="#D6A354" strokeWidth={2}
            />
        </g>
    )
}

export default function PopularHoursChart() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [filter, setFilter] = useState<Shift>('all')

    const { data: peakHours = [] } = useQuery({
        queryKey: ['popularHours'],
        queryFn: getPeakHours,
        retry: false,
    })

    const allData = useMemo(() => peakHours.map(p => ({
        name: `${formatTime(p.hour + ':00')} – ${formatTime((p.hour + 1) + ':00')}`,
        value: p.appointment_count,
        shift: getShift(p.hour),
    })), [peakHours])

    const filteredData = useMemo(() =>
        filter === 'all' ? allData : allData.filter(d => d.shift === filter),
        [allData, filter])

    const total = filteredData.reduce((s, d) => s + d.value, 0)
    const peak = filteredData.length ? filteredData.reduce((a, b) => a.value > b.value ? a : b) : null
    const maxValue = Math.max(...filteredData.map(d => d.value), 1)

    const sortedForDetail = activeIndex !== null
        ? [filteredData[activeIndex]]
        : [...filteredData].sort((a, b) => b.value - a.value)

    const handleFilterChange = (key: Shift) => {
        setFilter(key)
        setActiveIndex(null)
    }

    const handleSliceClick = (_: any, index: number) => {
        setActiveIndex(prev => prev === index ? null : index)
    }

    return (
        <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none">
            <CardHeader>
                <CardTitle className="text-[#D6A354]">Horas Más Frecuentadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

                {/* Filtros de turno */}
                <div className="flex flex-wrap items-center gap-2">
                    {FILTERS.map(f => (
                        <button
                            key={f.key}
                            onClick={() => handleFilterChange(f.key)}
                            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${filter === f.key
                                    ? 'bg-[#D6A354] text-[#1F1F1F] border-[#D6A354] font-medium'
                                    : 'bg-transparent text-[#949494] border-[#333] hover:bg-[#2A2A2A] hover:text-[#F7F7F7]'
                                }`}
                        >
                            {f.icon} {f.label}
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-[#555]">☝ clic en segmento</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0F0F0F] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#949494] mb-1">Total de citas</p>
                        <p className="text-2xl font-medium text-[#F7F7F7]">{total}</p>
                    </div>
                    <div className="bg-[#0F0F0F] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#949494] mb-1">Hora pico</p>
                        <p className="text-base font-medium text-[#D6A354] leading-tight">{peak?.name ?? '—'}</p>
                    </div>
                </div>

                {/* Gráfico + Detalle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

                    {/* Pie */}
                    <div>
                        <div className="h-[240px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={filteredData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={85}
                                        dataKey="value"
                                        activeIndex={activeIndex ?? undefined}
                                        activeShape={renderActiveShape}
                                        onClick={handleSliceClick}
                                        style={{ cursor: 'pointer' }}
                                        animationBegin={0}
                                        animationDuration={500}
                                    >
                                        {filteredData.map((_, i) => (
                                            <Cell
                                                key={`cell-${i}`}
                                                fill={PALETTE[i % PALETTE.length]}
                                                opacity={activeIndex !== null && activeIndex !== i ? 0.35 : 1}
                                                style={{ transition: 'opacity .2s' }}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Leyenda interactiva */}
                        <div className="flex flex-wrap gap-1.5 mt-2 justify-center">
                            {filteredData.map((d, i) => {
                                const pct = total > 0 ? ((d.value / total) * 100).toFixed(0) : '0'
                                const dimmed = activeIndex !== null && activeIndex !== i
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(prev => prev === i ? null : i)}
                                        className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border transition-all ${dimmed ? 'opacity-30 border-transparent' : 'border-[#333] hover:border-[#D6A354]'
                                            }`}
                                    >
                                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                                        <span className="text-[#F7F7F7]">{d.name}</span>
                                        <span className="font-medium" style={{ color: PALETTE[i % PALETTE.length] }}>{pct}%</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Panel de detalle */}
                    <div>
                        <p className="text-xs text-[#555] uppercase tracking-widest mb-3">
                            {activeIndex !== null ? 'Franja seleccionada' : 'Ranking por citas'}
                        </p>

                        {/* ← altura fija + scroll */}
                        <div className="overflow-y-auto" style={{ maxHeight: '240px' }}>
                            <div className="space-y-1">
                                {sortedForDetail.map(d => {
                                    const idx = filteredData.indexOf(d)
                                    const pct = total > 0 ? ((d.value / total) * 100).toFixed(1) : '0.0'
                                    const barW = Math.round((d.value / maxValue) * 100)
                                    const color = PALETTE[idx % PALETTE.length]
                                    return (
                                        <div key={d.name} className="py-2 border-b border-[#2A2A2A] last:border-none">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-sm text-[#F7F7F7] font-medium">{d.name}</span>
                                                <div className="text-right">
                                                    <span className="text-sm font-medium" style={{ color }}>{d.value}</span>
                                                    <span className="text-xs text-[#666] ml-1">{pct}%</span>
                                                </div>
                                            </div>
                                            <div className="h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-300"
                                                    style={{ width: `${barW}%`, background: color }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {activeIndex !== null && (
                            <button
                                onClick={() => {
                                    const d = filteredData[activeIndex]
                                    const pct = ((d.value / total) * 100).toFixed(1)
                                    console.log(`Analizar: ${d.name} — ${d.value} citas (${pct}%)`)
                                }}
                                className="mt-4 w-full py-2 rounded-lg text-sm font-medium transition-all"
                                style={{
                                    background: `${PALETTE[activeIndex % PALETTE.length]}22`,
                                    color: PALETTE[activeIndex % PALETTE.length],
                                    border: `1px solid ${PALETTE[activeIndex % PALETTE.length]}`
                                }}
                            >
                                Analizar esta franja →
                            </button>
                        )}
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}