"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Appointment_1 = __importDefault(require("../models/Appointment"));
const sequelize_1 = require("sequelize");
const Barber_1 = __importDefault(require("../models/Barber"));
const Service_1 = __importDefault(require("../models/Service"));
const AppointmentCancellation_1 = __importDefault(require("../models/AppointmentCancellation"));
class ReportController {
    static getLastUsers = async (request, response) => {
        try {
            const lastUsers = await User_1.default.findAll({
                order: [
                    ['userId', 'DESC']
                ],
                attributes: ['userId', 'name', 'lastname', 'email', 'image'],
                limit: 3
            });
            response.status(200).json(lastUsers);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static getPeakHour = async (request, response) => {
        try {
            const peakHours = await Appointment_1.default.findAll({
                attributes: [
                    [(0, sequelize_1.fn)('HOUR', (0, sequelize_1.col)('time')), 'hour'],
                    [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('appointmentId')), 'appointment_count']
                ],
                where: {
                    status: 'completed'
                },
                group: ['time'],
                order: [[(0, sequelize_1.literal)('appointment_count'), 'DESC']],
            });
            response.status(200).json(peakHours);
        }
        catch (error) {
            console.log(error);
            response.status(500).json(error);
        }
    };
    static getTopBarbers = async (request, response) => {
        try {
            const topBarber = await Barber_1.default.findAll({
                attributes: [
                    'barberId',
                    'name',
                    'lastname',
                    'image',
                    [
                        (0, sequelize_1.literal)(`COUNT(DISTINCT CASE WHEN DATE(appointment.date) = CURDATE() AND appointment.time >= CURTIME() THEN appointment.appointmentId END)`),
                        'dailyClients',
                    ],
                    [
                        (0, sequelize_1.literal)(`COUNT(DISTINCT CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND WEEK(appointment.date, 1) = WEEK(CURRENT_DATE(), 1) THEN appointment.appointmentId END)`),
                        'weeklyClients',
                    ],
                    [
                        (0, sequelize_1.literal)(`COUNT(DISTINCT CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND MONTH(appointment.date) = MONTH(CURRENT_DATE()) THEN appointment.appointmentId END)`),
                        'monthlyClients',
                    ],
                    [
                        (0, sequelize_1.literal)(`SUM(CASE WHEN DATE(appointment.date) = CURDATE() AND appointment.time >= CURTIME() THEN current_price END)`),
                        'dailyRevenue',
                    ],
                    [
                        (0, sequelize_1.literal)(`SUM(CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND WEEK(appointment.date, 1) = WEEK(CURRENT_DATE(), 1) THEN current_price END)`),
                        'weeklyRevenue',
                    ],
                    [
                        (0, sequelize_1.literal)(`SUM(CASE WHEN YEAR(appointment.date) = YEAR(CURRENT_DATE()) AND MONTH(appointment.date) = MONTH(CURRENT_DATE()) THEN current_price END)`),
                        'monthRevenue',
                    ],
                ], //end attributes
                include: [
                    {
                        model: Appointment_1.default,
                        attributes: [],
                        where: {
                            status: 'completed'
                        },
                        include: [
                            {
                                model: Service_1.default,
                                attributes: [],
                                through: {
                                    attributes: [],
                                }
                            },
                        ]
                    },
                ],
                group: ['Barber.barberId'],
                order: [[(0, sequelize_1.literal)('dailyClients'), 'DESC']],
            });
            response.status(200).json(topBarber);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static getTopUsers = async (request, response) => {
        try {
            const topUsers = await Appointment_1.default.findAll({
                attributes: [
                    'userId',
                    [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('appointmentId')), 'totalAppointments'],
                    [(0, sequelize_1.fn)('MAX', (0, sequelize_1.col)('date')), 'lastAppointment']
                ],
                include: [
                    {
                        model: User_1.default,
                        attributes: ['name', 'email', 'lastname', 'image', 'phone']
                    }
                ],
                group: ['userId'],
                order: [[(0, sequelize_1.literal)('totalAppointments'), 'DESC']],
                limit: 3,
            });
            response.status(200).json(topUsers);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static getAllAppointments = async (request, response) => {
        try {
            const appointments = await Appointment_1.default.findAll({
                attributes: ['appointmentId', 'status', 'date', 'time'],
                include: [
                    {
                        model: User_1.default,
                        attributes: ['name', 'lastname', 'email', 'image']
                    },
                    {
                        model: Barber_1.default,
                        attributes: ['name', 'lastname', 'image']
                    }
                ],
                order: [
                    [(0, sequelize_1.literal)(`CASE WHEN status = 'pending' THEN 0 ELSE 1 END`), 'ASC'],
                ]
            });
            response.status(200).json(appointments);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static getAppointmentById = async (request, response) => {
        try {
            const appointmentId = +request.params.appointmentId;
            const appointment = await Appointment_1.default.findByPk(appointmentId, {
                attributes: ['appointmentId', 'date', 'time', 'status'],
                include: [
                    {
                        model: User_1.default,
                        attributes: ['name', 'lastname', 'image']
                    },
                    {
                        model: Service_1.default,
                        attributes: ['name', 'serviceId'],
                        through: {
                            attributes: ['current_price']
                        }
                    },
                ]
            });
            response.status(200).json(appointment);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static updateAppointmentStatus = async (request, response) => {
        try {
            const appointmentId = +request.params.appointmentId;
            const status = request.body.status;
            const appointment = await Appointment_1.default.findByPk(appointmentId);
            appointment.status = status;
            await appointment.save();
            response.status(200).send('Has cambiado el estado de la cita');
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
    static getStatusData = async (request, response) => {
        try {
            const statusData = await Appointment_1.default.findAll({
                attributes: [
                    ['status', 'name'],
                    [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('status')), 'value']
                ],
                group: ['status']
            });
            response.status(200).json(statusData);
        }
        catch (error) {
            const err = new Error("Oops! some error occurred");
            return response.status(500).json({ error: err.message });
        }
    };
    static getCancellationReasonData = async (request, response) => {
        try {
            const cancellationReasonData = await AppointmentCancellation_1.default.findAll({
                attributes: [
                    ['cancellation_reason', 'reason'],
                    [(0, sequelize_1.fn)('COUNT', (0, sequelize_1.col)('cancellation_reason')), 'count']
                ],
                group: ['cancellation_reason']
            });
            response.status(200).json(cancellationReasonData);
        }
        catch (error) {
            const err = new Error('!Oops! Something went wrong');
            return response.status(500).json({ error: err.message });
        }
    };
}
exports.default = ReportController;
//# sourceMappingURL=reportController.js.map