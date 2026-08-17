"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Barber_1 = __importDefault(require("../models/Barber"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
const AppointmentService_1 = __importDefault(require("../models/AppointmentService"));
class BarberRepository {
    async findAll() {
        return await Barber_1.default.findAll();
    }
    async findById(id) {
        return await Barber_1.default.findByPk(id);
    }
    async save(barber, image) {
        const newBarber = await Barber_1.default.create({
            name: barber.name,
            lastname: barber.lastname,
            email: barber.email,
            phone: barber.phone,
            specialty: barber.specialty,
            image: image
        });
        return await newBarber.save();
    }
    async update(barber, image, id) {
        await Barber_1.default.update({
            name: barber.name,
            lastname: barber.lastname,
            email: barber.email,
            phone: barber.phone,
            specialty: barber.specialty,
            image: image
        }, {
            where: {
                barberId: id,
            },
        });
        return await this.findById(id);
    }
    async findByEmail(email) {
        return await Barber_1.default.findOne({
            where: {
                email
            }
        });
    }
    async destroy(barber) {
        await barber.destroy();
    }
    async barberData() {
        const barbers = await Barber_1.default.findAll({
            attributes: [
                'barberId',
                'name',
                // 1. Corregido: Usamos 'appointment' en singular igual que en tu modelo Barber
                [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('appointment.appointmentId')), 'appointmentsCount']
            ],
            include: [
                {
                    model: Appointment_1.default,
                    as: 'appointment', // 2. Corregido: Sincronizado en singular
                    attributes: [],
                    where: { status: 'completed' },
                    required: false // LEFT JOIN para mantener barberos con 0 citas
                }
            ],
            group: ['Barber.barberId', 'Barber.name'],
            order: [[(0, sequelize_1.literal)('appointmentsCount'), 'DESC']],
            raw: true
        });
        // Mapeo plano seguro
        return barbers.map((barbero) => ({
            barberId: barbero.barberId,
            name: barbero.name,
            appointments: parseInt(barbero.appointmentsCount, 10) || 0
        }));
    }
    async barberIncome() {
        const barbers = await AppointmentService_1.default.findAll({
            attributes: [
                [(0, sequelize_1.col)('appointment.barberId'), 'barberId'],
                [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('current_price')), 'totalValue'],
            ],
            include: [
                {
                    model: Appointment_1.default,
                    as: 'appointment', // Aseguramos el alias de la relación
                    attributes: [],
                    where: { status: 'completed' },
                    include: [
                        {
                            model: Barber_1.default,
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
            order: [[(0, sequelize_1.literal)('totalValue'), 'DESC']],
            raw: true,
            nest: true // Hace que los includes se vuelvan sub-objetos limpios
        });
        // Corregimos el mapeo para leer la estructura anidada real que genera nest: true
        return barbers.map((barbero) => {
            return {
                barberId: barbero.barberId,
                // Acceso seguro al objeto anidado: barbero -> appointment -> barbero -> name
                name: barbero.appointment?.barbero?.name || 'Sin Nombre',
                value: parseFloat(barbero.totalValue) || 0
            };
        });
    }
}
exports.default = BarberRepository;
//# sourceMappingURL=barberRepository.js.map