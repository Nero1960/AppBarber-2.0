import Service from "../../models/Service";
import { Services, TopServices } from "../../types";

export interface IServiceService {
    getServices(): Promise<Service[]>;
    getServiceById(id: Service['serviceId']): Promise<Service | null>;
    createService(data : Pick<Service, 'name' | 'price'>) : Promise<Services>;
    updateService(id: Service['serviceId'], data: Pick<Service, 'name' | 'price'>): Promise<Pick<Service, 'serviceId' | 'name' | 'price'>>;
    deleteService(id: Service['serviceId']) : Promise<void>;
    getStartEndDate(period: string): { startDate: Date; endDate: Date;}
    getTopServices(period: string) : Promise<TopServices[]>
}