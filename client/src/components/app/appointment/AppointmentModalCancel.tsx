import { cancelAppointment, cancellationAppointmentMessage } from "@/api/AppointmentApi";
import MessageError from "@/components/MessageError";
import { useAuthStore } from "@/store/authStore";
import { AppointmentCancellationForm } from "@/types/index";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Input
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner";


const AppointmentModalCancel = () => {

    const user = useAuthStore(status => status.user);
    const [modalCancelForm, setModalCancelForm] = useState<boolean>(false);

    //Obtener el ID de la cita de la URL
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const appointmentId = +queryParam.get('CancelAppointment')!;

    const navigate = useNavigate();

    //Mutación para cancelar la cita
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: cancelAppointment,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            setModalCancelForm(true);
            queryClient.invalidateQueries({ queryKey: ['myAppointments'] });
        }
    })

    //react-hook-form para el formulario de motivo de cancelación
    const { register, handleSubmit, formState: { errors } } = useForm<AppointmentCancellationForm>();

    //Definir los motivos de cancelación
    const cancellationReasons = ['Personal', 'Salud', 'Imprevisto', 'Otro'];

    //Mutación para agregar los motivos de cancelación
    const { mutate: mutateCancellation } = useMutation({
        mutationFn: cancellationAppointmentMessage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            navigate(location.pathname, { replace: true })
            toast.success(data);
        }
    })

    //Función para mutar el formulario de motivo de cancelación
    const handleSubmitCancellationAppointment = (formData: AppointmentCancellationForm) => mutateCancellation(formData);

    const showModal = appointmentId ? true : false;

    return (
        <>
            <Modal
                size={'lg'}
                onClose={() => navigate(location.pathname, { replace: true })} 
                isOpen={showModal} 
                isCentered
            >
                <ModalOverlay />
                <ModalContent bg="#1f1f1f" color={'#f7f7f7'} padding={5}>
                    <ModalHeader className='font-heading text-white-500'>Cancelación de Cita</ModalHeader>
                    <ModalCloseButton border={'none'} />
                    <ModalBody>
                        <p>Estas seguro que quieres cancelar tu cita?</p>
                    </ModalBody>
                    <ModalFooter className="flex gap-x-3">
                        <button
                            type="button"
                            className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
                            onClick={() => mutate(appointmentId)}
                        >
                            Confirmar
                        </button>

                        <button
                            type="button"
                            className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
                            onClick={() => navigate(location.pathname, { replace: true })}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {modalCancelForm && (
                <Modal
                    size={'lg'}
                    onClose={() => navigate(location.pathname, { replace: true })} isOpen={showModal} isCentered
                >
                    <ModalOverlay />
                    <ModalContent bg="#1f1f1f" color={'#f7f7f7'} padding={5}>
                        <ModalHeader 
                            className='font-heading text-center text-white-500'
                        >
                            ¿Dinos Por que has cancelado tu cita?
                        </ModalHeader>
                        <p 
                            className="text-sm text-center lg:w-[70%] mx-auto text-brown-200">
                                En Mojica's Barbershop nos gustaría saber el motivo por el cual has cancelado tu cita.
                        </p>
                        <ModalCloseButton border={'none'} />
                        <ModalBody>
                            <form
                                noValidate
                                className="mt-2 space-y-3"
                                onSubmit={handleSubmit(handleSubmitCancellationAppointment)}
                            >

                                <Input
                                    type="hidden"
                                    id="userId"
                                    defaultValue={user?.userId}
                                    {...register('userId', {
                                        valueAsNumber: true
                                    })}
                                />

                                <Input
                                    type="hidden"
                                    id="appointmentId"
                                    defaultValue={appointmentId}
                                    {...register('appointmentId', {
                                        valueAsNumber: true
                                    })}
                                />

                                <div>
                                    <select
                                        id="cancellation_reason"
                                        className="w-full text-brown-200 px-4 py-2 rounded-md border border-white-800 bg-brown-500 text-sm"
                                        {...register('cancellation_reason', {
                                            required: 'Selecciona un motivo'
                                        })}
                                    >
                                        <option value="">Selecciona un motivo</option>
                                        {cancellationReasons.map((cancellationReason, index) => (
                                            <option
                                                key={index}
                                                value={cancellationReason}
                                            >
                                                {cancellationReason}
                                            </option>
                                        ))}

                                    </select>

                                    {errors.cancellation_reason && <MessageError>{errors.cancellation_reason.message}</MessageError>}
                                </div>

                                <Textarea
                                    resize={"none"}
                                    fontSize={'sm'}
                                    id="additional_comments"
                                    height={'10rem'}
                                    color={'#a6a6a6 '}
                                    borderColor={'#636363'}
                                    focusBorderColor="#636363"
                                    _hover={{ borderColor: 'none' }}
                                    placeholder="Escribe el motivo por el cual has cancelado tu cita"
                                    _placeholder={{ color: '#a6a6a6' }}
                                    {...register('additional_comments', {
                                        required: 'Escribe un texto adicional'
                                    })}
                                />

                                {errors.additional_comments && <MessageError>{errors.additional_comments.message}</MessageError>}

                                <div className="flex justify-end gap-x-3">
                                    <button
                                        type="submit"
                                        className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-Primary-500 px-4 py-2 rounded-md text-white-500 text-sm hover:bg-Primary-600 duration-300"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}

export default AppointmentModalCancel