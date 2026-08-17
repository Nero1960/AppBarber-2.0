"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
const sequelize_1 = require("sequelize");
const AppointmentService_1 = __importDefault(require("../models/AppointmentService"));
class CustomerController {
    static getCustomers = async (request, response) => {
        try {
            const customers = await User_1.default.findAll({
                attributes: [
                    'userId',
                    'name',
                    'email',
                    'lastname',
                    'image',
                    'phone',
                    [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('appointment.appointmentId')), 'totalAppointments'], // Cuenta citas asociadas
                    [(0, sequelize_1.fn)('MAX', (0, sequelize_1.col)('appointment.date')), 'lastAppointment'] // Última cita asociada
                ],
                include: [
                    {
                        model: Appointment_1.default,
                        as: 'appointment',
                        attributes: [], // No necesitamos columnas de Appointment directamente
                        required: false // LEFT JOIN para incluir usuarios sin citas
                    }
                ],
                group: ['userId'], // Agrupa por la clave primaria del modelo User
                order: [[(0, sequelize_1.literal)('totalAppointments'), 'DESC']] // Ordena por total de citas
            });
            response.status(200).json(customers);
        }
        catch (error) {
            console.log(error);
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message });
        }
    };
    static getMonthlyVisit = async (request, response) => {
        try {
            const data = await Appointment_1.default.findAll({
                where: {
                    status: 'completed'
                },
                attributes: [
                    [(0, sequelize_1.fn)('MONTHNAME', (0, sequelize_1.col)('date')), 'month'],
                    [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.literal)('*')), 'totalAppointments']
                ],
                group: [(0, sequelize_1.fn)('MONTH', (0, sequelize_1.col)('date')), (0, sequelize_1.fn)('MONTHNAME', (0, sequelize_1.col)('date'))], // Agrupa por mes
                order: [[(0, sequelize_1.literal)('month'), 'ASC']],
            });
            response.status(200).json(data);
        }
        catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message });
        }
    };
    static getLastMonthCustomer = async (request, response) => {
        try {
            const customerCount = await User_1.default.count({
                where: {
                    createdAt: {
                        [sequelize_1.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    }
                },
            });
            response.status(200).json(customerCount);
        }
        catch (error) {
            console.log(error);
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message });
        }
    };
    static totalAppointmentsMonth = async (request, response) => {
        try {
            const totalAppointmentsThisMonth = await Appointment_1.default.count({
                where: {
                    date: {
                        [sequelize_1.Op.and]: [
                            { [sequelize_1.Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }, // Primer día del mes
                            { [sequelize_1.Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) } // Primer día del siguiente mes
                        ]
                    },
                    status: 'completed'
                }
            });
            response.status(200).json(totalAppointmentsThisMonth);
        }
        catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message });
        }
    };
    static totalServiceMonth = async (request, response) => {
        try {
            const totalServices = await AppointmentService_1.default.count({
                include: [
                    {
                        model: Appointment_1.default,
                        where: {
                            date: {
                                [sequelize_1.Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Primer día del mes
                                [sequelize_1.Op.lt]: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                            },
                            status: 'completed'
                        }
                    }
                ]
            });
            response.status(200).json(totalServices);
        }
        catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message });
        }
    };
    static deleteCustomer = async (request, response) => {
        try {
            const userId = +request.params.userId;
            const customer = await User_1.default.findByPk(userId);
            if (!customer) {
                const error = new Error("Este usuario no existe");
                return response.status(401).json({ error: error.message });
            }
            await customer.destroy();
            response.status(200).send("Usuario eliminado correctamente");
        }
        catch (error) {
            const err = new Error("Oops! Error del servidor");
            response.status(500).json({ error: err.message });
        }
    };
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map