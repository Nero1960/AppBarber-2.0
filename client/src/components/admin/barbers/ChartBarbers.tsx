import { useState } from "react";
import { barberAppointmentData, barberPercentage } from "@/api/BarberApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { User, Calendar, Award, Percent } from "lucide-react"; 

// 🚀 PALETA VIBRANTE DE ALTO CONTRASTE PARA FONDOS OSCUROS
// El primero es el Dorado AppBarber, seguido de Azul, Verde Esmeralda, Amarillo, Rojo Coral y Morado.
const BARBER_COLORS = ['#D6A354', '#2196F3', '#00C49F', '#FFBB28', '#E24B4A', '#9C27B0'];

export default function ChartBarbers() {
  const [activeBarber, setActiveBarber] = useState<string | null>(null);
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);

  const { data = [] } = useQuery({
    queryKey: ["barberData"],
    queryFn: barberAppointmentData,
    retry: false,
  });

  const { data: revenueData = [] } = useQuery({
    queryKey: ["barberPercentage"],
    queryFn: barberPercentage,
    retry: false,
  });

  const selectedBarberData = data.find((b: any) => b.name === activeBarber);
  const selectedRevenueData = revenueData.find((b: any) => b.name === activeBarber);

  const totalRevenue = revenueData.reduce((sum: number, item: any) => sum + (Number(item.value) || 0), 0);
  
  const selectedRevenuePercentage = totalRevenue > 0 && selectedRevenueData
    ? ((Number(selectedRevenueData.value) / totalRevenue) * 100).toFixed(1)
    : "0.0";

  const handleElementSelect = (name: string) => {
    if (activeBarber === name) {
      setActiveBarber(null);
    } else {
      setActiveBarber(name);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {activeBarber && selectedBarberData ? (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <Card className="bg-[#1F1F1F] border border-[#D6A354]/40 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#D6A354]/5 to-transparent pointer-events-none" />
            
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[#D6A354]/10 rounded-lg text-[#D6A354]">
                  <User size={18} />
                </div>
                <CardTitle className="text-xl font-bold text-[#F7F7F7]">
                  Rendimiento Enfocado: <span className="text-[#D6A354]">{activeBarber}</span>
                </CardTitle>
              </div>
              <button 
                onClick={() => setActiveBarber(null)}
                className="text-xs text-[#F7F7F7] hover:text-[#E24B4A] transition-colors bg-[#0F0F0F] px-2.5 py-1 rounded-md border border-[#2A2A2A]"
              >
                Limpiar Enfoque ×
              </button>
            </CardHeader>

            <CardContent className="pt-4 grid gap-4 grid-cols-2 md:grid-cols-3">
              <div className="bg-[#0F0F0F] p-3 rounded-xl border border-[#2A2A2A] flex items-center gap-3">
                <div className="p-2.5 bg-[#D6A354]/10 text-[#D6A354] rounded-lg">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Citas Totales</p>
                  <p className="text-xl font-bold text-[#F7F7F7]">{selectedBarberData.appointments} citas</p>
                </div>
              </div>

              <div className="bg-[#0F0F0F] p-3 rounded-xl border border-[#2A2A2A] flex items-center gap-3">
                <div className="p-2.5 bg-[#D6A354]/10 text-[#D6A354] rounded-lg">
                  <Percent size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Participación de Ingreso</p>
                  <p className="text-xl font-bold text-[#F7F7F7]">
                    {selectedRevenuePercentage}%
                  </p>
                </div>
              </div>

              <div className="bg-[#0F0F0F] p-3 rounded-xl border border-[#2A2A2A] col-span-2 md:col-span-1 flex items-center gap-3">
                <div className="p-2.5 bg-[#D6A354]/10 text-[#D6A354] rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Estado en Barbería</p>
                  <p className="text-xl font-bold text-[#D6A354]">
                    {selectedBarberData.appointments > 10 ? "Barbero Top ✨" : "Eficiencia Óptima"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center md:text-left bg-[#1F1F1F] p-3 rounded-xl border border-dashed border-[#2A2A2A]">
          <p className="text-xs text-gray-400">💡 <span className="text-[#D6A354] font-medium">Tip Interactivo:</span> Haz clic en una barra o sector circular para aislar las métricas y abrir el desglose individual de un barbero.</p>
        </div>
      )}

      {/* RECHARTS GRAPHICS GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* CARD 1: COMPARACIÓN DE CITAS (BARRAS) */}
        <Card className="bg-[#1F1F1F] border-none p-1 lg:p-5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#D6A354] text-lg font-bold">
              Comparación de Citas por Barbero
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#F7F7F7" fontSize={11}>
                    <Label value="Nombre" position="insideBottom" offset={-5} fill="#A0A0A0" className="text-xs" />
                  </XAxis>
                  <YAxis stroke="#F7F7F7" fontSize={11}>
                    <Label value="Total Citas" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#A0A0A0" className="text-xs" />
                  </YAxis>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0F0F0F", border: "1px solid #D6A354", borderRadius: "8px" }}
                    labelStyle={{ color: "#D6A354", fontWeight: "bold" }}
                    itemStyle={{ color: "#F7F7F7" }}
                  />
                  <Bar dataKey="appointments" cursor="pointer">
                    {data.map((entry: any, index: number) => {
                      const isFocused = activeBarber === entry.name;
                      return (
                        <Cell
                          key={`cell-bar-${index}`}
                          onClick={() => handleElementSelect(entry.name)}
                          // 🚀 Hacemos que las barras también coincidan con los colores del pastel para conectar visualmente al usuario
                          fill={isFocused ? BARBER_COLORS[index % BARBER_COLORS.length] : "#A98034"}
                          fillOpacity={activeBarber ? (isFocused ? 1 : 0.25) : 0.85}
                          stroke={isFocused ? "#FFFFFF" : "transparent"}
                          strokeWidth={2}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: PORCENTAJE DE INGRESOS (PASTEL) */}
        <Card className="bg-[#1F1F1F] border-none lg:p-5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#D6A354] text-lg font-bold">Porcentaje de Ingresos por Barbero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0F0F0F', 
                      border: '1px solid #D6A354', 
                      borderRadius: '6px' 
                    }}
                    itemStyle={{ color: '#F7F7F7' }}
                    labelStyle={{ color: '#D6A354' }}
                    formatter={(value: any) => {
                      const percentage = totalRevenue > 0 ? ((Number(value) / totalRevenue) * 100).toFixed(1) : 0;
                      return [`${percentage}%`, 'Participación'];
                    }}
                  />
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={85}
                    innerRadius={55}
                    dataKey="value"
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                    onMouseLeave={() => setActivePieIndex(null)}
                    onClick={(entry) => handleElementSelect(entry.name)}
                    cursor="pointer"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {revenueData.map((entry: any, index: number) => {
                      const isFocused = activeBarber === entry.name;
                      const isHovered = index === activePieIndex;
                      const baseColor = BARBER_COLORS[index % BARBER_COLORS.length];

                      return (
                        <Cell
                          key={`cell-pie-${index}`}
                          fill={baseColor}
                          fillOpacity={activeBarber ? (isFocused ? 1 : 0.2) : (activePieIndex !== null ? (isHovered ? 1 : 0.6) : 0.9)}
                          stroke={isHovered || isFocused ? '#FFFFFF' : '#1F1F1F'}
                          strokeWidth={isHovered || isFocused ? 2.5 : 1}
                          style={{
                            transform: isHovered || isFocused ? 'scale(1.05)' : 'scale(1)',
                            transformOrigin: 'center',
                            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                          }}
                        />
                      );
                    })}
                  </Pie>
                  <Legend formatter={(value) => <span className="text-xs text-[#F7F7F7] capitalize font-medium">{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}