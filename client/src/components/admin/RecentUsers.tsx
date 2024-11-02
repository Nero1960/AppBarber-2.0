import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { getRecentUsers } from "@/api/ReportApi"


export default function RecentUsers() {

    const { data : recentUsers } = useQuery({
        queryKey: ['recentUsers'],
        queryFn: getRecentUsers,
        retry: false,
        refetchOnWindowFocus: false,
        enabled: true,  // Enable the query when the component mounts and unmounts
    });


    if(recentUsers) return (
        <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] lg:col-span-2 lg:row-span-2 lg:col-start-4 row-start-5 border-none">
            <CardHeader>
                <CardTitle className="text-[#D6A354]">Últimos Clientes Registrados</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-white-500">Usuario</TableHead>
                            <TableHead className="text-white-500">Nombre</TableHead>
                            <TableHead className="text-white-500">Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentUsers.map((recentUser) => (
                            <TableRow key={recentUser.userId}>
                                <TableCell className="font-medium">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={`${import.meta.env.VITE_IMAGE_URL}/${recentUser.image}`} alt={recentUser.name} />
                                        <AvatarFallback>{recentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{recentUser.name} {recentUser.lastname}</TableCell>
                                <TableCell>{recentUser.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}