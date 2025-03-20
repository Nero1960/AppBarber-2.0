import ServiceRepository from "../../repositories/serviceRepository";
import ServiceService from "../../services/serviceService";
import ServiceController from "../../controllers/serviceController";

const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository);
const serviceController = new ServiceController(serviceService)

export { serviceController}