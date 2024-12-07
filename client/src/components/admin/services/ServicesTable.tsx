import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, PlusCircle, Trash2 } from 'lucide-react'
import { useServicesStore } from "@/store/serviceStore"
import { formatToCordobas } from "@/utils/formatToCordobas";
import { useNavigate } from "react-router-dom";
import ServiceUpdateModal from "./ServiceUpdateModal";
import ServiceAddModal from "./ServiceAddModal";
import { Service } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { deleteServiceById } from "@/api/ServiceApi";
import { toast } from "sonner";

export default function ServicesTable() {

    const services = useServicesStore(state => state.services);
    const deleteService = useServicesStore(state => state.deleteService);
    const navigate = useNavigate();


    const { mutate } = useMutation({
        mutationFn: deleteServiceById,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data);
        }
    })

    const handleClickDeleteService = (serviceId: Service['serviceId']) => {
        let confirmDelete = confirm('Estas seguro de eliminar el servicio?');

        if (confirmDelete) {
            mutate(serviceId);
            deleteService(serviceId);
        }
    }

    return (
        <div className="bg-[#1F1F1F] p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#D6A354]">Servicios</h2>
                <Button
                    onClick={() => navigate(location.pathname + `?addModal=true`)}
                    className="bg-[#D6A354] text-white-500 hover:bg-Primary-600"
                >
                    <PlusCircle className="h-5 w-5 mr-2" />
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
                    {services.map((service) => (
                        <TableRow key={service.serviceId} className="hover:bg-black-400">
                            <TableCell className="text-[#F7F7F7]">{service.name}</TableCell>
                            <TableCell className="text-[#F7F7F7]">{formatToCordobas(service.price)}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-Primary-500 text-white-500 hover:bg-Primary-600 border-none hover:text-white-500 duration-300"
                                        onClick={() => navigate(location.pathname + `?serviceId=${service.serviceId}`)}
                                    >
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Editar
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="bg-red-500 text-white-500 hover:bg-red-600 hover:text-white-500 duration-300 border-none"
                                        onClick={() => handleClickDeleteService(service.serviceId)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Eliminar
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ServiceUpdateModal />
            <ServiceAddModal />
        </div>
    )
}