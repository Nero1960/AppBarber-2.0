export type UserType = {
    name: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
}

export type Services = {
    serviceId: number,
    name: string,
    price: number,
}

export type TopServices = {
    name: string,
    count: number
}

export type Appointment = {
    appointmentId: number,
    barberId: number,
    userId: number,
    date: Date,
    time: string
}