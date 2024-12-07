import { Router } from 'express'
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';
import ReportController from '../controllers/reportController';
import { param } from 'express-validator';
import { handleInputErrors } from '../middleware/Validation';

const route = Router();

//Router para obtener los últimos usuarios registrados
route.get(
    '/getLastUsers',
    authenticate,
    isAdmin,
    ReportController.getLastUsers
)

//Router para obtener las horas mas solicitadas por los usuarios
route.get(
    '/getPeakHours',
    authenticate,
    isAdmin,
    ReportController.getPeakHour
)

//Router para obtener los barberos con más reservas
route.get(
    '/getTopBarbers',
    authenticate,
    isAdmin,
    ReportController.getTopBarbers
)

//Router para obtener a los usuarios mas frecuentes
route.get(
    '/getTopUsers',
    authenticate,
    isAdmin,
    ReportController.getTopUsers
)

//Router para obtener todas las citas
route.get(
    '/getAllAppointments',
    authenticate,
    isAdmin,
    ReportController.getAllAppointments
)

//Obtener cita por ID
route.get(
    '/appointment/:appointmentId',
    param('appointmentId')
        .isNumeric().withMessage('El id de la cita no es valido'),
    handleInputErrors,
    authenticate,
    isAdmin,
    ReportController.getAppointmentById
)

//Actualizar el estado de la cita
route.patch(
    '/appointment/:appointmentId/status',
    param('appointmentId')
     .isNumeric().withMessage('ID de cita no válido'),
    handleInputErrors,
    authenticate,
    isAdmin,
    ReportController.updateAppointmentStatus
)

//Obtener la datos del estado de la citas
route.get(
    '/appointment/status/data',
    authenticate,
    isAdmin,
    ReportController.getStatusData
)

//Obtener los datos de las citas canceladas
route.get(
    '/appointment/cancellation/data',
    authenticate,
    isAdmin,
    ReportController.getCancellationReasonData
)

export default route;