"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Service_1 = __importDefault(require("../models/Service"));
const AppointmentService_1 = __importDefault(require("../models/AppointmentService"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
class ServiceRepository {
    //Obtener todos los servicios
    async findAll() {
        return await Service_1.default.findAll();
    }
    async findById(id) {
        return await Service_1.default.findByPk(id);
    }
    async save(service) {
        return await service.save();
    }
    async update(id, data) {
        await Service_1.default.update({
            name: data.name,
            price: data.price
        }, {
            where: {
                serviceId: id
            }
        });
        return await this.findById(id);
    }
    async destroy(service) {
        await service.destroy();
    }
    async findTopServices(startDate, endDate) {
        return await AppointmentService_1.default.findAll({
            include: [
                {
                    model: Appointment_1.default,
                    where: {
                        date: { [sequelize_1.Op.between]: [startDate, endDate] },
                        status: 'completed'
                    },
                    attributes: []
                },
                {
                    model: Service_1.default,
                    attributes: []
                }
            ],
            attributes: [
                'serviceId',
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('AppointmentService.serviceId')), 'count'],
                // Corregido según tu modelo AppointmentService: declare service: Service;
                [(0, sequelize_1.col)('service.name'), 'name']
            ],
            limit: 3,
            // Corregido: Sincronizamos las tablas con el nombre exacto de la relación
            group: ['AppointmentService.serviceId', 'service.name'],
            order: [[(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('AppointmentService.serviceId')), 'DESC']],
            raw: true
        });
    }
}
exports.default = ServiceRepository;
//# sourceMappingURL=serviceRepository.js.map