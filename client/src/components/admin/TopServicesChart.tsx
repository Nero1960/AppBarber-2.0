import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { getTopServices } from '@/api/ServiceApi'
import { Scissors, Target, Percent, TrendingUp } from 'lucide-react'

interface TopServiceData {
  serviceId: number;
  name: string;
  count: number;
}

export default function TopServicesChart() {
  const [timeRange, setTimeRange] = useState<string>('month');
  const [selectedService, setSelectedService] = useState<TopServiceData | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [targetCitas, setTargetCitas] = useState<number>(50);

  const { data = [] } = useQuery({
    queryKey: ['topServices', timeRange],
    queryFn: () => getTopServices(timeRange),
    retry: false,
    refetchOnWindowFocus: false,
  });

  // ✅ Tipado correcto: entry viene del BarChart payload, no directamente de TopServiceData
  const handleBarClick = (data: unknown, index: number) => {
    const entry = data as TopServiceData;
    setSelectedService(entry);
    setActiveIndex(index);
  };

  // ✅ Tipado para click en Cell del PieChart
  const handleCellClick = (entry: TopServiceData, index: number) => {
    setSelectedService(entry);
    setActiveIndex(index);
  };

  const totalCitasPeriodo = data.reduce((acc, item) => acc + item.count, 0);
  const PIE_COLORS = ['#D6A354', '#C1872E', '#906423', '#5F4217'];

  return (
    <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none shadow-2xl">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-4 border-b border-white-900 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-[#D6A354] w-5 h-5" />
          <CardTitle className="text-[#D6A354] text-lg font-bold">Módulo de Analítica de Servicios</CardTitle>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-[#0F0F0F] px-2 py-1 rounded-md border border-white-900">
            <Target className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] text-gray-400 uppercase font-bold">Meta:</span>
            <Input
              type="number"
              value={targetCitas}
              // ✅ Manejo seguro de NaN con fallback a 0
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const parsed = parseInt(e.target.value, 10);
                setTargetCitas(Math.max(1, isNaN(parsed) ? 0 : parsed));
              }}
              className="w-14 h-6 bg-transparent border-none text-center text-xs font-bold text-[#D6A354] p-0 focus-visible:ring-0"
            />
          </div>

          <Select
            value={timeRange}
            onValueChange={(value: string) => {
              setTimeRange(value);
              setSelectedService(null);
              setActiveIndex(null);
            }}
          >
            <SelectTrigger className="w-[130px] bg-[#0F0F0F] border-[#D6A354] text-[#F7F7F7] h-8 text-xs">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
              <SelectItem value="day">Este día</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              {/* ✅ onClick va en <Bar>, no en <Cell> — así Recharts pasa el payload correctamente */}
              <BarChart layout="vertical" data={data} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C1872E" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#D6A354" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <XAxis type="number" stroke="#949494" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#F7F7F7" width={100} fontSize={11} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} cursor="pointer" onClick={handleBarClick}>
                  {data.map((_entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === activeIndex ? '#FFF' : 'url(#goldGradient)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px] flex flex-col justify-center items-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  cursor="pointer"
                >
                  {data.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-pie-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      // ✅ En PieChart, Cell sí recibe entry directamente en onClick
                      onClick={() => handleCellClick(entry, index)}
                      stroke="#1F1F1F"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-[#D6A354]">{totalCitasPeriodo}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total Citas</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0F0F0F] p-4 rounded-xl border border-white-900 transition-all duration-300">
          {selectedService && totalCitasPeriodo > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1F1F1F] rounded-lg border border-[#D6A354]">
                    <Scissors className="w-4 h-4 text-[#D6A354]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Servicio</p>
                    <p className="text-sm font-bold text-[#F7F7F7] truncate">{selectedService.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1F1F1F] rounded-lg border border-blue-500">
                    <Percent className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Cuota de Mercado</p>
                    <p className="text-sm font-bold text-blue-400">
                      {((selectedService.count / totalCitasPeriodo) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#1F1F1F] rounded-lg border border-green-500">
                    <Target className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Progreso de Meta</p>
                    <p className="text-sm font-bold text-green-400">
                      {((selectedService.count / targetCitas) * 100).toFixed(1)}% logrado
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden border border-gray-700">
                <div
                  className="bg-gradient-to-r from-[#C1872E] to-green-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(100, (selectedService.count / targetCitas) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-center text-white-700 py-1 italic">
               Haz clic en una barra o rebanada de la dona para activar las métricas de rendimiento y cuota de negocio.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}