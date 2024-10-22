import { Calendar } from 'rsuite';
import '../../../css/calendar.css'
import { parse as parseDate } from '@formkit/tempo';
import 'rsuite/Calendar/styles/index.css';
import { useAuthStore } from "@/store/authStore";
import { useBarbersStore } from "@/store/barberStore";
import { FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr';
import { toast } from 'sonner';
import { formatTime } from '@/utils/formatTime';

type AppointMentFormProps = {
    handleNext: () => void;
    handlePrevious: () => void;
    setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
    setSelectedBarber: React.Dispatch<React.SetStateAction<number | undefined>>
    selectedDate: string;
    selectedTime: string;
    selectedBarber: number | undefined;
};

const AppointMentForm = ({
    handleNext,
    handlePrevious,
    setSelectedTime,
    setSelectedDate,
    setSelectedBarber,
    selectedBarber,
    selectedDate,
    selectedTime
}: AppointMentFormProps) => {

    const barbers = useBarbersStore(state => state.barbers);
    const user = useAuthStore(state => state.user);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const time: string[] = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    let disabled = true;

    const handleDateChange = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setSelectedTime('')

        if (date >= today) {
            setSelectedDate(formatDate(date));
        } else {
            toast.warning('No puedes seleccionar una fecha pasada.', {
                position: 'bottom-right'
            });
            setSelectedDate('');
        }
    };


    const handleTimeSelect = (hour: string) => {
        const currentDate = new Date();
        const selectedDateObj = new Date(`${selectedDate}T${hour}`);

        // Verificar si la fecha seleccionada es hoy
        const isToday = formatDate(currentDate) === selectedDate;

        // Verificar si la hora seleccionada es mayor a la hora actual si la fecha es hoy
        if (isToday && selectedDateObj.getTime() <= currentDate.getTime()) {
            toast.error('La hora seleccionada debe ser mayor a la hora actual.', {
                position: 'bottom-right'
            });
            setSelectedTime('')
            return;
        }

        setSelectedTime(hour);
    };


    if (selectedBarber && selectedDate && selectedTime) {
        disabled = false;
    }

    return (
        <div className="animate-fade-up my-10 bg-black-500 py-10 px-8">
            <h1 className="text-white-500 font-bold text-3xl  text-center mb-3">
                Elige tu Barbero, Fecha y Hora
            </h1>
            <p className="text-brown-200 leading-5 lg:max-w-[30rem] mx-auto text-sm text-center mt-2">
                Personaliza tu Cita: Selecciona el Barbero, la Fecha y la Hora que Mejor se Ajusten a Ti
            </p>
            <Grid gridTemplateColumns={{ base: '1fr', lg: 'repeat(2,1fr)' }} gap={4} marginTop={8}>
                <FormControl>
                    <FormLabel fontSize="smaller" color="white" htmlFor="name">
                        Nombre de usuario
                    </FormLabel>
                    <Input
                        type="text"
                        readOnly
                        id="name"
                        fontSize="small"
                        bg={'#1f1f1f'}
                        color={'white'}
                        borderColor={'transparent'}
                        _focus={{ borderColor: 'white' }}
                        defaultValue={user?.name}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize="smaller" color="white" htmlFor="barber">
                        Selecciona el Barbero
                    </FormLabel>
                    <select
                        id="barber"
                        className='bg-brown-500  text-white-500 text-sm rounded-md w-full py-3 px-5'
                        value={selectedBarber ? selectedBarber : ''}
                        onChange={e => setSelectedBarber(+e.target.value)}
                    >
                        <option value={''}> Selecciona un barbero </option>
                        {barbers.map(barber => (
                            <option className='' key={barber.barberId} value={barber.barberId}>
                                {barber.name}
                            </option>
                        ))}
                    </select>
                </FormControl>
            </Grid>

            <Grid gridTemplateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4} marginTop={7}>

                <FormControl>
                    <FormLabel fontSize="smaller" color="white" htmlFor="barber">
                        Fecha de la cita
                    </FormLabel>
                    <Calendar
                        value={selectedDate ? parseDate(selectedDate) : new Date()}
                        onChange={handleDateChange}
                        className="rounded-md"
                        compact
                    />
                </FormControl>

                <FormControl>
                    <FormLabel fontSize="smaller" color="white" htmlFor="time">
                        Hora de la cita
                    </FormLabel>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-5 lg:grid-cols-3 lg:gap-6 mt-4">
                        {time.map(hour => (
                            <div
                                key={hour}
                                className={`${selectedTime === hour
                                    ? 'bg-Primary-500 text-white-500'
                                    : 'bg-brown-500 text-white-500'
                                    } duration-500 px-6 cursor-pointer py-3 rounded-lg text-center hover:translate-x-1 hover:translate-y-1`}
                                onClick={() => handleTimeSelect(hour)}
                            >
                                {formatTime(hour)}
                            </div>
                        ))}
                    </div>
                </FormControl>
            </Grid>

            <div className="flex justify-end gap-x-2">
                <button
                    className="bg-transparent border flex items-center gap-x-3 border-white-900 text-white-500 placeholder:text-brown-200 py-2 px-4 mt-5 rounded-sm hover:bg-Primary-500 hover:text-white-500 duration-300 text-sm disabled:cursor-not-allowed disabled:bg-gray-300"
                    onClick={handlePrevious}
                >
                    <GrFormPreviousLink className="text-lg" />
                    Anterior
                </button>

                <button
                    disabled={disabled}
                    className="bg-transparent border flex items-center gap-x-3 border-white-900 text-white-500 placeholder:text-brown-200 py-2 px-4 mt-5 rounded-sm hover:bg-Primary-500 hover:text-white-500 duration-300 text-sm disabled:cursor-not-allowed"
                    onClick={handleNext}
                >
                    Siguiente
                    <GrFormNextLink className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default AppointMentForm;
