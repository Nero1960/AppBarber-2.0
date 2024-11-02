import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTopServices } from '@/api/ServiceApi'

export default function TopServicesChart() {
  const [timeRange, setTimeRange] = useState('month');

  const { data } = useQuery({
    queryKey: ['topServices'],
    queryFn: () => getTopServices(timeRange),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!timeRange,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['topServices']})

  }, [timeRange])


  if(data) return (
    <Card className="w-full bg-brown-500 text-white-500 border-none lg:col-span-2 lg:row-span-4 lg:col-start-4">
      <CardHeader className="flex flex-col items-start space-y-6 pb-2">
        <CardTitle className="text-[#D6A354]">Servicios Más Solicitados</CardTitle>
        <Select 
          value={timeRange} 
          onValueChange={setTimeRange}
        >
          <SelectTrigger className="w-[180px] bg-[#0F0F0F] border-[#D6A354] text-[#F7F7F7]">
            <SelectValue placeholder="Seleccionar período" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
            <SelectItem value="week" className="hover:bg-[#D6A354] hover:text-[#0F0F0F]">Esta semana</SelectItem>
            <SelectItem value="month" className="hover:bg-[#D6A354] hover:text-[#0F0F0F]">Este mes</SelectItem>
            <SelectItem value="day" className="hover:bg-[#D6A354] hover:text-[#0F0F0F]">Este dia</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <XAxis type="number" stroke="#F7F7F7" />
            <YAxis dataKey="name" type="category" stroke="#F7F7F7" width={100} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F1F1F', border: '1px solid #D6A354' }}
              labelStyle={{ color: '#F7F7F7' }}
              itemStyle={{ color: '#D6A354' }}
            />
            <Bar dataKey="count" fill="#D6A354" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}