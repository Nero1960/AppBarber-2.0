import { Router } from "express";
import { body, param } from 'express-validator'
import { handleInputErrors } from "../middleware/Validation";
import AuthController from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const route = Router();

//rutas para la autenticación del usuario
route.post(
    '/register',
    body('name')
        .notEmpty().withMessage('El nombre es requerido'),
    body('lastname')
        .notEmpty().withMessage('El apellido es requerido'),
    body('phone')
        .notEmpty().withMessage('El teléfono es requerido'),
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales')
        }
        return true;
    }),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
    handleInputErrors,
    AuthController.createAccount
);

route.post(
    '/confirm-account',
    body('token')
       .notEmpty().withMessage('EL token no debe ir vació'),
    handleInputErrors,
    AuthController.confirmAccount    
)

route.post(
    '/login',
    body('email')
       .isEmail().withMessage('Email no válido'),
    body('password')
       .notEmpty().withMessage('El password es requerido'),
    handleInputErrors,
    AuthController.login
)

route.post(
    '/request-token',
    body('email')
        .notEmpty().withMessage('El email no puede ir vacío')
        .isEmail().withMessage('Email No valido'),
    handleInputErrors,
    AuthController.requestConfirmationToken
)

route.post(
    '/forgot-password',
    body('email')
    .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    AuthController.forgotPassword
)

route.post(
    '/validate-token',
    body('token')
        .notEmpty().withMessage('El token no debe ir vacío'),
    handleInputErrors,
    AuthController.validateToken
)

route.post(
    '/reset-password/:token',
    param('token')
        .isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password es muy corto, mínimo 8 caracteres'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los passwords no son iguales')
        }
        return true;
    }),
    
    handleInputErrors,
    AuthController.updatePasswordWithToken
    
)

route.get(
    '/profile',
    authenticate,
    AuthController.getProfile
)


export default route;