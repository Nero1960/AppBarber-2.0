import { col, fn, literal } from "sequelize";
import { IBarberRepository } from "../interfaces/repositories/IBarberRepository";
import Barber from "../models/Barber";
import { BarberData, BarberIncome, BarberType } from "../types";
import Appointment from "../models/Appointment";
import AppointmentService from "../models/AppointmentService";

class BarberRepository implements IBarberRepository {
    async findAll(): Promise<Barber[]> {
        return await Barber.findAll()
    }

    async findById(id: Barber["barberId"]): Promise<Barber> {
        return await Barber.findByPk(id);
    }

    async save(barber: BarberType, image: string): Promise<Barber> {
        const newBarber = await Barber.create({
            name: barber.name,
            lastname: barber.lastname,
            email: barber.email,
            phone: barber.phone,
            specialty: barber.specialty,
            image: image
        })

        return await newBarber.save();
    }

    async update(barber: BarberType, image: string, id: Barber["barberId"]): Promise<Barber> {
        await Barber.update(
            {
                name: barber.name,
                lastname: barber.lastname,
                email: barber.email,
                phone: barber.phone,
                specialty: barber.specialty,
                image: image
            },
            {
                where: {
                    barberId: id,
                },
            },
        )

        return await this.findById(id)
    }

    async findByEmail(email: Barber["email"]): Promise<Barber> {
        return await Barber.findOne({
            where: {
                email
            }
        })
    }


    async destroy(barber: Barber): Promise<void> {
        await barber.destroy();
    }

  async  barberData(): Promise<BarberData[]> {
    const barbers = await Barber.findAll({
        attributes: [
            'barberId',
            'name',
            // 1. Corregido: Usamos 'appointment' en singular igual que en tu modelo Barber
            [fn('COUNT', col('appointment.appointmentId')), 'appointmentsCount']
        ],
        include: [
            {
                model: Appointment,
                as: 'appointment', // 2. Corregido: Sincronizado en singular
                attributes: [],
                where: { status: 'completed' },
                required: false // LEFT JOIN para mantener barberos con 0 citas
            }
        ],
        group: ['Barber.barberId', 'Barber.name'],
        order: [[literal('appointmentsCount'), 'DESC']],
        raw: true
    });

    // Mapeo plano seguro
    return barbers.map((barbero: any) => ({
        barberId: barbero.barberId,
        name: barbero.name,
        appointments: parseInt(barbero.appointmentsCount, 10) || 0
    }));
}

  async  barberIncome(): Promise < BarberIncome[] > {
    const barbers = await AppointmentService.findAll({
        attributes: [
            [col('appointment.barberId'), 'barberId'],
            [fn('SUM', col('current_price')), 'totalValue'],
        ],
        include: [
            {
                model: Appointment,
                as: 'appointment', // Aseguramos el alias de la relación
                attributes: [],
                where: { status: 'completed' },
                include: [
                    {
                        model: Barber,
                        as: 'barbero', // El alias exacto que pusiste en Appointment: declare barbero : Barber;
                        attributes: ['name'], // Le permitimos traer el name dentro de su objeto anidado
                    },
                ],
            },
        ],
        // Agrupamos respetando la estructura de herencia de Sequelize
        group: [
            'appointment.barberId',
            'appointment->barbero.barberId',
            'appointment->barbero.name'
        ],
        order: [[literal('totalValue'), 'DESC']],
        raw: true,
        nest: true // Hace que los includes se vuelvan sub-objetos limpios
    });

    // Corregimos el mapeo para leer la estructura anidada real que genera nest: true
    return barbers.map((barbero: any) => {
        return {
            barberId: barbero.barberId,
            // Acceso seguro al objeto anidado: barbero -> appointment -> barbero -> name
            name: barbero.appointment?.barbero?.name || 'Sin Nombre',
            value: parseFloat(barbero.totalValue) || 0
        };
    });
}

}

export default BarberRepository;