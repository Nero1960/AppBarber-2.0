import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarCheck, Phone, Mail } from 'lucide-react'
import { useQuery } from "@tanstack/react-query"
import { getTopCustomers } from "@/api/ReportApi"
import { formatDate } from "@/utils/formatDate"

export default function TopCustomersTable() {

    const { data } = useQuery({
        queryKey: ['topCustomers'],
        queryFn: getTopCustomers,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: true,  // Enable the query when the component mounts and unmounts
    })

    if(data)return (
        <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none">
            <CardHeader>
                <CardTitle className="text-[#D6A354]">Clientes Más Frecuentes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-black-400">
                                <TableHead className="w-[100px] text-brown-200">Cliente</TableHead>
                                <TableHead className="text-brown-200">Nombre Completo</TableHead>
                                <TableHead className="text-brown-200">Contacto</TableHead>
                                <TableHead>
                                    <div className="flex items-center text-brown-200">
                                        <CalendarCheck className="mr-2 h-4 w-4 text-[#D6A354]" />
                                        Total Citas
                                    </div>
                                </TableHead>
                                <TableHead className="text-brown-200">Última Cita</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((customer) => (
                                <TableRow key={customer.userId} className="hover:bg-[#2A2A2A] transition-colors">
                                    <TableCell className="font-medium">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`${import.meta.env.VITE_IMAGE_URL}/${customer.user.image}`} alt={customer.user.name} />
                                            <AvatarFallback>{customer.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{customer.user.name} {customer.user.lastname}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="flex items-center">
                                                <Phone className="mr-2 h-4 w-4 text-[#D6A354]" />
                                                {customer.user.phone}
                                            </span>
                                            <span className="flex items-center mt-1">
                                                <Mail className="mr-2 h-4 w-4 text-[#D6A354]" />
                                                {customer.user.email}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-[#D6A354] text-[#0F0F0F]">
                                            {customer.totalAppointments}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formatDate(customer.lastAppointment)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}