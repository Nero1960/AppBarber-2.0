import Service from "../../models/Service";
import { Services } from "../../types";

export interface IServiceRepository {
    findAll() : Promise<Service[]>;
    findById(id : Service['serviceId']) : Promise<Service | null>;
    save(service : Service) : Promise<Services>
    update(id: Service['serviceId'], data: Pick<Service, 'name' | 'price'>) : Promise<Services>;
    destroy(service : Service) : Promise<void>;
    findTopServices(startDate: Date, endDate: Date) : Promise<any>
}