import type { NextFunction, Request, Response } from "express"
import { IServiceService } from "../interfaces/services/IServiceService";

class ServiceController {

    constructor(private serviceService: IServiceService){}

    public getAllServices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const services = await this.serviceService.getServices();
            response.status(200).json(services)
        } catch (error) {
            next(error)
        }
    }

    public getServiceById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const serviceId = +request.params.serviceId;
            const service = await this.serviceService.getServiceById(serviceId);
            response.status(200).json(service);

        } catch (error) {
            next(error)
        }
    }

    public newService = async (request: Request, response: Response, next : NextFunction) => {
        try {
            const newService = await this.serviceService.createService(request.body);
            response.status(201).send(newService)
        } catch (error) {
            next(error)
        }

    }

    public updateService = async (request: Request, response: Response, next : NextFunction) => {
        try {
            const serviceId = +request.params.serviceId;
            const serviceUpdated = await this.serviceService.updateService(serviceId, request.body);
            response.status(200).json(serviceUpdated);
        } catch (error) {
            next(error)
        }
    }

    public deleteService = async (request: Request, response: Response, next: NextFunction) => {

        try {
            const serviceId = +request.params.serviceId;
            await this.serviceService.deleteService(serviceId);
            response.status(200).send('Servicio eliminado correctamente');
        } catch (error) {
            next(error)
        }
    }

    public getTopServices = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { period } = request.query;
            const topServices =  await this.serviceService.getTopServices(period as string);
            response.status(200).json(topServices)
        } catch (error) {
            next(error)
        }
    };   
}

export default ServiceController;