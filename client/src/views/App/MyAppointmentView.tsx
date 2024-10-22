import { getAppointmentsUserAuth } from "@/api/AppointmentApi"
import { AppointmentList } from "@/components/app/appointment/AppointmentList"
import AppointmentModalCancel from "@/components/app/appointment/AppointmentModalCancel"
import {AppointmentModalDetails} from "@/components/app/appointment/AppointmentModalDetails"
import { useQuery } from "@tanstack/react-query"

const MyAppointmentView = () => {

    const { data } = useQuery({
        queryKey: ['myAppointments'],
        queryFn: getAppointmentsUserAuth,
        retry: false,
        refetchOnWindowFocus: false,
    })


    if (data) return (
        <main className="max-w-4xl px-8 lg:px-0 mx-auto my-10 animate-fade-up animation-delay-1000">
            <h1 className="text-white-500 font-heading text-3xl">Citas</h1>
            <p className="text-brown-200 text-sm lg:max-w-[50%] mt-2">A continuación, te presentamos los detalles de tus próximas citas con nuestro equipo de barberos.</p>

            <AppointmentList appointments={data}/>
            <AppointmentModalDetails />
            <AppointmentModalCancel/>
            
        </main>
    )
}

export default MyAppointmentView