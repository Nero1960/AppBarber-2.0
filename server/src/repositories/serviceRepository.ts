import { col, fn, Op } from "sequelize";
import { IServiceRepository } from "../interfaces/repositories/IServiceRepository";
import Service from "../models/Service";
import AppointmentService from "../models/AppointmentService";
import Appointment from "../models/Appointment";
import { Services } from "../types";

class ServiceRepository implements IServiceRepository {
    //Obtener todos los servicios
    async findAll(): Promise<Service[]> {
        return await Service.findAll()
    }

    async findById(id: Service['serviceId']): Promise<Service | null> {
        return await Service.findByPk(id)
    }

    async save(service: Service): Promise<Services> {
        return await service.save()
    }

    async update(id: Service["serviceId"], data: Pick<Service, "name" | "price">) : Promise<Services> {
         await Service.update(
            {
                name: data.name,
                price: data.price
            },
            {
                where: {
                    serviceId: id
                }
            },
        )
        return await this.findById(id)
    }

    async destroy(service: Service): Promise<void> {
        await service.destroy();
    }

    async findTopServices(startDate: Date, endDate: Date) {
    return await AppointmentService.findAll({
        include: [
            {
                model: Appointment,
                where: {
                    date: { [Op.between]: [startDate, endDate] },
                    status: 'completed'
                },
                attributes: []
            },
            {
                model: Service,
                attributes: []
            }
        ],
        attributes: [
            'serviceId',
            [fn('COUNT', col('AppointmentService.serviceId')), 'count'],
            // Corregido según tu modelo AppointmentService: declare service: Service;
            [col('service.name'), 'name'] 
        ],
        limit: 3,
        // Corregido: Sincronizamos las tablas con el nombre exacto de la relación
        group: ['AppointmentService.serviceId', 'service.name'],
        order: [[fn('COUNT', col('AppointmentService.serviceId')), 'DESC']],
        raw: true 
    });
}
}

export default ServiceRepository;