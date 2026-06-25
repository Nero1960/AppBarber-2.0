// src/components/admin/charts/MonthlyRevenueChart.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { monthlyRevenueChart } from '@/api/AppointmentApi';
import { formatToCordobas } from '@/utils/formatToCordobas';
import ChartSelector from "@/components/admin/charts/ChartSelector";
import DynamicChart from "@/components/admin/charts/DynamicChart";
import { ChartType } from "@/components/admin/charts/types";

import { chartThemes, ChartPaletteType } from '@/lib/chartThemes';
import { Palette } from 'lucide-react';

export default function MonthlyRevenueChart() {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [chartType, setChartType] = useState<ChartType>("bar");

    // 🚀 NUEVO ESTADO: Control de la paleta de colores activa
    const [currentPalette, setCurrentPalette] = useState<ChartPaletteType>('appBarberPremium');
    const activeTheme = chartThemes[currentPalette];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const { data = [] } = useQuery({
        queryKey: ['monthlyRevenue', selectedMonth, selectedYear],
        queryFn: () => monthlyRevenueChart(selectedMonth, selectedYear),
        enabled: !!selectedMonth && !!selectedYear,
        retry: false
    });

    useEffect(() => {
        if (data) {
            const total = data.reduce((sum, item) => sum + item.revenue, 0);
            setTotalRevenue(total);
        }
    }, [data]);

    return (
        <Card className="w-full h-full bg-[#1F1F1F] text-[#F7F7F7] border-none shadow-2xl">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-white-900 gap-4 mb-4">
                <CardTitle className="text-[#D6A354] text-xl font-bold">
                    Ingresos Mensuales por Citas
                </CardTitle>

                <div className="flex items-center gap-2 bg-[#0F0F0F] p-1.5 rounded-lg border border-[#D6A354]/30">
                    <Palette className="w-4 h-4 text-[#D6A354]" />
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden md:inline">Paleta:</span>
                    <Select 
                        value={currentPalette} 
                        onValueChange={(value) => setCurrentPalette(value as ChartPaletteType)}
                    >
                        <SelectTrigger className="w-[160px] bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7] h-7 text-xs">
                            <SelectValue placeholder="Paleta de Colores" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
                            <SelectItem value="appBarberPremium">Premium 🌟</SelectItem>
                            <SelectItem value="monochromatic">Monocromo Azul 🟦</SelectItem>
                            <SelectItem value="pastel">Pastel 🎨</SelectItem>
                            <SelectItem value="dark">Alto Contraste 🌙</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <div className="flex gap-4">
                        {/* Selector mes */}
                        <Select
                            value={selectedMonth.toString()}
                            onValueChange={value => setSelectedMonth(parseInt(value))}
                        >
                            <SelectTrigger className="w-[140px] bg-[#0F0F0F] border-[#D6A354] text-[#F7F7F7] h-8 text-xs">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
                                {months.map((month, index) => (
                                    <SelectItem key={month} value={(index + 1).toString()}>
                                        {month}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Selector año */}
                        <Select
                            value={selectedYear.toString()}
                            onValueChange={value => setSelectedYear(parseInt(value))}
                        >
                            <SelectTrigger className="w-[100px] bg-[#0F0F0F] border-[#D6A354] text-[#F7F7F7] h-8 text-xs">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
                                {years.map(year => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <ChartSelector value={chartType} onChange={setChartType} />
                </div>

                <div className="text-xl font-bold mb-4 text-green-400">
                    Total: {formatToCordobas(totalRevenue)}
                </div>

                <div className="w-full h-[360px]">
                    <DynamicChart
                        data={data}
                        type={chartType}
                        xKey="day"
                        yKey="revenue"
                        xValue='Dia del mes'
                        yValue='Ingresos en C$'
                        activeTheme={activeTheme} 
                    />
                </div>
            </CardContent>
        </Card>
    );
}