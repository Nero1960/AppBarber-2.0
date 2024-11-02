import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Clock3Icon, CalendarDaysIcon} from 'lucide-react'
import { useQuery } from "@tanstack/react-query"
import { getTopBarbers } from "@/api/ReportApi"
import { formatToCordobas } from "@/utils/formatToCordobas"

export default function TopBarbersTable() {

    const { data } = useQuery({
        queryKey: ['topBarbers'],
        queryFn: getTopBarbers,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: true,  // Enable the query when the component mounts and unmounts
    })

    console.log(data)
    if(data)return (
        <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none">
            <CardHeader>
                <CardTitle className="text-[#D6A354]">Barberos Más Solicitados</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-black-400">
                            <TableHead className="w-[100px] text-brown-200">Barbero</TableHead>
                            <TableHead className='text-brown-200'>Nombre</TableHead>
                            <TableHead>
                                <div className="flex items-center text-brown-200">
                                    <CalendarIcon className="mr-2 h-4 w-4 text-[#D6A354]" />
                                    Este mes
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center text-brown-200">
                                    <CalendarDaysIcon className="mr-2 h-4 w-4 text-[#D6A354]" />
                                    Esta semana
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center text-brown-200">
                                    <Clock3Icon className="mr-2 h-4 w-4 text-[#D6A354]" />
                                    Hoy
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((barber) => (
                            <TableRow key={barber.barberId} className="hover:bg-black-400">
                                <TableCell className="font-medium">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_URL}/${barber.image}`} alt={barber.name} />
                                        <AvatarFallback>{barber.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{barber.name} {barber.lastname}</TableCell>
                                <TableCell>
                                    <div>{barber.monthlyClients} clientes</div>
                                    <div className="text-[#D6A354] flex items-center">
                                        {formatToCordobas(barber.monthRevenue!)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>{barber.weeklyClients} clientes</div>
                                    <div className="text-[#D6A354] flex items-center">
                                        {formatToCordobas(barber.weeklyRevenue!)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>{barber.dailyClients} clientes</div>
                                    <div className="text-[#D6A354] flex items-center">
                                        {formatToCordobas(barber.dailyRevenue!)}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}