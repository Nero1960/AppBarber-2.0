import { Op } from "sequelize";
import Token from "../models/Token";

export const generateToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const verifyToken = async (token: string) => {
    // Busca un token en la base de datos que coincida con el token proporcionado y que no haya expirado
    const tokenExpired = await Token.findOne({
        where: {
            token: token,
            expiresAt: {
                [Op.gt]: new Date() // El token debe no haber expirado
            }
        }
    });

    if (!tokenExpired) {

        // Intentar encontrar y eliminar el token si ha expirado
        await Token.destroy({
            where: {
                token: token
            }
        });
        
        throw new Error('Token expirado o no válido');
    }

    // El token es válido y no ha expirado
    return tokenExpired;
}

