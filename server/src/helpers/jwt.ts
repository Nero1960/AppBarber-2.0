import jwt from 'jsonwebtoken';
import User from '../models/User';

type UserPayload = {
    id: User['userId'],
    admin: User['admin']

};

//Genera un token JWT para el usuario
export const generateJWT = (payload: UserPayload) => {

    //Generar el token JWT con la información del usuario, la clave secreta y cuando expira el token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d' //Expira en 180 Dias
    })

    return token;
}