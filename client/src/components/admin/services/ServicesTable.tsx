import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useServicesStore } from "@/store/serviceStore";
import { formatToCordobas } from "@/utils/formatToCordobas";
import { useNavigate } from "react-router-dom";
import ServiceUpdateModal from "./ServiceUpdateModal";
import ServiceAddModal from "./ServiceAddModal";
import PaginationComponent from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import ServiceConfirmModal from "./ServiceConfirmModal";

export default function ServicesTable() {
  const services = useServicesStore((state) => state.services);
  const navigate = useNavigate();
  const totalPages = Math.ceil(services.length / 4);
  const { currentPage, goToPage } = usePagination({
    totalPages,
  });

  //Obtener los servicios actuales
  const currentServices = services.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  return (
    <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
      <div className="flex flex-col mb-6 space-y-3 lg:flex-row lg:justify-between lg:items-center">
        <h2 className="text-2xl font-bold text-[#D6A354]">Servicios</h2>
        <Button
          onClick={() => navigate(location.pathname + `?addModal=true`)}
          className="bg-[#D6A354] text-white-500 hover:bg-Primary-600"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Agregar Servicio
        </Button>
      </div>
      <Table>
        <TableHeader className="hover:bg-black-400">
          <TableRow className="hover:bg-black-400">
            <TableHead className="text-brown-200">Nombre</TableHead>
            <TableHead className="text-brown-200">Precio</TableHead>
            <TableHead className="text-brown-200">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentServices.map((service) => (
            <TableRow key={service.serviceId} className="hover:bg-black-400">
              <TableCell className="text-[#F7F7F7]">{service.name}</TableCell>
              <TableCell className="text-[#F7F7F7]">
                {formatToCordobas(service.price)}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="duration-300 border-none bg-Primary-500 text-white-500 hover:bg-Primary-600 hover:text-white-500"
                    onClick={() =>
                      navigate(
                        location.pathname + `?serviceId=${service.serviceId}`
                      )
                    }
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="duration-300 bg-red-500 border-none text-white-500 hover:bg-red-600 hover:text-white-500"
                    onClick={() =>
                      navigate(
                        location.pathname +
                          `?serviceDeleteId=${service.serviceId}`
                      )
                    }
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
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
      <ServiceConfirmModal />
      <ServiceUpdateModal />
      <ServiceAddModal />
    </div>
  );
}
