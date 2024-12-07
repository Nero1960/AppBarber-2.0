import { AppointmentServices } from "@/types/index"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { statusTranslation } from "@/lib/StatusTranslate"
import AppointmentListCard from "./AppointmentListCard"

type myAppointmentListProps = {
    appointments: AppointmentServices
}

type GroupedAppointments = {
    [keyof: string]: AppointmentServices
}

const initialStatusGroups: GroupedAppointments = {
    pending: [],
    cancelled: [],
    completed: []
}

const statusStyle: { [key: string]: string } = {
    pending: '#D6A354',
    cancelled: '#ef4444',
    completed: ' #22c55e'
}

export const AppointmentList = ({ appointments }: myAppointmentListProps) => {

    const groupedTasks = appointments.reduce((acc, appointment) => {
        let currentGroup = acc[appointment.status] ? [...acc[appointment.status]] : [];
        currentGroup = [...currentGroup, appointment]
        return { ...acc, [appointment.status]: currentGroup };
    }, initialStatusGroups);


    return (
        <Tabs marginTop={5} variant="enclosed" className={`${appointments.length === 0 ? 'h-screen' : 'h-auto'}`}>
            {appointments.length !== 0 ? (
                <>
                    <TabList width={'auto'} color={'white'} border={'none'}>
                        {Object.keys(groupedTasks).map((status) => (
                            <Tab fontSize={'small'} key={status} _selected={{ color: "white", bg: `${statusStyle[status]}` }}>
                                {statusTranslation[status]}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels marginTop={5}>

                        {Object.entries(groupedTasks).map(([status, appointments]) => (
                            <TabPanel key={status} padding={0} marginY={5}>
                                <ul className="space-y-5">
                                    {appointments.length !== 0 ? (
                                        appointments.map(appointment =>
                                            <AppointmentListCard
                                                appointment={appointment}
                                                key={appointment.appointmentId}
                                            />)
                                    ) : (
                                        <p className="text-white-500 ms-3">No hay citas aquí</p>
                                    )}
                                </ul>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </>
            ) : (
                <p className="text-white-500">No tienes citas reservadas</p>
            )}

        </Tabs>
    )
}
