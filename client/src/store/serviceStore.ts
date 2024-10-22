import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Services } from '@/types/index';

type ServicesStore = {
    services: Services,
    setServices: (services: Services) => void
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
}),
 {
    name: 'services'
 }
)))