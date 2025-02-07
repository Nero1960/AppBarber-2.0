import { getCustomersLastMonth, getTotalAppointmentMonth, getTotalServicesMonth } from "@/api/CustomerApi";
import { getAllAppointments } from "@/api/ReportApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Scissors, Users } from "lucide-react";

export default function CardCustomer({totalCustomer} : {totalCustomer : number}) {

  const { data } = useQuery({
    queryKey: ['customerLastMonth'],
    queryFn: getCustomersLastMonth,
    retry: false
  })

  const { data : appointments} = useQuery({
    queryKey: ['lastAppointmentMonth'],
    queryFn: getTotalAppointmentMonth,
    retry: false
  })

  const { data : services} = useQuery({
    queryKey: ['lastServicesMonth'],
    queryFn: getTotalServicesMonth,
    retry: false
  })

  const { data: allAppointments } = useQuery({
    queryKey: ['appointmentsAdmin'],
    queryFn: getAllAppointments,
    retry: false,
    enabled: true
  })

  return (
    <>
      <Card className="border-none bg-brown-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-Primary-500">
            Total de Clientes
          </CardTitle>
          <Users className="w-4 h-4 text-Primary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white-500">{totalCustomer}</div>
          <p className="text-xs text-muted-foreground text-white-700">
            {data} clientes agregados este mes
          </p>
        </CardContent>
      </Card>

      <Card className="border-none bg-brown-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-Primary-500">
            Total de citas
          </CardTitle>
          <CalendarDays className="w-4 h-4 text-Primary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white-500">{allAppointments?.length}</div>
          <p className="text-xs text-muted-foreground text-white-700">
            {appointments} citas realizadas este mes
          </p>
        </CardContent>
      </Card>
      
      <Card className="border-none bg-brown-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-Primary-500">
            Servicios realizados
          </CardTitle>
          <Scissors className="w-4 h-4 text-Primary-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white-500">{services}</div>
          <p className="text-xs text-muted-foreground text-white-700">
            servicios realizados este mes
          </p>
        </CardContent>
      </Card>

    </>
  );
}
