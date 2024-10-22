import { useBarbers } from "@/hooks/useBarbers"
import { useBarbersStore } from "@/store/barberStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import ModalBarber from "./ModalBarber";
import { getBarberById } from "@/api/BarberApi";
import { Barber } from "@/types/index";
import { Navigate } from "react-router-dom";
import AnimationApp from "./AnimationApp";
import { Avatar } from "@chakra-ui/react";


const BarberApp = () => {

    const { data, isSuccess } = useBarbers();
    const setBarbers = useBarbersStore(state => state.setBarbers);
    const barbers = useBarbersStore(state => state.barbers);

    const [selectedBarber, setSelectedBarber] = useState<Barber['barberId']>();
    const [modal, setModal] = useState(false);


    useEffect(() => {
        if (isSuccess && data) {
            setBarbers(data);
        }
    }, [data, isSuccess]);

    const { data: barber, isError } = useQuery({
        queryKey: ['barber', selectedBarber],
        queryFn: () => getBarberById(selectedBarber!),
        enabled: !!selectedBarber,
    })

    const handleClickBarber = (barberId: Barber['barberId']) => {
        setSelectedBarber(barberId);
        setModal(true);
    }

    if (isError) return <Navigate to={'*'} />

    if (barbers) return (
        <AnimationApp>
            <div className="px-8 lg:px-0 py-20 bg-brown-500">
                <div className="max-w-4xl mx-auto">
                    <div className="service-info space-y-3 text-white-500 text-center">
                        <h2 className="text-white font-heading text-4xl">Nuestros Profesionales</h2>
                        <p className="text-xs leading-5 lg:w-[25rem] mx-auto">nuestros barberos están listos para ofrecerte el mejor servicio. Con una combinación de habilidad, creatividad y atención al detalle.</p>
                    </div>


                    <div className="grid lg:grid-cols-4 gap-2 mt-10">
                        {barbers.map(barber => (
                            <div
                                className="card bg-black-500 p-3 rounded-lg space-y-3 hover:bg-Primary-500   duration-300 text-white-500 hover:cursor-pointer"
                                key={barber.barberId}
                                onClick={() => handleClickBarber(barber.barberId)}

                            >
                                <div className="hidden md:flex image">
                                    <img src={`${import.meta.env.VITE_IMAGE_URL}/${barber.image}`} alt={`imagen barbero ${barber.name}`} className="h-72 lg:h-48 w-full object-cover rounded-lg" />
                                </div>

                                <div className="lg:hidden flex justify-center items-center">
                                    <Avatar
                                        size={'2xl'}
                                        name={barber.name}
                                        src={`${import.meta.env.VITE_IMAGE_URL}/${barber.image}`}

                                    />

                                </div>



                                <div className="text-center">
                                    <p className="font-heading text-sm">{barber.name}{" "}{barber.lastname}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {barber && <ModalBarber barber={barber} modal={modal} setModal={setModal} />}
                </div>
            </div>
        </AnimationApp>
    )
}

export default BarberApp