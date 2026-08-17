"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class BarberService {
    barberRepository;
    constructor(barberRepository) {
        this.barberRepository = barberRepository;
    }
    async getBarbers() {
        return await this.barberRepository.findAll();
    }
    async getBarberById(id) {
        const barber = await this.barberRepository.findById(id);
        if (!barber) {
            throw new AppError_1.default('El barbero no existe', 400);
        }
        return barber;
    }
    async getBarberByEmail(email) {
        const barber = await this.barberRepository.findByEmail(email);
        if (barber) {
            throw new AppError_1.default('Este barbero ya existe', 400);
        }
        return barber;
    }
    async createBarber(barber, image) {
        await this.getBarberByEmail(barber.email);
        return await this.barberRepository.save(barber, image);
    }
    async updateBarber(barber, image, id) {
        const currentBarber = await this.getBarberById(id);
        if (image !== 'default.png' && currentBarber.image !== 'default.png') {
            this.deleteImage(currentBarber);
        }
        const barberUpdate = await this.barberRepository.update(barber, image, id);
        return barberUpdate;
    }
    async deleteBarber(id) {
        //Obtener el barbero a eliminar
        const barber = await this.getBarberById(id);
        //Elimina la imagen del sistema de archivos
        this.deleteImage(barber);
        //eliminar de la base de datos
        await this.barberRepository.destroy(barber);
    }
    async barberData() {
        return await this.barberRepository.barberData();
    }
    async barberIncome() {
        return await this.barberRepository.barberIncome();
    }
    deleteImage(barber) {
        const image = barber.image;
        const imagePath = path_1.default.join(__dirname, '..', 'uploads', image);
        // Verifica si la imagen existe antes de intentar eliminarla
        if (fs_1.default.existsSync(imagePath)) {
            fs_1.default.unlinkSync(imagePath);
        }
    }
}
exports.default = BarberService;
//# sourceMappingURL=barberService.js.map