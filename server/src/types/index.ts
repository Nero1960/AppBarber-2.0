export type Services = {
    serviceId: number,
    name: string,
    price: number,
}

export type Appointment = {
    appointmentId: number,
    barberId: number,
    userId: number,
    date: Date,
    time: string
}