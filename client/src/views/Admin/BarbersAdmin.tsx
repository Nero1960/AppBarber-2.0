import AddBarber from "@/components/admin/barbers/AddBarber";
import BarberTable from "@/components/admin/barbers/BarberTable";
import ChartBarbers from "@/components/admin/barbers/ChartBarbers";
import ConfirmModalBarber from "@/components/admin/barbers/ConfirmModalBarber";
import UpdateBarber from "@/components/admin/barbers/UpdateBarber";
import TopBarbersTable from "@/components/admin/TopBarbersTable";
import PaginationComponent from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useBarbersStore } from "@/store/barberStore";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BarbersAdmin = () => {
  const barbers = useBarbersStore((state) => state.barbers);
  const totalPages = Math.ceil(barbers.length / 4);
  const { currentPage, goToPage } = usePagination({
    totalPages,
  });

  const navigate = useNavigate();

  return (
    <>
      <Card className="border-none bg-brown-500">
        <CardHeader className="flex flex-col space-y-3 lg:flex-row lg:justify-between lg:items-center">
          <CardTitle className="text-[#D6A354]">Barberos</CardTitle>
          <Button
            onClick={() => navigate(location.pathname + `?addBarber`)}
            className="bg-[#D6A354] text-white-500 hover:bg-Primary-600"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Agregar Barbero
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="hover:bg-black-400">
              <TableRow className="hover:bg-black-400">
                <TableHead className="text-white-700">Barbero</TableHead>
                <TableHead className="text-white-700">Email</TableHead>
                <TableHead className="text-white-700">Teléfono</TableHead>
                <TableHead className="text-white-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barbers.map((barber) => (
                <BarberTable key={barber.barberId} barber={barber} />
              ))}
            </TableBody>
          </Table>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
          <ConfirmModalBarber />
        </CardContent>
      </Card>

      <AddBarber />
      <UpdateBarber />

      <div className="mt-5">
        <ChartBarbers/>
      </div>

      <div className="my-5">
        <TopBarbersTable />
      </div>

      
    </>
  );
};

export default BarbersAdmin;
