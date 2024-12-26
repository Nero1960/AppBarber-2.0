import { useAuthStore } from "@/store/authStore"
import { AppointmentsForm, Barber, Services } from "@/types/index"
import { formatDate } from "@/utils/formatDate"
import { formatTime } from "@/utils/formatTime"
import { formatToCordobas } from "@/utils/formatToCordobas"
import { FormLabel, Grid, Input } from "@chakra-ui/react"
import { UseFormRegister } from "react-hook-form"
import FormGroup from "rsuite/esm/FormGroup"



type AppointmentMutateProps = {
    register: UseFormRegister<AppointmentsForm>,
    barberSelectedComplete: Barber | undefined,
    servicesSelectedComplete: Services,
    selectedDate: string,
    selectedTime: string
}


const AppointmentMutate = ({ register, barberSelectedComplete, servicesSelectedComplete, selectedDate, selectedTime }: AppointmentMutateProps) => {

    const user = useAuthStore(state => state.user);
    console.log(selectedDate)

    if (user) return (
        <>
            <Grid gridTemplateColumns={{ base: '1fr', lg: 'repeat(2,1fr)' }} gap={4}>
                <FormGroup>
                    <FormLabel color={'white'}>Cliente</FormLabel>
                    <Input
                        type="text"
                        readOnly={true}
                        defaultValue={user.name}
                        bg={'#1f1f1f'}
                        color={'white'}
                        borderColor={'transparent'}
                        _focus={{ borderColor: 'white' }}
                    />
                    <Input
                        type="hidden"
                        id="userId"
                        defaultValue={user.userId}
                        {...register('userId')}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel
                        color={'white'}
                    >
                        Barbero
                    </FormLabel>
                    <Input
                        id="barberId"
                        bg={'#1f1f1f'}
                        color={'white'}
                        borderColor={'transparent'}
                        _focus={{ borderColor: 'white' }}
                        defaultValue={`${barberSelectedComplete?.name} ${barberSelectedComplete?.lastname}`}
                        type="text"
                        readOnly={true}
                    />
                    <Input
                        type="hidden"
                        id="barberId"
                        bg={'white'}
                        color={'black'}
                        disabled
                        {...register('barberId')}
                    />
                </FormGroup>
            </Grid>

            <Grid gridTemplateColumns={{ base: '1fr', lg: 'repeat(2,1fr)' }} gap={4} marginTop={5}>
                <FormGroup>
                    <FormLabel color={'white'}>Fecha</FormLabel>
                    <Input
                        id="date"
                        defaultValue={formatDate(selectedDate)}
                        bg={'#1f1f1f'}
                        color={'white'}
                        borderColor={'transparent'}
                        _focus={{ borderColor: 'white' }}
                        readOnly={true}
                    />

                    <Input
                        type="hidden"
                        id="date"
                        bg={'white'}
                        color={'black'}
                        disabled
                        {...register('date')}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel color={'white'}>Hora</FormLabel>
                    <Input
                        id="time"
                        defaultValue={formatTime(selectedTime)}
                        bg={'#1f1f1f'}
                        color={'white'}
                        borderColor={'transparent'}
                        _focus={{ borderColor: 'white' }}
                        readOnly={true}
                    />
                    <Input
                        type="hidden"
                        id="time"
                        defaultValue={formatTime(selectedTime)}
                        bg={'white'}
                        color={'black'}
                        disabled
                        {...register('time')}
                    />
                </FormGroup>
            </Grid>

            <FormGroup className="mt-5">
                <FormLabel color={'white'}>Servicios Seleccionados</FormLabel>
                <div className="grid lg:grid-cols-2 mt-2 gap-5" {...register('services')}>
                    {servicesSelectedComplete.map(service => (
                        <div
                            key={service.serviceId}
                            className={`py-8 px-5 rounded-lg flex justify-center items-center  hover:translate-x-1 hover:translate-y-1  duration-300 bg-brown-500`}
                        >
                            <div className="">
                                <img src={'/logo1.png'} alt="icono barbero" width={60} height={60} />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <p className="font-heading  text-white-500 text-lg">{service.name}</p>
                                <p className="text-xs text-white-400">Tu estilo es nuestra pasión</p>
                            </div>
                        </div>
                    ))}
                </div>
            </FormGroup>

            <p className="mt-5 text-white-500 font-bold text-lg">Total a Pagar: <span className="text-Primary-500 text-2xl">{formatToCordobas(servicesSelectedComplete.reduce((total, service) => total + service.price, 0))}</span> </p>

        </>
    )
}

export default AppointmentMutate