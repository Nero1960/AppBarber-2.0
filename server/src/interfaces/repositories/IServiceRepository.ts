import Service from "../../models/Service";

export interface IServiceRepository {
    findAll() : Promise<Service[]>;
    findById(id : Service['serviceId']) : Promise<Service | null>;
    save(service : Service) : Promise<void>
    update(id: Service['serviceId'], data: Pick<Service, 'name' | 'price'>) : Promise<void>;
    destroy(service : Service) : Promise<void>;
    findTopServices(startDate: Date, endDate: Date) : Promise<any>
}