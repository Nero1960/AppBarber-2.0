"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Appointment_1 = __importDefault(require("../models/Appointment"));
const AppointmentService_1 = __importDefault(require("../models/AppointmentService"));
const sequelize_1 = require("sequelize");
class AppointmentController {
    appointmentService;
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    makeAppointment = async (request, response, next) => {
        try {
            await this.appointmentService.makeAppointment(request.body, request.user.userId);
            response.status(201).send('Cita creada con éxito');
        }
        catch (error) {
            next(error);
        }
    };
    getAppointmentUserAuth = async (request, response, next) => {
        try {
            const appointments = await this.appointmentService.getAppointmentsByUser(request.user.userId);
            response.status(200).json(appointments);
        }
        catch (error) {
            next(error);
        }
    };
    getAppointmentById = async (request, response, next) => {
        try {
            const appointmentId = +request.params.appointmentId;
            const userId = request.user.userId;
            const appointment = await this.appointmentService.getAppointmentById(appointmentId, userId);
            response.status(200).json(appointment);
        }
        catch (error) {
            next(error);
        }
    };
    updateAppointment = async (request, response, next) => {
        try {
            const appointmentId = +request.params.appointmentId;
            await this.appointmentService.updateAppointment(appointmentId, request.user.userId, request.body);
            response.status(200).send('La cita se ha actualizado con éxito');
        }
        catch (error) {
            next(error);
        }
    };
    cancelAppointment = async (request, response, next) => {
        try {
            const appointmentId = +request.params.appointmentId;
            await this.appointmentService.cancelAppointment(appointmentId, request.user.userId);
            response.status(200).send('Su cita ha sido cancelada con éxito');
        }
        catch (error) {
            next(error);
        }
    };
    cancellationReason = async (request, response, next) => {
        try {
            await this.appointmentService.cancellationReason(request.body);
            response.status(201).send('Gracias por hacernos saber el motivo de cancelación');
        }
        catch (error) {
            next(error);
        }
    };
    deleteAppointment = async (request, response, next) => {
        try {
            const appointmentId = +request.params.appointmentId;
            await this.appointmentService.deleteAppointment(appointmentId);
            response.status(200).send('La cita ha sido eliminada');
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    //Ingresos mensuales por todas la citas atendidas
    monthlyRevenueAppointment = async (request, response) => {
        try {
            const { month, year } = request.query;
            if (!month || !year) {
                return response.status(400).json({ message: "Mes y año son requeridos." });
            }
            // Crear el rango de fechas para el mes
            const startDate = new Date(Number(year), Number(month) - 1, 1); // Primer día del mes
            const endDate = new Date(Number(year), Number(month), 0); // Último día del mes
            const dailyRevenue = await AppointmentService_1.default.findAll({
                attributes: [
                    [(0, sequelize_1.fn)('DAY', (0, sequelize_1.col)('appointment.date')), 'day'],
                    [(0, sequelize_1.fn)('SUM', (0, sequelize_1.col)('current_price')), 'revenue']
                ],
                include: [
                    {
                        model: Appointment_1.default,
                        attributes: [],
                        where: {
                            date: { [sequelize_1.Op.between]: [startDate, endDate] },
                            status: 'completed'
                        }
                    }
                ],
                group: [(0, sequelize_1.fn)('DAY', (0, sequelize_1.col)('appointment.date'))],
                order: [(0, sequelize_1.fn)('DAY', (0, sequelize_1.col)('appointment.date'))]
            });
            response.status(200).json(dailyRevenue);
        }
        catch (error) {
            console.log(error);
            const err = new Error('Oops! Something wrong happened');
            return response.status(500).json({ error: err.message });
        }
    };
}
exports.default = AppointmentController;
//# sourceMappingURL=appointmentController.js.map