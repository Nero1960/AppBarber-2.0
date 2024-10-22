import { Router } from "express";
import { handleInputErrors } from "../middleware/Validation";
import upload from "../middleware/uploadFiles";
import { body, param } from "express-validator";
import ProfileController from "../controllers/profileController";
import { authenticate } from "../middleware/auth";

const route = Router();


route.put(
    '/update-profile/:userId',
    authenticate,
    upload.single('image'), // Manejo de la carga de la imagen antes de las validaciones
    param('userId').isNumeric().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre del barbero es requerido'),
    body('lastname').notEmpty().withMessage('El apellido del barbero es requerido'),
    body('phone').notEmpty().withMessage('El numero telefónico es requerido'),
    handleInputErrors, // Manejo de los errores de validación
    ProfileController.updateProfile
);


route.patch(
    '/update-password/:userId',
    authenticate,
    param('userId')
        .isNumeric().withMessage('ID no valido'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales')
        }
        return true;
    }),
    handleInputErrors,
    ProfileController.updatePasswordProfile
)



export default route;