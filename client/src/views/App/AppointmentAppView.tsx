import { useAuthStore } from "@/store/authStore";
import { useBarbersStore } from "@/store/barberStore";
import { useServicesStore } from "@/store/serviceStore";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { GrFormPreviousLink } from "react-icons/gr";
import SelectedServicesAppointment from "@/components/app/appointment/SelectedServicesAppointment";
import AppointMentForm from "@/components/app/appointment/AppointMentForm";
import { useNavigate, useParams } from "react-router-dom";
import { AppointmentsForm } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAppointment, getAppointmentById, updateAppointment } from "@/api/AppointmentApi";
import { toast } from "sonner";
import AppointmentMutate from "@/components/app/appointment/AppointmentMutate";


const AppointmentAppView = () => {

    //Estados Globales
    const user = useAuthStore(state => state.user);
    const barbers = useBarbersStore(state => state.barbers);
    const services = useServicesStore(state => state.services);

    //Verificar el ID a actualizar
    const params = useParams();
    const appointmentId = parseInt(params.appointmentId!);

    //Consultar la cita a actualizar
    const { data } = useQuery({
        queryKey: ['editAppointment', appointmentId],
        queryFn: () => getAppointmentById(appointmentId),
        enabled: !!appointmentId,
        retry: false,
        refetchOnWindowFocus: false
    })

    //Manejar el estado para los saltos de componentes
    const [step, setStep] = useState<number>(1);

    //Manejar el estado de la información de la cita, pasar como props a los componentes
    const [selectedServices, setSelectedServices] = useState<number[]>([])
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedBarber, setSelectedBarber] = useState<number>();

    //si existe el data esta en actualizar
    useEffect(() => {
        if (data) {
            setSelectedServices(data.services.map(service => service.serviceId));
            setSelectedBarber(data.barbero.barberId);
            setSelectedDate(data.date);
            setSelectedTime(data.time);
        }
    }, [data])


    //Enviar al usuario a otra sección
    const navigate = useNavigate();

    //Obtener los servicios seleccionados
    const servicesSelectedComplete = useMemo(
        () => services.filter(service => selectedServices.includes(service.serviceId)),
        [services, selectedServices]
    );

    //Obtener el barbero seleccionado
    const barberSelectedComplete = useMemo(
        () => barbers.find(barber => barber.barberId === selectedBarber),
        [barbers, selectedBarber]
    );

    //Valores iniciales del react hook form
    const initialValues: AppointmentsForm = {
        userId: user ? user.userId : 0,
        barberId: selectedBarber!,
        date: selectedDate,
        time: selectedTime,
        services: selectedServices,
    }

    //implementación de react-hook-form
    const { register, handleSubmit, setValue } = useForm<AppointmentsForm>({
        defaultValues: initialValues
    });

    const queryClient = useQueryClient();

    //Cuando se carga el componente establece los valores que se mostraran al usuario
    useEffect(() => {
        if (user) {
            setValue('userId', user.userId);
            setValue('barberId', selectedBarber!);
            setValue('date', selectedDate);
            setValue('time', selectedTime);
            setValue('services', selectedServices);
        }

    }, [user, selectedBarber, selectedDate, selectedTime, setValue, selectedServices]);

    //UseMutation hacia la función que reserva la cita
    const { mutate, isPending } = useMutation({
        mutationFn: createAppointment,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['myAppointments'] })
            toast.success(data);
            navigate('/app/my-appointment');
        }
    })

    //Mutación hacia la función que actualizar la cita
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
        mutationFn: updateAppointment,
        onError: (error) => {
            toast.error(error.message)
        },

        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['myAppointments'] })
            navigate('/app/my-appointment');
        }
    })


    //mutar los datos de la cita
    const handleSubmitAppointment = (data: AppointmentsForm) => mutate(data);

    //mutar la actualización de la cita
    const handleSubmitAppointmentUpdate = (formData: AppointmentsForm) => {
        const data = {
            appointmentId: appointmentId,
            formData
        }
        mutateUpdate(data);
    };

    //Saltos de paginas
    const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
    const handlePrevious = () => setStep(prev => Math.max(prev - 1, 1));


    if (user) return (

        <main className="bg-appointment animate-fade-up px-8 lg:px-0 mt-8 lg:mt-0">
            <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr' }} className="max-w-4xl mx-auto w-full items-center py-10 lg:py-20">
                <GridItem>
                    <h1
                        className="text-white-500 font-bold text-4xl font-heading text-center"
                    >
                        {data ? 'Actualizar Cita' : 'Reservar Cita'}
                    </h1>
                    <p className="text-sm text-brown-200 lg:max-w-[30rem] mx-auto leading-5 mt-5 text-center">
                        {data ? "Actualiza y programa tu cita a un horario que se ajuste a ti, recuerda leer la política de citas de Mojica's Barbershop " : 'Reserva tu cita de manera sencilla y asegura tu lugar para una experiencia personalizada.'}
                    </p>


                    <img src={'/logo1.png'} alt="logo" width={140} height={140} className="flex justify-center items-center mx-auto" />
                </GridItem>

                <GridItem>
                    {step === 1 && (
                        <SelectedServicesAppointment setSelectedServices={setSelectedServices} selectedServices={selectedServices} handleNext={handleNext} />
                    )}

                    {step === 2 && (
                        <AppointMentForm handleNext={handleNext} handlePrevious={handlePrevious}
                            setSelectedDate={setSelectedDate} setSelectedBarber={setSelectedBarber} setSelectedTime={setSelectedTime} selectedDate={selectedDate} selectedTime={selectedTime} selectedBarber={selectedBarber}
                        />
                    )}

                    {step === 3 && (
                        <div className="animate-fade-up my-10 max-w-3xl mx-auto">
                            <h2 className="text-white-500 text-3xl font-heading mb-3 text-center font-bold">Resumen de tu Cita</h2>
                            <p className="text-brown-200 leading-5 lg:max-w-[30rem] mx-auto text-sm text-center mt-2">
                                Este es un resumen de tu cita, puedes regresar si no estas de acuerdo con los datos.
                            </p>

                            <form
                                noValidate
                                onSubmit={data ? handleSubmit(handleSubmitAppointmentUpdate) : handleSubmit(handleSubmitAppointment)}
                                className="bg-black-500 px-5 lg:px-12 py-10 rounded-md mt-5"
                            >

                                <AppointmentMutate
                                    barberSelectedComplete={barberSelectedComplete}
                                    servicesSelectedComplete={servicesSelectedComplete}
                                    register={register}
                                    selectedTime={selectedTime}
                                    selectedDate={selectedDate}
                                />


                                <div className='flex justify-end gap-x-2'>
                                    <button
                                        className="bg-transparent border flex items-center gap-x-3 border-white-900 text-white-500 placeholder:text-brown-200 py-2 px-4 mt-5 rounded-sm hover:bg-Primary-500 hover:text-white-500 duration-300 text-sm disabled:cursor-not-allowed"
                                        onClick={handlePrevious}
                                    >
                                        <GrFormPreviousLink className='text-lg' />
                                        Anterior
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex items-center gap-x-3 bg-Primary-500 border-none text-white-500 placeholder:text-brown-200 py-2 px-4 mt-5 rounded-sm hover:bg-Primary-600 hover:text-white-500 duration-300 text-sm disabled:cursor-not-allowed"
                                    >
                                        {data ? 'Actualizar la cita' : 'Reservar la cita'}
                                    </button>
                                </div>
                                {isPending || isPendingUpdate && (
                                    <div className='flex items-center justify-center my-3'>
                                        <Spinner />
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </GridItem>
            </Grid>
        </main>
    )
}

export default AppointmentAppView