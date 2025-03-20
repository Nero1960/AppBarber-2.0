import Service from "../../models/Service";
import { TopServices } from "../../types";

export interface IServiceService {
    getServices(): Promise<Service[]>;
    getServiceById(id: Service['serviceId']): Promise<Service | null>;
    createService(data : Pick<Service, 'name' | 'price'>) : Promise<void>;
    updateService(id: Service['serviceId'], data: Pick<Service, 'name' | 'price'>): Promise<void>;
    deleteService(id: Service['serviceId']) : Promise<void>;
    getStartEndDate(period: string): { startDate: Date; endDate: Date;}
    getTopServices(period: string) : Promise<TopServices[]>
}