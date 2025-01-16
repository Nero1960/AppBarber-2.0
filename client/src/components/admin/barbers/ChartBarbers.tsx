import { barberAppointmentData, barberPercentage } from "@/api/BarberApi";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CardHeader from "rsuite/esm/Card/CardHeader";

const ChartBarbers = () => {

  const { data } = useQuery({
    queryKey: ["barberData"],
    queryFn: barberAppointmentData,
    retry: false,
  });

  const { data : revenueData} = useQuery({
    queryKey: ["barberPercentage"],
    queryFn: barberPercentage,
    retry: false,
    enabled: true
  })

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  //Obtener
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-[#1F1F1F] border-none p-1 lg:p-5">
        <CardHeader>
          <CardTitle className="text-[#D6A354]">
            Comparación de Citas por Barbero
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-10">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#F7F7F7">
                  <Label value={"Nombre"}  position="insideBottom" offset={-5} className="mt-5 text-sm"/>
                </XAxis>
                <YAxis stroke="#F7F7F7">
                  <Label value={"Total Citas"} angle={-90} position="insideLeft" style={{textAnchor:'middle'}} className="text-sm"/>
                </YAxis>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F0F0F",
                    border: "1px solid #D6A354",
                  }}
                  labelStyle={{ color: "#D6A354" }}
                />
                <Bar dataKey="appointments" fill="#D6A354" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1F1F1F] border-none lg:p-5">
          <CardHeader>
            <CardTitle className="text-[#D6A354]">Porcentaje de Ingresos por Barbero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  
                  <Legend wrapperStyle={{ color: '#F7F7F7' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default ChartBarbers;
