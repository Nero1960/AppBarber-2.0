"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BarberController {
    barberService;
    constructor(barberService) {
        this.barberService = barberService;
    }
    getBarbers = async (request, response, next) => {
        try {
            const barber = await this.barberService.getBarbers();
            response.status(200).json(barber);
        }
        catch (error) {
            next(error);
        }
    };
    getBarberById = async (request, response, next) => {
        try {
            const barberId = request.params.barberId;
            const barber = await this.barberService.getBarberById(+barberId);
            response.status(200).json(barber);
        }
        catch (error) {
            next(error);
        }
    };
    getImage(request) {
        const image = request.file ? request.file.filename : 'default.png';
        return image;
    }
    createBarber = async (request, response, next) => {
        try {
            const image = this.getImage(request);
            const newBarber = await this.barberService.createBarber(request.body, image);
            response.status(201).json(newBarber);
        }
        catch (error) {
            next(error);
        }
    };
    updateBarber = async (request, response, next) => {
        try {
            const barberId = request.params.barberId;
            const image = this.getImage(request);
            const barberUpdated = await this.barberService.updateBarber(request.body, image, +barberId);
            response.status(200).json(barberUpdated);
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    };
    deleteBarber = async (request, response, next) => {
        try {
            const barberId = +request.params.barberId;
            await this.barberService.deleteBarber(barberId);
            response.status(200).send('Barbero eliminado correctamente');
        }
        catch (error) {
            next(error);
        }
    };
    barberData = async (request, response, next) => {
        try {
            const barbers = await this.barberService.barberData();
            response.status(200).json(barbers);
        }
        catch (error) {
            next(error);
        }
    };
    barbersIncome = async (request, response, next) => {
        try {
            const data = await this.barberService.barberIncome();
            response.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.default = BarberController;
//# sourceMappingURL=barberController.js.map