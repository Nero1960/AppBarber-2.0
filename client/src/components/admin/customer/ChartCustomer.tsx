import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentData } from "@/types/index";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell, Label } from "recharts";
import { CalendarDays, TrendingUp, TrendingDown, Activity } from "lucide-react";

type ChartCustomerProps = {
  data: AppointmentData;
};

// Mapeo para traducir y abreviar
const monthsInSpanish = {
  January: "Ene",
  February: "Feb",
  March: "Mar",
  April: "Abr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Ago",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dic",
};

// 🚀 NUEVO: Calendario maestro para forzar el orden cronológico
const monthOrder = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function ChartCustomer({ data }: ChartCustomerProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 🚀 PREPARACIÓN, ORDENAMIENTO CRONOLÓGICO Y CÁLCULO
  const chartData = useMemo(() => {
    // 1. Clonamos el array original y lo ordenamos basado en el índice del calendario maestro
    const sortedData = [...data].sort((a, b) => {
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

    // 2. Aplicamos la traducción al español sobre el array ya ordenado
    return sortedData.map((item) => ({
      ...item,
      monthLabel: monthsInSpanish[item.month as keyof typeof monthsInSpanish] || item.month,
      originalMonth: item.month
    }));
  }, [data]);

  // Matemáticas para el panel interactivo
  const totalAppointments = chartData.reduce((sum, item) => sum + Number(item.totalAppointments), 0);
  const averageAppointments = chartData.length > 0 ? totalAppointments / chartData.length : 0;
  const activeMonthData = chartData.find(m => m.monthLabel === selectedMonth);

  return (
    <Card className="col-span-4 bg-[#1F1F1F] border-none shadow-xl flex flex-col gap-2">
      
      {/* HEADER DINÁMICO */}
      <CardHeader className="pb-0 border-b border-[#2A2A2A] px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-[#D6A354] text-xl font-bold flex items-center gap-2">
            <Activity size={22} />
            Visitas Anuales de Clientes
          </CardTitle>
          <p className="text-xs text-gray-400 mt-1">
            Total histórico: <span className="text-[#F7F7F7] font-bold">{totalAppointments} citas</span>
          </p>
        </div>

        {/* PANEL DE FOCO */}
        {selectedMonth && activeMonthData ? (
          <div className="animate-in fade-in slide-in-from-right-4 flex items-center gap-4 bg-[#0F0F0F] px-4 py-2 rounded-lg border border-[#D6A354]/30">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Mes Enfocado</p>
              <p className="text-[#D6A354] font-bold flex items-center gap-1.5">
                <CalendarDays size={14} /> {selectedMonth}
              </p>
            </div>
            <div className="w-px h-8 bg-[#2A2A2A]"></div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Citas</p>
              <p className="text-[#F7F7F7] font-bold">{activeMonthData.totalAppointments}</p>
            </div>
            <div className="w-px h-8 bg-[#2A2A2A]"></div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">vs Promedio</p>
              {Number(activeMonthData.totalAppointments) >= averageAppointments ? (
                <p className="text-[#00C49F] font-bold flex items-center gap-1 text-sm">
                  <TrendingUp size={14} /> Alto
                </p>
              ) : (
                <p className="text-[#E24B4A] font-bold flex items-center gap-1 text-sm">
                  <TrendingDown size={14} /> Bajo
                </p>
              )}
            </div>
            <button 
              onClick={() => setSelectedMonth(null)}
              className="ml-2 text-gray-500 hover:text-[#E24B4A] transition-colors"
              title="Limpiar filtro"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="hidden md:block bg-[#0F0F0F] px-3 py-1.5 rounded border border-[#2A2A2A]">
            <p className="text-[10px] text-gray-500">💡 Clic en un mes para ver detalles</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-6 px-2 md:px-6">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            
            <XAxis
              dataKey="monthLabel"
              stroke="#A0A0A0"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            >
              <Label value="Meses del Año" position="insideBottom" offset={-15} fill="#666" fontSize={12} className="font-semibold" />
            </XAxis>
            
            <YAxis
              stroke="#A0A0A0"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            >
              <Label value="Total Citas" angle={-90} position="insideLeft" offset={25} style={{ textAnchor: "middle" }} fill="#666" fontSize={12} className="font-semibold" />
            </YAxis>

            <Tooltip
              cursor={{ fill: '#ffffff05' }}
              contentStyle={{ backgroundColor: "#0F0F0F", border: "1px solid #D6A354", borderRadius: "8px" }}
              itemStyle={{ color: "#F7F7F7", fontWeight: "bold" }}
              labelStyle={{ color: "#D6A354", fontWeight: "bold", marginBottom: "4px" }}
              formatter={(value) => [`${value} Citas`, 'Volumen']}
            />

            <Bar 
              dataKey="totalAppointments" 
              radius={[4, 4, 0, 0]}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {chartData.map((entry, index) => {
                const isSelected = selectedMonth === entry.monthLabel;
                const isHovered = hoveredIndex === index;
                
                return (
                  <Cell
                    key={`cell-${index}`}
                    cursor="pointer"
                    onClick={() => setSelectedMonth(isSelected ? null : entry.monthLabel)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    fill={isSelected || isHovered ? "#D6A354" : "#A98034"}
                    fillOpacity={selectedMonth ? (isSelected ? 1 : 0.25) : (isHovered ? 1 : 0.85)}
                    stroke={isSelected ? "#FFFFFF" : "transparent"}
                    strokeWidth={isSelected ? 2 : 0}
                    style={{ transition: "all 0.2s ease-in-out" }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}