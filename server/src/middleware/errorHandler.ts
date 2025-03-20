import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

// Middleware para manejar errores
export const errorHandler = (error: unknown, request: Request, response: Response, next: NextFunction) => {
    if(error instanceof AppError){
        return response.status(error.status).json({ error: error.message });
    }

    response.status(500).json({ message: 'Error interno del servidor'});
};