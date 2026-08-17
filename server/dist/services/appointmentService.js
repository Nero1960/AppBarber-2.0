"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const barberAvailable_1 = require("../helpers/barberAvailable");
//models
const Appointment_1 = __importDefault(require("../models/Appointment"));
const AppointmentCancellation_1 = __importDefault(require("../models/AppointmentCancellation"));
class AppointmentService {
    appointmentRepository;
    barberService;
    dateValidator;
    constructor(appointmentRepository, barberService, dateValidator) {
        this.appointmentRepository = appointmentRepository;
        this.barberService = barberService;
        this.dateValidator = dateValidator;
    }
    async makeAppointment(appointment, userId) {
        const { barberId, time, date, services } = appointment;
        await this.barberService.getBarberById(barberId);
        //Validar disponibilidad del barbero
        const isAvailable = await (0, barberAvailable_1.barberAvailable)(barberId, new Date(date), time);
        if (!isAvailable) {
            throw new AppError_1.default('Barbero no disponible en la fecha y hora seleccionada', 400);
        }
        //Validar fecha y hora
        this.dateValidator.validateFutureDate(date, time);
        this.dateValidator.validateTime(time);
        //Crear la cita
        const newAppointment = new Appointment_1.default({
            barberId,
            time,
            date,
            userId: userId
        });
        //Llamar al repositorio para guardar la cita
        await this.appointmentRepository.save(newAppointment, services);
    }
    async getAppointmentsByUser(userId) {
        const appointments = await this.appointmentRepository.findByUser(userId);
        return appointments;
    }
    async getAppointment(appointmentId) {
        const appointment = await this.appointmentRepository.findByAppointmentId(appointmentId);
        if (!appointment) {
            throw new AppError_1.default('Cita no encontrada', 404);
        }
        return appointment;
    }
    async getAppointmentById(appointmentId, userId) {
        const appointment = await this.appointmentRepository.findById(appointmentId, userId);
        if (!appointment) {
            throw new AppError_1.default('Cita no encontrada', 404);
        }
        return appointment;
    }
    async updateAppointment(appointmentId, userId, appointmentData) {
        //Obtener la cita a actualizar
        const appointment = await this.getAppointmentById(appointmentId, userId);
        //Validar el cumplimiento de la fecha y hora
        this.dateValidator.validateFutureDate(appointmentData.date, appointmentData.time);
        this.dateValidator.validateDiffHour(appointment.date);
        this.dateValidator.validateTime(appointmentData.time);
        //Validar que el barbero esté disponible
        const isAvailable = await (0, barberAvailable_1.barberAvailable)(appointmentData.barberId, new Date(appointmentData.date), appointmentData.time);
        if (!isAvailable) {
            throw new AppError_1.default('El barbero no está disponible en esa hora', 400);
        }
        //Actualizar la cita
        appointment.barberId = appointmentData.barberId;
        appointment.time = appointmentData.time;
        appointment.date = appointmentData.date;
        //Llamar al repositorio para actualizar la cita
        await this.appointmentRepository.update(appointmentId, appointment, appointmentData.services);
    }
    async cancelAppointment(appointmentId, userId) {
        const appointment = await this.getAppointmentById(appointmentId, userId);
        this.dateValidator.validateDiffHour(appointment.date);
        await this.appointmentRepository.saveCancelAppointment(appointment);
    }
    async cancellationReason(cancellationReasonData) {
        const cancellationReason = new AppointmentCancellation_1.default(cancellationReasonData);
        await this.appointmentRepository.saveCancellationReason(cancellationReason);
    }
    async deleteAppointment(appointmentId) {
        const appointment = await this.getAppointment(appointmentId);
        console.log(appointment);
        await this.appointmentRepository.destroy(appointmentId, appointment);
    }
}
exports.default = AppointmentService;
//# sourceMappingURL=appointmentService.js.map