import Appointment from "../models/Appointment";

export const barberAvailable = async (barberId: number, date: Date, hour: string): Promise<boolean> => {
    try {
        // Obtener la fecha y hora exactas de la cita solicitada
        const dateForm = new Date(date);

        // Verificar si existe una cita para el mismo barbero en la misma fecha y hora exacta
        const appointmentExist = await Appointment.findOne({
            where: {
                barberId,
                date: dateForm,
                time: hour
            }
        });

        // Si ya existe una cita para ese barbero en esa fecha y hora exacta, el barbero está ocupado
        return !appointmentExist;

    } catch (error) {
        return false; // Retornar falso en caso de error
    }
}