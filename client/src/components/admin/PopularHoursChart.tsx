import { getPeakHours } from "@/api/ReportApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTime } from "@/utils/formatTime"
import { useQuery } from "@tanstack/react-query"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'



const COLORS = ['#D6A354', '#F7F7F7', '#A67B3D', '#8C6A33', '#5C4622']

export default function PopularHoursChart() {

    const { data: peakHours } = useQuery({
        queryKey: ['popularHours'],
        queryFn: getPeakHours,
        retry: false,
    })

    let data;

    if (peakHours) {
        data = peakHours?.map(peakHour => {
            return {
                name: `${formatTime(peakHour.hour + ':00')} - ${formatTime((peakHour.hour + 1) + ':00')}`,
                value: peakHour.appointment_count
            }
        })

    }


    if (data) return (
        <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none">
            <CardHeader>
                <CardTitle className="text-[#D6A354]">Horas Más Frecuentadas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] md:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={window.innerWidth < 768 ? 60 : 80} // Ajuste de radio
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F1F1F', border: '1px solid #D6A354' }}
                                itemStyle={{ color: '#F7F7F7' }}
                            />
                            <Legend
                                layout={window.innerWidth < 1024 ? 'horizontal' : 'vertical'}
                                verticalAlign="middle"
                                align="right"
                                wrapperStyle={{ color: '#F7F7F7' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

    )
}