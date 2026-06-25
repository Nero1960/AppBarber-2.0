import { ChartType } from "@/components/admin/charts/types"

export interface WidgetConfig {
    id: string
    title: string
    metricKey: string
    chartType: ChartType | 'stat' | 'donut'
    color: string
    createdAt: number
}

export interface MetricConfig {
    key: string
    label: string
    queryKey?: string          // ← opcional, si no viene usamos `key`
    queryFn: () => Promise<any[]>
    xKey: string
    yKey: string
    statSuffix?: string
}