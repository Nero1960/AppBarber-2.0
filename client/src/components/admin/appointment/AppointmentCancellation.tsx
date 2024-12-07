import { getCancellationReasonsData, getStatusData } from "@/api/ReportApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type renderCustomizedLabelType = {
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number,
    percent: number

}

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#D6A354']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: renderCustomizedLabelType) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

export default function AppointmentCancellation() {

    const { data: statusData } = useQuery({
        queryKey: ['appointmentCancellationReason'],
        queryFn: getStatusData,
        retry: false,
        enabled: true
    })

    const { data: cancellationReasons } = useQuery({
        queryKey: ['cancellationReasons'],
        queryFn: getCancellationReasonsData,
        retry: false,
        enabled: true
    });


    const totalAppointments = statusData?.reduce((sum, item) => sum + item.value, 0)
    const cancelledAppointments = statusData?.find(item => item.name === 'cancelled')?.value || 0
    const cancellationRate = (cancelledAppointments / totalAppointments! * 100).toFixed(2)

    return (
        <div className="grid gap-4 md:grid-cols-2 mb-10">
            <Card className="col-span-2 bg-[#1F1F1F] border-none">
                <CardHeader>
                    <CardTitle className="text-[#D6A354] text-2xl font-bold">Resumen de Citas Canceladas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0F0F0F] rounded-lg">
                            <p className="text-[#F7F7F7] text-sm">Total de Citas</p>
                            <p className="text-[#D6A354] text-3xl font-bold">{totalAppointments}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0F0F0F] rounded-lg">
                            <p className="text-[#F7F7F7] text-sm">Citas Canceladas</p>
                            <p className="text-[#D6A354] text-3xl font-bold">{cancelledAppointments}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-[#0F0F0F] rounded-lg">
                            <p className="text-[#F7F7F7] text-sm">Tasa de Cancelación</p>
                            <p className="text-[#D6A354] text-3xl font-bold">{cancellationRate}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[#1F1F1F] border-none">
                <CardHeader>
                    <CardTitle className="text-[#D6A354] text-xl font-bold">Estado de las Citas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {cancellationReasons && (
                <Card className="bg-[#1F1F1F] border-none">
                    <CardHeader>
                        <CardTitle className="text-[#D6A354] text-xl font-bold">Motivos de Cancelación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cancellationReasons} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" />
                                    <YAxis dataKey="reason" type="category" width={150} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0F0F0F', border: '1px solid #D6A354' }} />
                                    <Legend />
                                    <Bar dataKey="count" fill="#D6A354" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}


        </div>
    )
}