import { transport } from '../config/nodemailer'

interface IEmail {
    name: string,
    lastname: string,
    email: string,
    token: string
}

class AuthEmail {

    public static sendEmailConfirmAccount = async ( user : IEmail) => {

         await transport.sendMail({
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
        })

    }

    public static sendEmailResetPassword = async (user : IEmail) => {
        await transport.sendMail({
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
        })
    }
}

export default AuthEmail;