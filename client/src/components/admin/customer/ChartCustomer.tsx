import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentData } from "@/types/index";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type ChartCustomerProps = {
  data: AppointmentData;
};

export default function ChartCustomer({ data }: ChartCustomerProps) {
  const monthsInSpanish = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
  };

  const newData = data.map((item) => ({
    ...item,
    month: monthsInSpanish[item.month as keyof typeof monthsInSpanish],
  }));

  return (
    <Card className="col-span-4 border-none bg-brown-500">
      <CardHeader>
        <CardTitle className="text-Primary-500 ">Visitas de Clientes</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={newData}>
            <XAxis
              dataKey="month"
              stroke="#fff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              label={{
                value: "Meses", // Etiqueta del eje X
                position: "insideBottom", // Posición de la etiqueta
                offset: -5, // Espaciado desde el eje
                fill: "#fff", // Color del texto
                fontSize: 14, // Tamaño de la fuente
              }}
            />
            <YAxis
              stroke="#fff"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              label={{
                value: "Total citas", // Etiqueta del eje Y
                angle: -90, // Gira la etiqueta para alinearse verticalmente
                position: "insideLeft", // Posición de la etiqueta
                offset: 5, // Espaciado desde el eje
                fill: "#fff", // Color del texto
                fontSize: 14, // Tamaño de la fuente
              }}
            />
            <Bar
              dataKey="totalAppointments"
              fill="#D6A354"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
