import { useLocation, useNavigate } from "react-router-dom"
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from "@chakra-ui/react"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getServiceById,  updateServiceAdmin } from "@/api/ServiceApi";
import { useForm } from "react-hook-form";
import { Service } from "@/types/index";
import MessageError from "@/components/MessageError";
import { useEffect } from "react";
import { toast } from "sonner";
import { useServicesStore } from "@/store/serviceStore";

const ServiceUpdateModal = () => {

    const updateService = useServicesStore(state => state.updateService);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const serviceId = +queryParams.get('serviceId')!;

    const navigate = useNavigate();


    const { data } = useQuery({
        queryKey: ['service', serviceId],
        queryFn: () => getServiceById(serviceId),
        enabled:!!serviceId, //Ejecutar cuando haya un serviceID
        retry: false,
        refetchOnWindowFocus: false,
    })

    const initialValue = {
        name: '',
        price: 0
    }


    const {register, formState: {errors}, handleSubmit, reset} = useForm<Service>({
        defaultValues: initialValue
    });

    useEffect(() => {
        if(data) {
            reset({
                name: data.name,
                price: data.price
            })
        } else {
            reset()
        }
        // eslint-disable-next-line

    }, [data, reset]);

    const { mutate } = useMutation({
        mutationFn: updateServiceAdmin,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {

            if(data){
                toast.success('Se ha actualizado un servicio');
                updateService(data);
                navigate(location.pathname, { replace: true });
            }
            
        }
    })


    const handleSubmitUpdateService = ( formData : Service) => {
        const data = {
            serviceId,
            formData
        }
        mutate(data)
    }

    const showModal = serviceId ? true : false;

    if(data)return (
        <Modal
            size={'lg'}
            onClose={() => navigate(location.pathname, { replace: true })}
            isOpen={showModal}
            isCentered
        >
            <ModalOverlay />
            <ModalContent bg="#1f1f1f" color={'#f7f7f7'} padding={5}>
                <ModalCloseButton border={'none'} />
                <form 
                    noValidate 
                    onSubmit={handleSubmit(handleSubmitUpdateService)}
                > 
                    <ModalBody>
                        <h2 className="text-2xl font-bold text-[#D6A354] mb-6">Actualizar Servicio</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[#F7F7F7]">Nombre del Servicio</Label>
                                <Input
                                    id="name"
                                    placeholder="Ingrese el nombre del servicio"
                                    className="w-full bg-[#0F0F0F] text-[#F7F7F7] border-white-800 focus:ring-brown-200 focus:border-brown-200 placeholder:text-white-800"
                                    {...register('name', {
                                        required: 'El nombre del servicio es requerido'
                                    })}
                                />
                                {errors.name && <MessageError>{errors.name.message}</MessageError>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-[#F7F7F7]">Precio</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="Ingrese el nuevo precio"
                                    className="w-full bg-[#0F0F0F] text-[#F7F7F7] placeholder:text-white-800 border-white-800 focus:ring-brown-200 focus:border-brown-200"
                                    min="0"
                                    {...register('price', {
                                        required: 'El precio es requerido',
                                        valueAsNumber: true,
                                        min: {
                                            value: 0,
                                            message: 'El precio no puede ser negativo'
                                        }
                                    })}
                                />
                                {errors.price && <MessageError>{errors.price.message}</MessageError>}
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter className="flex gap-x-3">
                        <button
                            type="submit"
                            className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
                        >
                            Guardar Cambios
                        </button>

                        <button
                            type="button"
                            className="bg-red-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-red-600 duration-300"
                            onClick={() => navigate(location.pathname, { replace: true })}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default ServiceUpdateModal