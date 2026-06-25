import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { statusTranslation } from "@/lib/StatusTranslate";
import { AllAppointments, AppointmentStatus } from "@/types/index";

interface Props {
  appointments: AllAppointments;
  onStatusChange: (appointmentId: number, newStatus: AppointmentStatus) => void;
}

export default function AppointmentKanban({ appointments, onStatusChange }: Props) {
  const columns: { id: AppointmentStatus; title: string; color: string }[] = [
    { id: "pending", title: "Pendientes", color: "border-t-4 border-t-yellow-500" },
    { id: "completed", title: "Completadas", color: "border-t-4 border-t-green-500" },
    { id: "cancelled", title: "Canceladas", color: "border-t-4 border-t-red-500" },
  ];

  // 1. Al iniciar el arrastre, guardamos el ID de la cita en el evento de transferencia
  const handleDragStart = (e: React.DragEvent, appointmentId: number) => {
    e.dataTransfer.setData("text/plain", appointmentId.toString());
  };

  // 2. Permitir que los elementos se puedan soltar sobre la columna
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 3. Al soltar el elemento en la columna destino
  const handleDrop = (e: React.DragEvent, nextStatus: AppointmentStatus) => {
    e.preventDefault();
    const appointmentIdStr = e.dataTransfer.getData("text/plain");
    if (appointmentIdStr) {
      const appointmentId = parseInt(appointmentIdStr, 10);
      onStatusChange(appointmentId, nextStatus);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-[500px]">
      {columns.map((column) => {
        const filtered = appointments.filter(
          (appointment) => appointment.status === column.id
        );

        return (
          <Card
            key={column.id}
            className={`bg-brown-500 border-none flex flex-col ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-[#D6A354] flex justify-between items-center text-lg">
                <span>{column.title}</span>
                <Badge className="bg-[#0F0F0F] text-[#D6A354] border border-[#D6A354]">
                  {filtered.length}
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[600px] p-3">
              {filtered.map((appointment) => (
                <div
                  key={appointment.appointmentId}
                  draggable // <-- Hace que el div sea arrastrable
                  onDragStart={(e) => handleDragStart(e, appointment.appointmentId)}
                  className="bg-brown-500 p-4 rounded-lg border border-white-800 hover:border-[#D6A354] transition-all cursor-grab active:cursor-grabbing shadow-md group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-[#F7F7F7] group-hover:text-[#D6A354] transition-colors">
                      {appointment.user.name} {appointment.user.lastname}
                    </p>
                  </div>
                  
                  <p className="text-xs text-white-700 opacity-60 mb-3">
                    Barbero: <span className="text-[#F7F7F7]">{appointment.barbero.name}</span>
                  </p>

                  <div className="flex flex-col gap-1 text-xs text-white-700 opacity-80 border-t border-white-900 pt-2">
                    <div className="flex items-center gap-x-1">
                      <Calendar className="w-3 h-3 text-[#D6A354]" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <Clock className="w-3 h-3 text-[#D6A354]" />
                      <span>{formatTime(appointment.time)}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="border-2 border-dashed border-white-900 rounded-lg p-8 text-center text-white-800 text-sm flex-1 flex items-center justify-center">
                  Suelte citas aquí
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}