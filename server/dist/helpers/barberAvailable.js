"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.barberAvailable = void 0;
const Appointment_1 = __importDefault(require("../models/Appointment"));
const barberAvailable = async (barberId, date, hour) => {
    try {
        // Obtener la fecha y hora exactas de la cita solicitada
        const dateForm = new Date(date);
        // Verificar si existe una cita para el mismo barbero en la misma fecha y hora exacta
        const appointmentExist = await Appointment_1.default.findOne({
            where: {
                barberId,
                date: dateForm,
                time: hour
            }
        });
        // Si ya existe una cita para ese barbero en esa fecha y hora exacta, el barbero está ocupado
        return !appointmentExist;
    }
    catch (error) {
        console.log(error);
        return false; // Retornar falso en caso de error
    }
};
exports.barberAvailable = barberAvailable;
//# sourceMappingURL=barberAvailable.js.map