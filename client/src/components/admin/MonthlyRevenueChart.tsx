import { useState, useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { monthlyRevenueChart } from '@/api/AppointmentApi';
import { formatToCordobas } from '@/utils/formatToCordobas';

export default function MonthlyRevenueChart() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [totalRevenue, setTotalRevenue] = useState(0);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Query para obtener los datos de ingresos mensuales
  const { data } = useQuery({
    queryKey: ['monthlyRevenue', selectedMonth, selectedYear],
    queryFn: () => monthlyRevenueChart(selectedMonth, selectedYear),
    enabled: !!selectedMonth && !!selectedYear,
    retry: false
  });

  useEffect(() => {
    if (data) {
      // Actualizar el total de ingresos
      const total = data.reduce((sum, item) => sum + item.revenue, 0);
      setTotalRevenue(total);
    }
  }, [data]);

  return (
    <Card className="w-full bg-brown-500 text-white-500 border-none lg:col-span-3 lg:row-span-6">
      <CardHeader>
        <CardTitle className="text-Primary-500">Ingresos Mensuales por Citas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <Select 
            value={selectedMonth.toString()} 
            onValueChange={(value) => setSelectedMonth(parseInt(value))}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-[#0F0F0F] border-[#D6A354] text-[#F7F7F7]">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
              {months.map((month, index) => (
                <SelectItem key={index} value={(index + 1).toString()} className="hover:bg-[#D6A354] hover:text-[#0F0F0F]">
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select 
            value={selectedYear.toString()} 
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-full sm:w-[180px] bg-[#0F0F0F] border-[#D6A354] text-[#F7F7F7]">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
              {years.map((year) => (
                <SelectItem key={year} value={year} className="hover:bg-[#D6A354] hover:text-[#0F0F0F]">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-2xl font-bold mb-4">
          Total: {formatToCordobas(totalRevenue)}
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="day" 
              stroke="#F7F7F7"
              label={{ value: 'Días del Mes', position: 'insideBottom', offset: -5, fill: '#F7F7F7' }}
            />
            <YAxis 
              dataKey={'revenue'}
              stroke="#F7F7F7"
              label={{ value: 'Ingresos (C$)', angle: -90, position: 'insideLeft', fill: '#F7F7F7' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F1F1F', border: '1px solid #D6A354' }}
              labelStyle={{ color: '#F7F7F7' }}
              itemStyle={{ color: '#D6A354' }}
              labelFormatter={(label) => `Día ${label}`}
            />
            <Bar dataKey="revenue" fill="#D6A354" name="Ingresos Diarios" />
            <Line type="monotone" dataKey="cumulativeRevenue" stroke="#F7F7F7" name="Ingresos Acumulados" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
