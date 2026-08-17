"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const Service_1 = __importDefault(require("../models/Service"));
class ServiceService {
    serviceRepository;
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async getServices() {
        const services = await this.serviceRepository.findAll();
        return services;
    }
    async getServiceById(id) {
        const service = await this.serviceRepository.findById(id);
        if (!service) {
            throw new AppError_1.default('Servicio no encontrado', 404);
        }
        return service;
    }
    async createService(data) {
        const service = new Service_1.default(data);
        return await this.serviceRepository.save(service);
    }
    async updateService(id, data) {
        await this.getServiceById(id);
        return await this.serviceRepository.update(id, data);
    }
    async deleteService(id) {
        const service = await this.getServiceById(id);
        await this.serviceRepository.destroy(service);
    }
    getStartEndDate(period) {
        const today = new Date();
        let startDate;
        let endDate;
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
                throw new AppError_1.default('Periodo no valido', 400);
        }
        return {
            startDate: startDate,
            endDate: endDate
        };
    }
    async getTopServices(period) {
        const { startDate, endDate } = this.getStartEndDate(period);
        return await this.serviceRepository.findTopServices(startDate, endDate);
    }
}
exports.default = ServiceService;
//# sourceMappingURL=serviceService.js.map