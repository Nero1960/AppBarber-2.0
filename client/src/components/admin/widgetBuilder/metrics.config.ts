import { MetricConfig } from "./types"

export const AVAILABLE_METRICS: MetricConfig[] = [
    {
        key: 'appointments_by_barber',
        label: 'Citas por Barbero',
        queryKey: 'widget_barber_appointments',
        queryFn: () => import('@/api/BarberApi').then(m => m.barberAppointmentData()).then(r => r ?? []),
        xKey: '', // Se calculan dinámicamente
        yKey: '',
    },
    {
        key: 'revenue',
        label: 'Ingresos',
        queryKey: 'widget_monthly_revenue',
        queryFn: () => {
            const now = new Date()
            return import('@/api/AppointmentApi')
                .then(m => m.monthlyRevenueChart(now.getMonth() + 1, now.getFullYear()))
                .then(r => r ?? [])
        },
        xKey: '',
        yKey: '',
        statSuffix: 'C$',
    },
    // 🚀 NUEVA MÉTRICA: Top Servicios
    {
        key: 'top_services',
        label: 'Top Servicios',
        queryKey: 'widget_top_services',
        // Por defecto le pasamos 'month' para traer los del mes actual
        queryFn: () => import('@/api/ServiceApi').then(m => m.getTopServices('month')).then(r => r ?? []),
        xKey: '',
        yKey: '',
    },
    // 🚀 NUEVA MÉTRICA: Motivos de Cancelación
    {
        key: 'cancellations',
        label: 'Motivos de Cancelación',
        queryKey: 'widget_cancellations',
        // Usamos el GET de motivos para graficar, no el POST
        queryFn: () => import('@/api/ReportApi').then(m => m.getCancellationReasonsData()).then(r => r ?? []),
        xKey: '',
        yKey: '',
    },
]