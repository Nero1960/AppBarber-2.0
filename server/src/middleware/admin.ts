import type { Request, Response, NextFunction } from "express"

export const isAdmin = (request: Request, response: Response, next: NextFunction) => {

    if(request.user && request.user.admin){
        next();
    } else {
        const error = new Error('No tienes permisos para realizar esta acción');
        return response.status(403).json({ error: error.message });
    }

}