"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("../config/nodemailer");
class EmailService {
    sendEmailConfirmAccount = async (user) => {
        try {
            await nodemailer_1.transport.sendMail({
                from: "Bienvenido a Mojica's BarberShop",
                to: user.email,
                subject: "Confirmación de cuenta",
                text: "Confirma tu cuenta en Mojica's BarberShop",
                html: `
                    <p>Hola ${user.name} ${" "} ${user.lastname}, has creado una cuenta en Mojica's BarberShop.</p>
                    <p>Tu cuenta ya esta lista, solo debes confirmarla siguiendo el siguiente enlace</p>
                    <a href="${process.env.FRONTEND_URL}/confirm-account">Confirmar Cuenta</a>
                    <p>E ingresa tu código de verificación: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>
                `
            });
        }
        catch (error) {
            // 👇 ESTO IMPRIMIRÁ EL ERROR REAL EN LA TERMINAL DE DOCKER 👇
            console.error("❌ ERROR DETALLADO AL ENVIAR CORREO DE CONFIRMACIÓN:", error);
            throw error; // Mantiene el comportamiento para que el controlador se entere si es necesario
        }
    };
    sendEmailResetPassword = async (user) => {
        try {
            await nodemailer_1.transport.sendMail({
                from: "Restablecer contraseña en Mojica's BarberShop",
                to: user.email,
                subject: "Restablecer Contraseña",
                text: "Te hemos enviado un link para restablecer tu contraseña en Mojica's BarberShop",
                html: `
                    <p>Hola ${user.name} ${" "} ${user.lastname}, hemos recibido una solicitud de restablecimiento de contraseña.</p>
                    <p>Si deseas restablecer tu contraseña, haz clic en el siguiente enlace:</p>
                    <a href="${process.env.FRONTEND_URL}/new-password">Restablecer Contraseña</a>
                    <p>E ingresa tu código de verificación: <b>${user.token}</b></p>
                    <p>Este token expira en 10 minutos</p>
                `
            });
        }
        catch (error) {
            console.error("❌ ERROR DETALLADO AL ENVIAR CORREO DE RESET:", error);
            throw error;
        }
    };
}
exports.default = EmailService;
//# sourceMappingURL=emailService.js.map