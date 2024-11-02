import { Router } from 'express'
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';
import ReportController from '../controllers/reportController';

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

route.get(
    '/getTopBarbers',
    authenticate,
    isAdmin,
    ReportController.getTopBarbers
)

route.get(
    '/getTopUsers',
    authenticate,
    isAdmin,
    ReportController.getTopUsers
)



export default route;