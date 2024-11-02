import type { Request, Response } from "express"
import Service from "../models/Service";
import { col, fn, Op } from "sequelize";
import Appointment from "../models/Appointment";
import AppointmentService from "../models/AppointmentService";

class ServiceController {

    public static getAllServices = async (request: Request, response: Response) => {
        try {
            const services = await Service.findAll();
            response.status(200).json(services);
        } catch (error) {
            const err = new Error('Oops! Something wrong happened');
            return response.status(500).json({ error: err.message })
        }
    }

    public static getServiceById = async (request: Request, response: Response) => {

        try {

            const serviceId = request.params.serviceId;

            const service = await Service.findByPk(serviceId);

            if (!service) {
                const error = new Error('Servicio no encontrado');
                return response.status(404).json({ error: error.message });
            }

            response.status(200).json(service);

        } catch (error) {
            const err = new Error('Oops! Something wrong happened');
            return response.status(500).json({ error: err.message })
        }

    }

    public static newService = async (request: Request, response: Response) => {
        try {
            const service = new Service(request.body);
            await service.save();
            response.status(201).json('Servicio agregado correctamente');

        } catch (error) {
            const err = new Error('Oops! Something wrong happened');
            return response.status(500).json({ error: err.message })

        }

    }

    public static updateService = async (request: Request, response: Response) => {

        try {
            const serviceId = request.params.serviceId;

            const service = await Service.findByPk(serviceId);

            if (!service) {
                const error = new Error('Servicio no encontrado');
                return response.status(404).json({ error: error.message });
            }

            //actualizar el servicio
            service.name = request.body.name;
            service.price = request.body.price;

            await service.save();

            response.status(200).json('Servicio actualizado correctamente');


        } catch (error) {
            const err = new Error('Oops! Something wrong happened');
            return response.status(500).json({ error: err.message })
        }
    }

    public static deleteService = async (request: Request, response: Response) => {

        try {
            const serviceId = request.params.serviceId;

            const service = await Service.findByPk(serviceId);

            if (!service) {
                const error = new Error('Servicio no encontrado');
                return response.status(404).json({ error: error.message });
            }

            await service.destroy();

            response.status(200).json('Servicio eliminado correctamente');

        } catch (error) {
            const err = new Error('Oops! Something wrong happened');
            return response.status(500).json({ error: err.message })
        }
    }

    public static getTopServices = async (request: Request, response: Response) => {
        try {
            const { period } = request.query as any;
            const today = new Date();
            let startDate: Date;
            let endDate: Date;
    
            // Determinar el rango de fechas según el periodo especificado
            switch (period) {
                case 'month':
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Último día del mes actual
                    break;
                case 'week':
                    startDate = new Date(today);
                    startDate.setDate(today.getDate() - today.getDay());
                    endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 6); // Último día de la semana
                    break;
                case 'day':
                    startDate = new Date(today);
                    startDate.setHours(0, 0, 0, 0); // Inicio del día
                    endDate = new Date(today);
                    endDate.setHours(23, 59, 59, 999); // Fin del día
                    break;
                default:
                    return response.status(400).json({ error: 'Invalid period specified.' });
            }
    
            console.log('Fecha de inicio:', startDate);
            console.log('Fecha de fin:', endDate);
    
            // Consulta a la base de datos para obtener los servicios más solicitados
            const topServices = await AppointmentService.findAll({
                include: [
                    {
                        model: Appointment,
                        where: {
                            date: { [Op.between]: [startDate, endDate] }
                        },
                        attributes: []
                    },
                    {
                        model: Service,
                        attributes: []
                    }
                ],
                attributes: [
                    'AppointmentService.serviceId',
                    [fn('COUNT', col('AppointmentService.serviceId')), 'count'],
                    [col('service.name'), 'name']
                ],
                limit: 3,
                group: ['AppointmentService.serviceId', 'Service.name'],
                order: [[fn('COUNT', col('AppointmentService.serviceId')), 'DESC']]    
            });
    
            response.status(200).json(topServices);
        } catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong.');
            return response.status(500).json({ error: err.message });
        }
    };
    
}

export default ServiceController;