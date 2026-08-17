"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceController {
    serviceService;
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    getAllServices = async (request, response, next) => {
        try {
            const services = await this.serviceService.getServices();
            response.status(200).json(services);
        }
        catch (error) {
            next(error);
        }
    };
    getServiceById = async (request, response, next) => {
        try {
            const serviceId = +request.params.serviceId;
            const service = await this.serviceService.getServiceById(serviceId);
            response.status(200).json(service);
        }
        catch (error) {
            next(error);
        }
    };
    newService = async (request, response, next) => {
        try {
            const newService = await this.serviceService.createService(request.body);
            response.status(201).send(newService);
        }
        catch (error) {
            next(error);
        }
    };
    updateService = async (request, response, next) => {
        try {
            const serviceId = +request.params.serviceId;
            const serviceUpdated = await this.serviceService.updateService(serviceId, request.body);
            response.status(200).json(serviceUpdated);
        }
        catch (error) {
            next(error);
        }
    };
    deleteService = async (request, response, next) => {
        try {
            const serviceId = +request.params.serviceId;
            await this.serviceService.deleteService(serviceId);
            response.status(200).send('Servicio eliminado correctamente');
        }
        catch (error) {
            next(error);
        }
    };
    getTopServices = async (request, response, next) => {
        try {
            const { period } = request.query;
            console.log(period);
            const topServices = await this.serviceService.getTopServices(period);
            console.log(topServices);
            response.status(200).json(topServices);
        }
        catch (error) {
            console.error("================ ERROR EN GET_TOP_SERVICES ================");
            console.error(error);
            console.error("===========================================================");
            next(error);
        }
    };
}
exports.default = ServiceController;
//# sourceMappingURL=serviceController.js.map