import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, Trash2, Calendar, Clock, ListRestartIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAppointments } from "@/api/ReportApi";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { useBarbersStore } from "@/store/barberStore";
import { useNavigate } from "react-router-dom";
import { AppointmentModalDetailsAdmin } from "./AppointmentModalDetailsAdmin";
import { statusTranslation } from "@/lib/StatusTranslate";
import {
  AllAppointments,
  Appointments,
  AppointmentStatus,
} from "@/types/index";
import { useEffect, useState } from "react";
import { deleteAppointment } from "@/api/AppointmentApi";
import { toast } from "sonner";
import { usePagination } from "@/hooks/usePagination";
import PaginationComponent from "@/components/Pagination";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "cancelled":
      return "bg-red-500 hover:bg-red-600";
    case "completed":
      return "bg-green-500 hover:bg-green-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

export default function AppointmentsTable() {
  //Filtrado de citas
  const [appointmentsByStatus, setAppointmentsByStatus] =
    useState<AllAppointments>([]);
  const [appointmentsByDate, setAppointmentsByDate] = useState<AllAppointments>(
    []
  );
  const [appointmentByBarbers, setAppointmentsByBarbers] =
    useState<AllAppointments>([]);
  const [allAppointments, setAllAppointments] = useState<AllAppointments>([]);

  const totalPages = Math.ceil(allAppointments.length / 4);
  const statuses = ["pending", "cancelled", "completed"];
  const barbers = useBarbersStore((state) => state.barbers);
  const { currentPage, goToPage } = usePagination({
    totalPages,
  });

  //Query para los filtros de la cita
  const [queryStatus, setQueryStatus] = useState<string>("");
  const [queryDate, setQueryDate] = useState<string>("");
  const [queryBarber, setQueryBarber] = useState<string>("");

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAllAppointments,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteAppointment,
    onError: (error) => {
      toast.error(error.message);
    },

    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({
        queryKey: ["appointmentCancellationReason"],
      });
      queryClient.invalidateQueries({ queryKey: ["cancellationReasons"] });
    },
  });

  const handleClickDeleteAppointment = (
    appointmentId: Appointments["appointmentId"]
  ) => mutate(appointmentId);

  const appointmentStatusHandleChange = (e: AppointmentStatus) => {
    setQueryStatus(e);
    setAppointmentsByStatus(
      data!.filter((appointment) => appointment.status === e)
    );
  };

  const appointmentsDateHandleChange = (e: string) => {
    setQueryDate(e);
    setAppointmentsByDate(
      data!.filter((appointment) => appointment.date === e)
    );
  };

  const appointmentsBarbersHandleChange = (e: string) => {
    setQueryBarber(e);
    setAppointmentsByBarbers(
      data!.filter((appointment) => appointment.barbero.name === e)
    );
  };

  const updateAllAppointments = () => {
    if (queryDate) {
      setAllAppointments(appointmentsByDate);
    } else if (queryStatus) {
      setAllAppointments(appointmentsByStatus);
    } else if (queryBarber) {
      setAllAppointments(appointmentByBarbers);
    } else {
      setAllAppointments(data || []); // Si ninguna tiene datos, asignar el data original
    }
  };

  useEffect(() => {
    updateAllAppointments();
  }, [queryStatus, queryDate, queryBarber, data]);

  const handleClickReset = () => {
    setQueryStatus("");
    setQueryDate("");
    setQueryBarber("");

    setAppointmentsByBarbers([]);
    setAppointmentsByDate([]);
    setAppointmentsByStatus([]);
  };

  const currentAppointments = allAppointments.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  if (data)
    return (
      <>
        <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none mb-5">
          <CardHeader>
            <CardTitle className="text-[#D6A354]">
              Vista de todas las citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between md:flex-row ">
              <div className="flex flex-col gap-4 mb-4 md:flex-row">
                <Select
                  value={queryStatus}
                  onValueChange={appointmentStatusHandleChange}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-[#0F0F0F] text-[#F7F7F7] border-white-500">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F1F1F] text-[#F7F7F7]">
                    {statuses.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="hover:bg-[#D6A354] hover:text-[#0F0F0F]"
                      >
                        {statusTranslation[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Input
                    name="date"
                    value={queryDate}
                    id="date"
                    onChange={(e) =>
                      appointmentsDateHandleChange(e.target.value)
                    }
                    type="date"
                    placeholder="Filtrar por fecha"
                    className="bg-[#0F0F0F] text-[#F7F7F7] border-white-500"
                  />
                </div>
                <Select
                  value={queryBarber}
                  onValueChange={(e) => appointmentsBarbersHandleChange(e)}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-[#0F0F0F] text-[#F7F7F7] border-white-500">
                    <SelectValue placeholder="Filtrar por barbero" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F1F1F] text-[#F7F7F7] border-[#D6A354]">
                    {barbers.map((barber) => (
                      <SelectItem
                        key={barber.barberId}
                        value={barber.name}
                        className="hover:bg-[#D6A354] hover:text-[#0F0F0F]"
                      >
                        {barber.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="flex items-center my-0 bg-transparent border hover:bg-white-500 hover:text-black-500 gap-x-1 border-white-500"
                size={"sm"}
                onClick={handleClickReset}
              >
                Restart
                <ListRestartIcon />
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-black-400">
                    <TableHead className="text-white-700">Cliente</TableHead>
                    <TableHead className="text-white-700">Fecha</TableHead>
                    <TableHead className="text-white-700">Estado</TableHead>
                    <TableHead className="text-white-700">Barbero</TableHead>
                    <TableHead className="text-white-700">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.appointmentId}
                      className="hover:bg-[#2A2A2A] transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={`${import.meta.env.VITE_IMAGE_URL}/${
                                appointment.user.image
                              }`}
                              alt={appointment.user.image}
                            />
                            <AvatarFallback>
                              {appointment.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>
                              {appointment.user.name}{" "}
                              {appointment.user.lastname}
                            </p>
                            <p className="font-bold opacity-30">
                              {appointment.user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="flex flex-col space-y-2">
                        <div className="flex items-center gap-x-1">
                          <Calendar className="text-xs text-brown-200" />
                          {formatDate(appointment.date)}
                        </div>

                        <div className="flex items-center gap-x-1">
                          <Clock className="text-brown-200" />
                          {formatTime(appointment.time)}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            appointment.status
                          )} text-white`}
                        >
                          {statusTranslation[appointment.status]}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={`${import.meta.env.VITE_IMAGE_URL}/${
                                appointment.barbero.image
                              }`}
                              alt={appointment.barbero.image}
                            />
                            <AvatarFallback>
                              {appointment.barbero.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{appointment.barbero.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-Primary-500 border-none text-[#0F0F0F] hover:bg-[#B88A45] hover:text-[#F7F7F7]"
                            onClick={() =>
                              navigate(
                                location.pathname +
                                  `?ViewAppointment=${appointment.appointmentId}`
                              )
                            }
                          >
                            <Eye className="w-4 h-4 text-white-500" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-white bg-red-500 border-none hover:bg-red-600"
                            onClick={() =>
                              handleClickDeleteAppointment(
                                appointment.appointmentId
                              )
                            }
                          >
                            <Trash2 className="w-4 h-4 text-white-50" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          </CardContent>
        </Card>

        <AppointmentModalDetailsAdmin />
      </>
    );
}
