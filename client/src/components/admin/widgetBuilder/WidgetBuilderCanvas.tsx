import { useState, useEffect } from "react"
import { LayoutDashboard, Trash2 } from "lucide-react"
import WidgetBuilder from "./WidgetBuilder"
import WidgetCard from "./WidgetCard"
import { WidgetConfig } from "./types"
import { AVAILABLE_METRICS } from "./metrics.config"

const STORAGE_KEY = 'dashboard_widgets'

function loadWidgets(): WidgetConfig[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch { return [] }
}

function saveWidgets(widgets: WidgetConfig[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets)) }
    catch { console.warn('No se pudo guardar en localStorage') }
}

export default function WidgetBuilderCanvas() {
    const [widgets,     setWidgets]     = useState<WidgetConfig[]>(loadWidgets)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [confirmClear, setConfirmClear] = useState(false)

    useEffect(() => { saveWidgets(widgets) }, [widgets])

    const handleAdd = (widget: WidgetConfig) => {
        setWidgets(prev => [...prev, widget])
    }

    const handleRemove = (id: string) => {
        setWidgets(prev => prev.filter(w => w.id !== id))
    }

    const handleClearAll = () => {
        if (!confirmClear) { setConfirmClear(true); return }
        setWidgets([])
        setConfirmClear(false)
    }

    return (
        <div className="flex gap-0 bg-[#111] rounded-xl overflow-hidden border border-[#2A2A2A] min-h-[600px]">

            {/* Sidebar */}
            <div
                className={`flex-shrink-0 border-r border-[#2A2A2A] bg-[#1A1A1A] transition-all duration-300 overflow-hidden ${
                    sidebarOpen ? 'w-64 p-5' : 'w-0 p-0'
                }`}
            >
                {sidebarOpen && <WidgetBuilder onAdd={handleAdd} />}
            </div>

            {/* Canvas principal */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Toolbar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#2A2A2A]">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(p => !p)}
                            className="flex items-center gap-1.5 text-xs text-[#666] hover:text-[#D6A354] transition-colors"
                            title={sidebarOpen ? 'Ocultar panel' : 'Mostrar panel'}
                        >
                            <LayoutDashboard size={15} />
                            {sidebarOpen ? 'Ocultar panel' : 'Crear widget'}
                        </button>
                        <span className="text-[#2A2A2A]">|</span>
                        <span className="text-xs text-[#444]">
                            {widgets.length} widget{widgets.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {widgets.length > 0 && (
                        <button
                            onClick={handleClearAll}
                            onBlur={() => setConfirmClear(false)}
                            className={`flex items-center gap-1.5 text-xs transition-colors ${
                                confirmClear
                                    ? 'text-[#E24B4A]'
                                    : 'text-[#444] hover:text-[#E24B4A]'
                            }`}
                        >
                            <Trash2 size={13} />
                            {confirmClear ? '¿Confirmar?' : 'Limpiar todo'}
                        </button>
                    )}
                </div>

                {/* Widgets grid o estado vacío */}
                <div className="flex-1 p-5 overflow-y-auto">
                    {widgets.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                            <div className="w-14 h-14 rounded-full bg-[#1F1F1F] flex items-center justify-center">
                                <LayoutDashboard size={24} className="text-[#2A2A2A]" />
                            </div>
                            <p className="text-sm text-[#444]">Tu dashboard está vacío</p>
                            <p className="text-xs text-[#333]">
                                {sidebarOpen
                                    ? 'Configura un widget en el panel izquierdo'
                                    : 'Haz clic en "Crear widget" para empezar'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {widgets.map(widget => {
                                const metric = AVAILABLE_METRICS.find(m => m.key === widget.metricKey)
                                if (!metric) return null
                                return (
                                    <WidgetCard
                                        key={widget.id}
                                        widget={widget}
                                        metric={metric}
                                        onRemove={handleRemove}
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}