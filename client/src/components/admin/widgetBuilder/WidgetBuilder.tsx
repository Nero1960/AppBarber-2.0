import { useState } from "react"
import { BarChart2, LineChart, TrendingUp, Plus, ChevronDown } from "lucide-react"
import { WidgetConfig } from "./types"
import { AVAILABLE_METRICS } from "./metrics.config"

interface Props {
    onAdd: (widget: WidgetConfig) => void
}

// 🚀 SOLO DEJAMOS BARRA, LÍNEA Y ÁREA
const CHART_TYPES = [
    { key: 'bar',   label: 'Barras',  Icon: BarChart2  },
    { key: 'line',  label: 'Líneas',  Icon: LineChart  },
    { key: 'area',  label: 'Áreas',   Icon: TrendingUp },
] as const

const COLORS = [
    '#D6A354', '#4CAF50', '#2196F3',
    '#E24B4A', '#9C27B0', '#00BCD4',
    '#FF9800', '#F06292',
]

export default function WidgetBuilder({ onAdd }: Props) {
    const [title,      setTitle]     = useState('')
    const [metricKey,  setMetricKey] = useState(AVAILABLE_METRICS[0].key)
    const [chartType,  setChartType] = useState<string>('bar')
    const [color,      setColor]     = useState(COLORS[0])
    const [error,      setError]     = useState('')

    const handleAdd = () => {
        if (!title.trim()) { setError('Escribe un título para el widget'); return }
        setError('')
        onAdd({
            id:        `widget-${Date.now()}`,
            title:     title.trim(),
            metricKey,
            chartType: chartType as WidgetConfig['chartType'],
            color,
            createdAt: Date.now(),
        })
        setTitle('')
    }

    return (
        <aside className="flex flex-col gap-5 h-full">
            <div>
                <h2 className="text-sm font-medium text-[#D6A354]">Nuevo widget</h2>
                <p className="text-xs text-[#555] mt-0.5">Configura y agrega al dashboard</p>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#555] uppercase tracking-widest">Título del gráfico</label>
                <input
                    value={title}
                    onChange={e => { setTitle(e.target.value); setError('') }}
                    placeholder="Ej: Servicios más vendidos"
                    className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-[#F7F7F7] placeholder-[#444] focus:outline-none focus:border-[#D6A354] transition-colors"
                />
                {error && <p className="text-xs text-[#E24B4A]">{error}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#555] uppercase tracking-widest">Métrica del backend</label>
                <div className="relative">
                    <select
                        value={metricKey}
                        onChange={e => setMetricKey(e.target.value)}
                        className="w-full appearance-none bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-[#F7F7F7] focus:outline-none focus:border-[#D6A354] transition-colors pr-8"
                    >
                        {AVAILABLE_METRICS.map(m => (
                            <option key={m.key} value={m.key}>{m.label}</option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555] pointer-events-none" />
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#555] uppercase tracking-widest">Tipo de visualización</label>
                <div className="grid grid-cols-3 gap-2">
                    {CHART_TYPES.map(({ key, label, Icon }) => (
                        <button
                            key={key}
                            onClick={() => setChartType(key)}
                            className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-lg border text-xs transition-all ${
                                chartType === key
                                    ? 'border-[#D6A354] bg-[#D6A35415] text-[#D6A354]'
                                    : 'border-[#2A2A2A] bg-[#0F0F0F] text-[#555] hover:border-[#444] hover:text-[#888]'
                            }`}
                        >
                            <Icon size={16} />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-[#555] uppercase tracking-widest">Color principal</label>
                <div className="flex flex-wrap gap-2">
                    {COLORS.map(c => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className="w-6 h-6 rounded-full transition-transform"
                            style={{
                                background: c,
                                outline: color === c ? `2px solid ${c}` : 'none',
                                outlineOffset: '2px',
                                transform: color === c ? 'scale(1.2)' : 'scale(1)',
                            }}
                            aria-label={`Color ${c}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg text-xs" style={{ background: `${color}15`, border: `0.5px solid ${color}40` }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                <span style={{ color }}>
                    {CHART_TYPES.find(t => t.key === chartType)?.label} · {AVAILABLE_METRICS.find(m => m.key === metricKey)?.label}
                </span>
            </div>

            <button
                onClick={handleAdd}
                className="mt-auto flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 active:scale-[.98]"
                style={{ background: color, color: '#1A1A1A' }}
            >
                <Plus size={16} />
                Agregar widget
            </button>
        </aside>
    )
}