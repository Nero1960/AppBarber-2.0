import { body , param} from 'express-validator'
import { handleInputErrors } from "../middleware/Validation";
import { authenticate } from '../middleware/auth'
import { isAdmin } from '../middleware/admin'
import { Router } from 'express';
import ServiceController from '../controllers/serviceController';

const route = Router();

//todas las consultas hacia servicio, el usuario debe estar autenticado
route.use(authenticate);

route.get(
    '/get-services',
    ServiceController.getAllServices
);

route.get(
    '/get-services/:serviceId',
    param('serviceId')
        .isNumeric().withMessage('ID no valido'),
    handleInputErrors,
    ServiceController.getServiceById
);

route.post(
    '/add-services',
    isAdmin,
    body('name')
        .notEmpty().withMessage('El nombre del servicio es requerido'),
    body('price')
        .notEmpty().withMessage('El precio del servicio es requerido'),
    handleInputErrors,
    ServiceController.newService
)

route.put(
    '/update-service/:serviceId',
    isAdmin,
    param('serviceId')
        .isNumeric().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombre del servicio es requerido'),
    body('price')
        .notEmpty().withMessage('El precio del servicio es requerido'),
    handleInputErrors,
    ServiceController.updateService
)

route.delete(
    '/delete-service/:serviceId',
    isAdmin,
    param('serviceId')
        .isNumeric().withMessage('ID no valido'),
    handleInputErrors,
    ServiceController.deleteService
)

route.get(
    '/get-top-services',
    isAdmin,
    ServiceController.getTopServices
)



export default route;
