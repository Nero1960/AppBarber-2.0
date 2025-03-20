import AppError from "../errors/AppError";
import { IServiceRepository } from "../interfaces/repositories/IServiceRepository";
import { IServiceService } from "../interfaces/services/IServiceService";
import Service from "../models/Service";
import { Services, TopServices } from "../types";

class ServiceService implements IServiceService {

    constructor(private serviceRepository: IServiceRepository) { }

    async getServices() {
        const services = await this.serviceRepository.findAll();
        return services;
    }

    async getServiceById(id: Service["serviceId"]): Promise<Service | null> {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new AppError('Servicio no encontrado', 404);
        }
        return service;
    }

    async createService(data: Pick<Service, "name" | "price">): Promise<Services> {
        const service = new Service(data);
        return await this.serviceRepository.save(service);
    }

    async updateService(id: Service["serviceId"], data: Pick<Service, "name" | "price">): Promise<Pick<Service, 'serviceId' | 'name' | 'price'>> {
        await this.getServiceById(id);
        return await this.serviceRepository.update(id, data);
        
    }

    async deleteService(id: Service["serviceId"]): Promise<void> {
        const service = await this.getServiceById(id);
        await this.serviceRepository.destroy(service)
    }

    getStartEndDate(period: string) {
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
                throw new AppError('Periodo no valido', 400)
        }

        return {
            startDate: startDate,
            endDate: endDate
        }
    }

    async getTopServices(period: string): Promise<TopServices[]> {
        const { startDate, endDate } = this.getStartEndDate(period);
        return await this.serviceRepository.findTopServices(startDate, endDate)
    }
}

export default ServiceService;