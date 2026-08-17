"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_1 = __importDefault(require("../models/Appointment"));
const AppointmentService_1 = __importDefault(require("../models/AppointmentService"));
const Barber_1 = __importDefault(require("../models/Barber"));
const Service_1 = __importDefault(require("../models/Service"));
class AppointmentRepository {
    async save(appointment, services) {
        //Almacena la cita en la base de datos
        await appointment.save();
        //Almacena los servicios de la cita en la base de datos
        await Promise.all(services.map(async (serviceId) => {
            const service = await Service_1.default.findByPk(+serviceId);
            const price = service.price;
            const appointmentService = new AppointmentService_1.default({
                appointmentId: appointment.appointmentId,
                serviceId: service.serviceId,
                current_price: price
            });
            await appointmentService.save();
        }));
    }
    async findByUser(userId) {
        return await Appointment_1.default.findAll({
            where: { userId },
            include: [
                {
                    model: Barber_1.default,
                    attributes: ['name', 'lastname', 'image', 'barberId']
                },
                {
                    model: Service_1.default,
                    attributes: ['name', 'serviceId'],
                    through: {
                        attributes: ['current_price']
                    }
                }
            ],
            attributes: ['date', 'time', 'status', 'appointmentId'],
            order: [['date', 'ASC'], ['time', 'ASC']]
        });
    }
    async findByAppointmentId(appointmentId) {
        return await Appointment_1.default.findOne({
            where: { appointmentId },
            include: [
                {
                    model: Barber_1.default,
                    attributes: ['name', 'lastname', 'image', 'barberId']
                },
                {
                    model: Service_1.default,
                    attributes: ['name', 'serviceId'],
                    through: {
                        attributes: ['current_price']
                    }
                }
            ],
            attributes: ['date', 'time', 'status', 'appointmentId'],
        });
    }
    async findById(appointmentId, userId) {
        return await Appointment_1.default.findOne({
            where: {
                appointmentId,
                userId
            },
            include: [
                {
                    model: Barber_1.default,
                    attributes: ['name', 'lastname', 'image', 'barberId']
                },
                {
                    model: Service_1.default,
                    attributes: ['name', 'serviceId'],
                    through: {
                        attributes: ['current_price']
                    }
                }
            ],
            attributes: ['date', 'time', 'status', 'appointmentId']
        });
    }
    async update(appointmentId, appointment, services) {
        await AppointmentService_1.default.destroy({ where: { appointmentId } });
        await Promise.all(services.map(async (serviceId) => {
            const service = await Service_1.default.findByPk(+serviceId);
            const price = service.price;
            const appointmentService = new AppointmentService_1.default({
                appointmentId,
                serviceId,
                current_price: price
            });
            await appointmentService.save();
        }));
        await appointment.save();
    }
    async saveCancelAppointment(appointment) {
        // Actualiza el estado de la cita a "cancelled"
        appointment.status = "cancelled";
        // Guarda los cambios en la base de datos
        await appointment.save();
    }
    async saveCancellationReason(cancellationReasonData) {
        await cancellationReasonData.save();
    }
    async destroy(appointmentId, appointment) {
        await AppointmentService_1.default.destroy({
            where: {
                appointmentId
            }
        });
        await appointment.destroy();
    }
}
exports.default = AppointmentRepository;
//# sourceMappingURL=appointmentRepository.js.map