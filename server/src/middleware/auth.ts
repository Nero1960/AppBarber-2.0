import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import User from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user: User
        }
    }
}

export const authenticate = async (request: Request, response: Response, next: NextFunction) => {


    const bearer = request.headers.authorization;

    if (!bearer) {
        const error = new Error('No authorization');
        return response.status(401).json({ msg: error.message })
    }

    const token = bearer.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded === 'object' && decoded.id) {

            const user = await User.findByPk(decoded.id);

            if (user) {

                //almacenamos en el request al usuario para hacerlo accesible en los otros request
                request.user = user
                next();

            } else {
                //en caso de que el usuario haya eliminado su cuenta pero el token exista
                const error = new Error('Token No valido');
                return response.status(500).json({ error: error.message });
            }
        }

    } catch (error) {
        response.status(500).json({ error: "Token no valido" });
    }

}