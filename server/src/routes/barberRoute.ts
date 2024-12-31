import { Router } from 'express'
import { body, param } from 'express-validator';
import { authenticate } from '../middleware/auth';
import BarberController from '../controllers/barberController';
import { handleInputErrors } from '../middleware/Validation';
import { isAdmin } from '../middleware/admin';
import upload from '../middleware/uploadFiles';

const route = Router();

route.use(authenticate)


route.get(
    '/get-barbers',
    BarberController.getAllBarber
)

route.get(
    '/get-barber/:barberId',
    param('barberId')
        .isNumeric().withMessage('ID no valido'),
    handleInputErrors,
    BarberController.getBarberById
)

route.post(
    '/new-barber',
    isAdmin, // Verificación de autenticación primero
    upload.single('image'), // Manejo de la carga de la imagen antes de las validaciones
    body('name').notEmpty().withMessage('El nombre del barbero es requerido'),
    body('lastname').notEmpty().withMessage('El apellido del barbero es requerido'),
    body('phone').notEmpty().withMessage('El numero telefónico es requerido'),
    body('email').isEmail().withMessage('El email es requerido'),
    body('specialty').notEmpty().withMessage('La especialidad es requerida'),
    handleInputErrors, // Manejo de los errores de validación
    BarberController.addBarber // Controlador que maneja la lógica de añadir un barbero
);

route.put(
    '/update-barber/:barberId',
    isAdmin,
    upload.single('image'),
    param('barberId').isNumeric().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre del barbero es requerido'),
    body('lastname').notEmpty().withMessage('El apellido del barbero es requerido'),
    body('phone').notEmpty().withMessage('El numero telefónico es requerido'),
    body('email').isEmail().withMessage('El email es requerido'),
    body('specialty').notEmpty().withMessage('La especialidad es requerida'),
    handleInputErrors,
    BarberController.updateBarber
);

route.delete(
    '/delete-barber/:barberId',
    isAdmin,
    param('barberId').isNumeric().withMessage('ID no valido'),
    handleInputErrors,
    BarberController.deleteBarber
);

export default route;