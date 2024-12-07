import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Service, Services } from '@/types/index';

type ServicesStore = {
    services: Services,
    setServices: (services: Services) => void,
    updateService: (updatedService: Service) => void,
    addService: (newService: Service) => void,
    deleteService: (serviceId: Service['serviceId']) => void
}

export const useServicesStore = create<ServicesStore>()(devtools(persist((set) => ({
    //Estado inicial de los servicios
    services: [],

    //Función para almacenar los servicios
    setServices: (services) => {
        set(() => ({
            services: services
        }));
    },

    //Función para actualizar un servicio
    updateService: (updatedService) => {
        set((state) => ({
            services: state.services.map((service) =>
                service.serviceId === updatedService.serviceId ? updatedService : service
            )
        }));
    },

    //Función que agrega un nuevo servicio
    addService: (newService) => {
        set((state) => ({
            services: [...state.services, newService]
        }))
    },

    //Función que elimina un servicio
    deleteService: (serviceId) => {
        set((state) => ({
            services: state.services.filter((service) => service.serviceId !== serviceId)
        }))
    }

}),
 {
    name: 'services'
 }
)))